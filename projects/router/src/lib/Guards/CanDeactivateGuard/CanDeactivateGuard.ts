import {Inject, Injectable, Optional} from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanDeactivate,
    RouterStateSnapshot,
}                                     from '@angular/router';
import {
    ConfirmatorService,
    Template,
}                                     from '@lastdragon-ru/ng-app-kit-core';
import {Observable}                   from 'rxjs';
import {CanDeactivateMessage}         from './CanDeactivateMessage';
import {ConfirmDeactivation}          from './ConfirmDeactivation';

@Injectable({
    providedIn: 'root',
})
export class CanDeactivateGuard
    implements CanDeactivate<ConfirmDeactivation> {

    public constructor(
        protected confirmator: ConfirmatorService,
        @Inject(CanDeactivateMessage) @Optional()
        protected message: Template<unknown> | null = null,
    ) {
        // empty
    }

    public canDeactivate(
        component: ConfirmDeactivation,
        currentRoute: ActivatedRouteSnapshot,
        currentState: RouterStateSnapshot,
        nextState?: RouterStateSnapshot | undefined,
    ): Observable<boolean> | boolean {
        // Component doesn't implement interface?
        if (!component.canDeactivate) {
            return true;
        }

        // Can deactivate?
        if (component.canDeactivate()) {
            return true;
        }

        // Ask
        return this.confirmator.confirm(component.canDeactivateMessage
            ? component.canDeactivateMessage() || this.message
            : this.message);
    }
}
