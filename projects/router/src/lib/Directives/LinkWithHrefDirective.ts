import {LocationStrategy}    from '@angular/common';
import {
    Directive,
    Inject,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Optional,
    SimpleChanges,
}                            from '@angular/core';
import {
    ActivatedRoute,
    Router,
    RouterLinkWithHref,
    UrlTree,
}                            from '@angular/router';
import {Link}                from '../Services/RouterService/Link';
import {NavRelativeTo}       from '../Services/RouterService/NavRelativeTo';
import {RouterService}       from '../Services/RouterService/RouterService';
import {LinkActiveChild}     from './LinkActive/LinkActiveChild';
import {LinkActiveContainer} from './LinkActive/LinkActiveContainer';

/**
 * Same as `[routerLink]` but with kit's URLs support.
 */
@Directive({
    selector: 'a[kitRouterLink],area[kitRouterLink]',
})
export class LinkWithHrefDirective extends RouterLinkWithHref
    implements LinkActiveChild, OnInit, OnChanges, OnDestroy {
    public constructor(
        router: Router,
        route: ActivatedRoute,
        locationStrategy: LocationStrategy,
        protected service: RouterService,
        @Inject(LinkActiveContainer) @Optional()
        protected readonly container: LinkActiveContainer | null = null,
    ) {
        super(router, route, locationStrategy);
    }

    // <editor-fold desc="Getters / Setters ">
    // =========================================================================
    @Input()
    public set kitRouterLink(link: Link) {
        this.routerLink = this.service.url(link);
    }

    @Input()
    public set relativeTo(relativeTo: NavRelativeTo) {
        // tslint:disable-next-line:no-string-literal
        this['route'] = this.service.getRelativeToRoute(relativeTo);
    }

    // </editor-fold>

    // <editor-fold desc="Angular">
    // =========================================================================
    public ngOnInit(): void {
        if (this.container) {
            this.container.add(this);
        }
    }

    public ngOnChanges(changes: SimpleChanges): void {
        super.ngOnChanges(changes);

        if (this.container) {
            this.container.check(this);
        }
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();

        if (this.container) {
            this.container.delete(this);
        }
    }

    // </editor-fold>

    // <editor-fold desc="LinkActiveChild">
    // =========================================================================
    public getUrlTree(): UrlTree {
        return this.urlTree;
    }

    // </editor-fold>
}
