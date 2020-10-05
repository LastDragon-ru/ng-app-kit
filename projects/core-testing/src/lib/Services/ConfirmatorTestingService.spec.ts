import {ConfirmatorTestingService} from './ConfirmatorTestingService';

describe('ConfirmatorTestingService', () => {
    describe('confirm()', () => {
        it('Should be confirmed', () => {
            const spy = jasmine.createSpy();

            (new ConfirmatorTestingService(true)).confirm().subscribe(spy);

            expect(spy).toHaveBeenCalledWith(true);
        });

        it('Should be rejected', () => {
            const spy = jasmine.createSpy();

            (new ConfirmatorTestingService(false)).confirm().subscribe(spy);

            expect(spy).toHaveBeenCalledWith(false);
        });
    });

    describe('confirmed()', () => {
        it('Should be confirmed', () => {
            const spy = jasmine.createSpy();

            (new ConfirmatorTestingService(true)).confirmed().subscribe(spy);

            expect(spy).toHaveBeenCalled();
        });

        it('Should be rejected', () => {
            const spy = jasmine.createSpy();

            (new ConfirmatorTestingService(false)).confirmed().subscribe(spy);

            expect(spy).not.toHaveBeenCalled();
        });
    });

    describe('rejected()', () => {
        it('Should be confirmed', () => {
            const spy = jasmine.createSpy();

            (new ConfirmatorTestingService(true)).rejected().subscribe(spy);

            expect(spy).not.toHaveBeenCalled();
        });

        it('Should be rejected', () => {
            const spy = jasmine.createSpy();

            (new ConfirmatorTestingService(false)).rejected().subscribe(spy);

            expect(spy).toHaveBeenCalled();
        });
    });
});
