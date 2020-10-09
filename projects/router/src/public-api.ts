/*
 * Public API Surface of router
 */

import {LinkDirective}         from './lib/Directives/LinkDirective';
import {LinkWithHrefDirective} from './lib/Directives/LinkWithHrefDirective';
import {CanDeactivateGuard}    from './lib/Guards/CanDeactivateGuard/CanDeactivateGuard';
import {CanDeactivateMessage}  from './lib/Guards/CanDeactivateGuard/CanDeactivateMessage';
import {ConfirmDeactivation}   from './lib/Guards/CanDeactivateGuard/ConfirmDeactivation';
import {Resolver}              from './lib/Resolvers/Resolver';
import {ResolverErrorHandler}  from './lib/Resolvers/ResolverErrorHandler';
import {RouterModule}          from './lib/RouterModule';
import {Link}                  from './lib/Services/RouterService/Link';
import {NavExtras}             from './lib/Services/RouterService/NavExtras';
import {NavRelativeTo}         from './lib/Services/RouterService/NavRelativeTo';
import {RouterService}         from './lib/Services/RouterService/RouterService';

export {
    RouterModule as AppKitRouterModule,
    CanDeactivateGuard,
    CanDeactivateMessage,
    ConfirmDeactivation,
    Resolver,
    ResolverErrorHandler,
    Link,
    NavExtras,
    NavRelativeTo,
    RouterService,
    LinkDirective,
    LinkWithHrefDirective,
};
