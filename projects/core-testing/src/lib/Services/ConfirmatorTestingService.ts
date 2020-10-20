import {
    ConfirmatorService,
    Severity,
    Template,
}                       from '@lastdragon-ru/ng-app-kit-core';
import {Observable, of} from 'rxjs';

export class ConfirmatorTestingService extends ConfirmatorService {
    public constructor(protected result: boolean) {
        super();
    }

    public confirm<T>(message?: Template<T> | null, severity?: Severity | null): Observable<boolean> {
        return of(this.result);
    }
}
