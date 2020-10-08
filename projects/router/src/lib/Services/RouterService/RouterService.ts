import {Inject, Injectable, Optional} from '@angular/core';
import {
    ActivatedRoute,
    NavigationExtras,
    PRIMARY_OUTLET,
    Router,
    UrlTree,
}                                     from '@angular/router';
import {
    isArray,
    isUndefined,
    substitute,
}                                     from '@lastdragon-ru/ng-app-kit-core';
import {
    from,
    Observable,
}                                     from 'rxjs';
import {Link}                         from './Link';
import {NavExtras}                    from './NavExtras';
import {NavRelativeTo}                from './NavRelativeTo';
import {RouterRelativeTo}             from './RouterRelativeTo';

/**
 * Required: relativeLinkResolution: 'corrected'
 */
@Injectable({
    providedIn: 'root',
})
export class RouterService {
    public constructor(
        protected readonly router: Router,
        @Inject(RouterRelativeTo) @Optional()
        protected readonly relativeTo: NavRelativeTo | null = null,
    ) {
        this.relativeTo ||= 'module';
    }

    // <editor-fold desc="API">
    // =========================================================================
    /**
     * Generate url to frontend.
     */
    public url(link: Link): string[] {
        return isArray(link)
            ? [substitute(link[0], link[1], (key) => `:${key}`)]
            : [link];
    }

    /**
     * Same as `Router.navigate()` just with our app's URLs support and by
     * default `relativeTo` is the `module` route (like in `routerLink`
     * directive).
     */
    public navigate(path: Link | UrlTree, extras?: NavExtras): Observable<boolean> {
        const url: UrlTree | string[]    = path instanceof UrlTree ? path : this.url(path);
        const relative: NavRelativeTo    = extras && !isUndefined(extras.relativeTo)
            ? extras.relativeTo
            : this.relativeTo;
        const ngExtras: NavigationExtras = Object.assign({}, extras || {}, {
            relativeTo: this.getRelativeToRoute(relative),
        });
        const navigate                   = isArray(url)
            ? this.router.navigate(url, ngExtras)
            : this.router.navigateByUrl(url, ngExtras);

        return from(navigate);
    }

    /**
     * Navigates to {@link getModuleRoute()}}.
     */
    public navigateToModule(extras?: Omit<NavExtras, 'relativeTo'>): Observable<boolean> {
        return from(this.router.navigate(['.'], Object.assign({}, extras || {}, {
            relativeTo: this.getModuleRoute(),
        })));
    }

    /**
     * Navigates to {@link getParentRoute()}}.
     */
    public navigateToParent(extras?: Omit<NavExtras, 'relativeTo'>): Observable<boolean> {
        return from(this.router.navigate(['.'], Object.assign({}, extras || {}, {
            relativeTo: this.getParentRoute(),
        })));
    }

    /**
     * Returns the root route.
     */
    public getRootRoute(): ActivatedRoute {
        return this.router.routerState.root;
    }

    /**
     * Returns the module route for the current route. The module route is the
     * nearest route up in the tree that has `loadChildren` or the `/` route.
     */
    public getModuleRoute(): ActivatedRoute {
        return this.findRoute((route) => {
            return !!route.routeConfig && !!route.routeConfig.loadChildren;
        }) || this.getRootRoute();
    }

    /**
     * Returns the parent route for the current route. The parent route is the
     * nearest route up in the tree that has `children`.
     */
    public getParentRoute(): ActivatedRoute | null {
        const current        = this.getCurrentRoute();
        const isCurrentEmpty = !(current && current.routeConfig && current.routeConfig.path);

        return this.findRoute((route) => {
            return route.children.length > 0
                && !(isCurrentEmpty && current && route.children.includes(current));
        });
    }

    /**
     * Return the current route.
     */
    public getCurrentRoute(): ActivatedRoute | null {
        return this.findRoute(() => true);
    }

    /**
     * @internal
     */
    public getRelativeToRoute(relativeTo: NavRelativeTo): ActivatedRoute | null {
        let value: ActivatedRoute | null;

        switch (relativeTo) {
            case 'module':
                value = this.getModuleRoute();
                break;
            case 'parent':
                value = this.getParentRoute();
                break;
            case 'current':
                value = this.getCurrentRoute();
                break;
            default:
                value = relativeTo;
                break;
        }

        return value;
    }

    // </editor-fold>

    // <editor-fold desc="Functions">
    // =========================================================================
    protected findRoute(condition: (route: ActivatedRoute) => boolean): ActivatedRoute | null {
        let root: ActivatedRoute | null    = null;
        let current: ActivatedRoute | null = this.getRootRoute();
        const next                         = (route: ActivatedRoute): ActivatedRoute | null => {
            return route.children.find((r) => r.outlet === PRIMARY_OUTLET) || null;
        };

        do {
            if (current && condition(current)) {
                root = current;
            }

            current = next(current);
        } while (current);

        return root;
    }

    // </editor-fold>
}
