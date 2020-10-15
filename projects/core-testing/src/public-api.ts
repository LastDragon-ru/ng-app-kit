/*
 * Public API Surface of core-testing
 */

import {EmptyComponent}            from './lib/Components/EmptyComponent/EmptyComponent';
import {ConfirmatorTestingService} from './lib/Services/ConfirmatorTestingService';
import {NotificatorTestingService} from './lib/Services/NotificatorTestingService';
import {using}                     from './lib/Utils/using';

export {
    using,
    ConfirmatorTestingService,
    NotificatorTestingService,
    EmptyComponent,
};
