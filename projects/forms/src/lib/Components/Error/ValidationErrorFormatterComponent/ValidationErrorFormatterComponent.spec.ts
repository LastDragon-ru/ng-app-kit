import {HttpErrorResponse}                 from '@angular/common/http';
import {ComponentFixture, TestBed}         from '@angular/core/testing';
import {isEmpty}                           from '@lastdragon-ru/ng-app-kit-core';
import {ValidationErrorFormatterComponent} from './ValidationErrorFormatterComponent';

describe('ValidationErrorFormatterComponent', () => {
    let component: ValidationErrorFormatterComponent;
    let fixture: ComponentFixture<ValidationErrorFormatterComponent>;
    let element: HTMLElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ValidationErrorFormatterComponent],
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture   = TestBed.createComponent(ValidationErrorFormatterComponent);
        element   = fixture.nativeElement;
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should show a message for a validation error', () => {
        component.setError({required: true});
        fixture.detectChanges();

        expect(isEmpty(element)).toBeFalse();
    });

    it('should not show a message for an unknown error', () => {
        component.setError({unknown: true});
        fixture.detectChanges();

        expect(isEmpty(element)).toBeTrue();
    });

    it('should not show a message for an unsupported error type', () => {
        component.setError(new HttpErrorResponse({status: 404}));
        fixture.detectChanges();

        expect(isEmpty(element)).toBeTrue();
    });
});
