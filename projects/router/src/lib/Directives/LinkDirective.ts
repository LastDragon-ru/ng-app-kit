import {
    Attribute,
    Directive,
    ElementRef,
    Input,
    Renderer2,
}                                           from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {Link}                               from '../Services/RouterService/Link';
import {NavRelativeTo}                      from '../Services/RouterService/NavRelativeTo';
import {RouterService}                      from '../Services/RouterService/RouterService';

/**
 * Same as `[routerLink]` but with kit's URLs support.
 */
@Directive({
    selector: ':not(a):not(area)[kitRouterLink]',
})
export class LinkDirective extends RouterLink {
    public constructor(
        router: Router,
        route: ActivatedRoute,
        @Attribute('tabindex') tabIndex: string,
        renderer: Renderer2,
        el: ElementRef,
        protected service: RouterService,
    ) {
        super(router, route, tabIndex, renderer, el);
    }

    @Input()
    public set kitRouterLink(link: Link) {
        this.routerLink = this.service.url(link);
    }

    @Input()
    public set relativeTo(relativeTo: NavRelativeTo) {
        // tslint:disable-next-line:no-string-literal
        this['route'] = this.service.getRelativeToRoute(relativeTo);
    }
}
