import {
    Attribute,
    Directive,
    ElementRef,
    Inject,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Optional,
    Renderer2,
    SimpleChanges,
}                                                    from '@angular/core';
import {ActivatedRoute, Router, RouterLink, UrlTree} from '@angular/router';
import {Link}                                        from '../Services/RouterService/Link';
import {NavRelativeTo}                               from '../Services/RouterService/NavRelativeTo';
import {RouterService}                               from '../Services/RouterService/RouterService';
import {LinkActiveChild}                             from './LinkActive/LinkActiveChild';
import {LinkActiveContainer}                         from './LinkActive/LinkActiveContainer';

/**
 * Same as `[routerLink]` but with kit's URLs support.
 */
@Directive({
    selector: ':not(a):not(area)[kitRouterLink]',
})
export class LinkDirective extends RouterLink
    implements LinkActiveChild, OnInit, OnChanges, OnDestroy {
    public constructor(
        router: Router,
        route: ActivatedRoute,
        @Attribute('tabindex') tabIndex: string,
        renderer: Renderer2,
        el: ElementRef,
        protected readonly service: RouterService,
        @Inject(LinkActiveContainer) @Optional()
        protected readonly container: LinkActiveContainer | null = null,
    ) {
        super(router, route, tabIndex, renderer, el);
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
