import {TestBed} from '@angular/core/testing';
import {ErrorFormatterService} from 'projects/core/src/lib/Services/ErrorFormatterService/ErrorFormatterService';

describe('ErrorFormatterService', () => {
    let service: ErrorFormatterService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ErrorFormatterService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
