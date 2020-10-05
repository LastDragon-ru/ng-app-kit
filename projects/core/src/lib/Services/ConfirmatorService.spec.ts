import {Template}           from '@lastdragon-ru/ng-app-kit-core';
import {Observable, of}     from 'rxjs';
import {ConfirmatorService} from './ConfirmatorService';

describe('ConfirmatorService', () => {
    it('Only `confirmed()` should be called if confirmed.', () => {
        const service               = new ConfirmatorServiceImpl(true);
        const confirmedSpy          = jasmine.createSpy();
        const confirmedObservable   = service.confirmed();
        const confirmedSubscription = confirmedObservable.subscribe(confirmedSpy);
        const rejectedSpy           = jasmine.createSpy();
        const rejectedObservable    = service.rejected();
        const rejectedSubscription  = rejectedObservable.subscribe(rejectedSpy);

        expect(confirmedSubscription.closed).toBeTrue();
        expect(rejectedSubscription.closed).toBeTrue();

        expect(confirmedSpy).toHaveBeenCalled();
        expect(rejectedSpy).not.toHaveBeenCalled();
    });

    it('Only `rejected()` should be called if rejected.', () => {
        const service               = new ConfirmatorServiceImpl(false);
        const confirmedSpy          = jasmine.createSpy();
        const confirmedObservable   = service.confirmed();
        const confirmedSubscription = confirmedObservable.subscribe(confirmedSpy);
        const rejectedSpy           = jasmine.createSpy();
        const rejectedObservable    = service.rejected();
        const rejectedSubscription  = rejectedObservable.subscribe(rejectedSpy);

        expect(confirmedSubscription.closed).toBeTrue();
        expect(rejectedSubscription.closed).toBeTrue();

        expect(confirmedSpy).not.toHaveBeenCalled();
        expect(rejectedSpy).toHaveBeenCalled();
    });
});

class ConfirmatorServiceImpl extends ConfirmatorService {
    public constructor(protected result: boolean) {
        super();
    }

    public confirm<T>(message?: Template<T> | null): Observable<boolean> {
        return of(this.result);
    }
}
