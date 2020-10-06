/*
 * Public API Surface of router
 */

import {CanDeactivateGuard}   from './lib/Guards/CanDeactivateGuard/CanDeactivateGuard';
import {CanDeactivateMessage} from './lib/Guards/CanDeactivateGuard/CanDeactivateMessage';
import {ConfirmDeactivation}  from './lib/Guards/CanDeactivateGuard/ConfirmDeactivation';
import {Resolver}             from './lib/Resolvers/Resolver';
import {ResolverErrorHandler} from './lib/Resolvers/ResolverErrorHandler';
import {RouterModule}         from './lib/RouterModule';

export {
    RouterModule as AppKitRouterModule,
    CanDeactivateGuard,
    CanDeactivateMessage,
    ConfirmDeactivation,
    Resolver,
    ResolverErrorHandler,
};
