import {Template} from '@lastdragon-ru/ng-app-kit-core';

export interface ConfirmDeactivation {
    canDeactivate: () => boolean;
    canDeactivateMessage?: () => Template<unknown>;
}
