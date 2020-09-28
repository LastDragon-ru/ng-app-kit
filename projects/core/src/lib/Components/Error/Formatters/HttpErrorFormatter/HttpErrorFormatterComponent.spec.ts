import {HttpErrorResponse}                       from '@angular/common/http';
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {isEmpty}                                 from '../../../../Utils/isEmpty';
import {HttpErrorFormatterComponent}             from './HttpErrorFormatterComponent';

describe('HttpErrorFormatterComponent', () => {
    let component: HttpErrorFormatterComponent;
    let fixture: ComponentFixture<HttpErrorFormatterComponent>;
    let element: HTMLElement;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [HttpErrorFormatterComponent],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture   = TestBed.createComponent(HttpErrorFormatterComponent);
        element   = fixture.nativeElement;
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('error is HttpErrorResponse', () => {
        component.error = new HttpErrorResponse({status: 404});
        fixture.detectChanges();

        expect(isEmpty(element.textContent)).toBeFalse();
    });

    it('error is not HttpErrorResponse', () => {
        component.error = true;
        fixture.detectChanges();

        expect(isEmpty(element.textContent)).toBeTrue();
    });
});
