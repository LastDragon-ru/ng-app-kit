/*
 * Public API Surface of router
 */

import {CanDeactivateGuard}   from './lib/Guards/CanDeactivateGuard/CanDeactivateGuard';
import {CanDeactivateMessage} from './lib/Guards/CanDeactivateGuard/CanDeactivateMessage';
import {ConfirmDeactivation}  from './lib/Guards/CanDeactivateGuard/ConfirmDeactivation';
import {RouterModule}         from './lib/RouterModule';

export {
    RouterModule as AppKitRouterModule,
    CanDeactivateGuard,
    CanDeactivateMessage,
    ConfirmDeactivation,
};
