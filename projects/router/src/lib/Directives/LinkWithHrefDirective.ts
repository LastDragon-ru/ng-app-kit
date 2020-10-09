import {LocationStrategy}                           from '@angular/common';
import {Directive, Input}                           from '@angular/core';
import {ActivatedRoute, Router, RouterLinkWithHref} from '@angular/router';
import {Link}                                       from '../Services/RouterService/Link';
import {NavRelativeTo}                              from '../Services/RouterService/NavRelativeTo';
import {RouterService}                              from '../Services/RouterService/RouterService';

/**
 * Same as `[routerLink]` but with kit's URLs support.
 */
@Directive({
    selector: 'a[kitRouterLink],area[kitRouterLink]',
})
export class LinkWithHrefDirective extends RouterLinkWithHref {
    public constructor(
        router: Router,
        route: ActivatedRoute,
        locationStrategy: LocationStrategy,
        protected service: RouterService,
    ) {
        super(router, route, locationStrategy);
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
