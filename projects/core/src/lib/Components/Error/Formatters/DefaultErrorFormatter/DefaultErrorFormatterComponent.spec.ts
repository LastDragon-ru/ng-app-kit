import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {DefaultErrorFormatterComponent}          from './DefaultErrorFormatterComponent';

describe('DefaultErrorFormatterComponent', () => {
    let component: DefaultErrorFormatterComponent;
    let fixture: ComponentFixture<DefaultErrorFormatterComponent>;
    let element: HTMLElement;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [DefaultErrorFormatterComponent],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture   = TestBed.createComponent(DefaultErrorFormatterComponent);
        element   = fixture.nativeElement;
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('error is string', () => {
        component.error = 'test';
        fixture.detectChanges();

        expect(element.textContent).toContain('test');
    });

    it('error is not string', () => {
        component.error = true;
        fixture.detectChanges();

        expect(element.textContent).toContain('Unknown error.');
    });
});
