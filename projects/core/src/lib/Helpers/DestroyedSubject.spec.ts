import {Component, Directive, ViewChild} from '@angular/core';
import {TestBed}                         from '@angular/core/testing';
import {DestroyedSubject}                from './DestroyedSubject';

describe('Destroyed', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                TestComponent,
                TestDirective,
            ],
        });
    });

    it('ngOnDestroy() should be called for Components/Directive', () => {
        const fixture = TestBed.createComponent(TestComponent);
        fixture.detectChanges();

        const componentSpy = spyOn(fixture.componentInstance.destroyed, 'complete').and.callThrough();
        const directiveSpy = spyOn(fixture.componentInstance.directive.destroyed, 'complete').and.callThrough();

        fixture.destroy();

        expect(componentSpy).toHaveBeenCalled();
        expect(directiveSpy).toHaveBeenCalled();
    });

    it('complete() should call next()', () => {
        const subject = new DestroyedSubject();
        const spy     = spyOn(subject, 'next');

        subject.complete();

        expect(spy).toHaveBeenCalled();
    });
});

@Directive({
    selector:  '[kitCoreTestDestroyedSubject]',
    providers: [DestroyedSubject],
})
class TestDirective {
    public constructor(public readonly destroyed: DestroyedSubject) {
        // empty
    }
}

@Component({
    template:  '<span kitCoreTestDestroyedSubject></span>',
    providers: [DestroyedSubject],
})
class TestComponent {
    @ViewChild(TestDirective)
    public directive!: TestDirective;

    public constructor(public readonly destroyed: DestroyedSubject) {
        // empty
    }
}
