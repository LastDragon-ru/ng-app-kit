import {TestBed}            from '@angular/core/testing';
import {NotificatorService} from './NotificatorService';

xdescribe('NotificatorService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service = TestBed.inject(NotificatorService);
        expect(service).toBeTruthy();
    });
});
