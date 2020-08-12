import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ErrorComponent}                   from 'projects/core/src/lib/Components/Error/ErrorComponent';

describe('ErrorComponent', () => {
    let component: ErrorComponent;
    let fixture: ComponentFixture<ErrorComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ErrorComponent],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture   = TestBed.createComponent(ErrorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    xit('test me', () => {
        expect(component).toBeTruthy();
    });
});
