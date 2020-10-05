import {TemplateRef}                                 from '@angular/core';
import {TestBed}                                     from '@angular/core/testing';
import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {RouterTestingModule}                         from '@angular/router/testing';
import {ConfirmatorService}                          from '@lastdragon-ru/ng-app-kit-core';
import {ConfirmatorTestingService}                   from '@lastdragon-ru/ng-app-kit-core-testing';
import {Observable}                                  from 'rxjs';
import {CanDeactivateGuard}                          from './CanDeactivateGuard';
import {CanDeactivateMessage}                        from './CanDeactivateMessage';
import {ConfirmDeactivation}                         from './ConfirmDeactivation';

describe('CanDeactivateGuard', () => {
    const route: ActivatedRouteSnapshot = <ActivatedRouteSnapshot> {};
    const state: RouterStateSnapshot    = <RouterStateSnapshot> {};
    const confirmed                     = new ConfirmatorTestingService(true);
    const rejected                      = new ConfirmatorTestingService(false);

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports:   [RouterTestingModule],
            providers: [
                CanDeactivateGuard,
                {
                    provide:  ConfirmatorService,
                    useValue: confirmed,
                },
            ],
        });
    });

    it('should create', () => {
        expect(TestBed.inject(CanDeactivateGuard)).toBeTruthy();
    });

    it('Should be deactivated if component not implements `DeactivatableComponent`.', () => {
        const guard  = TestBed.inject(CanDeactivateGuard);
        const result = guard.canDeactivate(<ConfirmDeactivation> {}, route, state);

        expect(result).toBeTrue();
    });

    it('Should be deactivated if `canDeactivate()` returns `true`.', () => {
        const guard  = TestBed.inject(CanDeactivateGuard);
        const result = guard.canDeactivate(<ConfirmDeactivation> {
            canDeactivate: () => true,
        }, route, state);  // tslint:disable-line:align

        expect(result).toBeTrue();
    });

    it('Should be deactivated if `canDeactivate()` returns `false` but confirmed.', () => {
        TestBed.overrideProvider(ConfirmatorService, {useValue: confirmed});

        const guard     = TestBed.inject(CanDeactivateGuard);
        const component = <ConfirmDeactivation> {
            canDeactivate: () => false,
        };
        const result    = guard.canDeactivate(component, route, state);
        const spy       = jasmine.createSpy();

        expect(result instanceof Observable).toBeTrue();

        if (result instanceof Observable) {
            result.subscribe(spy);
            expect(spy).toHaveBeenCalledWith(true);
        }
    });

    it('Should not be deactivated if `canDeactivate()` returns `false` but rejected.', () => {
        TestBed.overrideProvider(ConfirmatorService, {useValue: rejected});

        const guard     = TestBed.inject(CanDeactivateGuard);
        const component = <ConfirmDeactivation> {
            canDeactivate: () => false,
        };
        const result    = guard.canDeactivate(component, route, state);
        const spy       = jasmine.createSpy();

        expect(result instanceof Observable).toBeTrue();

        if (result instanceof Observable) {
            result.subscribe(spy);
            expect(spy).toHaveBeenCalledWith(false);
        }
    });

    it('`DeactivatableComponent.canDeactivateMessage()` should have the biggest priority.', () => {
        const appMessage  = <TemplateRef<unknown>> <unknown> {app: true};
        const compMessage = <TemplateRef<unknown>> <unknown> {comp: true};

        TestBed.overrideProvider(CanDeactivateMessage, {useValue: appMessage});

        const service   = <ConfirmatorService> TestBed.inject(ConfirmatorService);
        const spy       = spyOn(service, 'confirm').and.callThrough();
        const component = <ConfirmDeactivation> {
            canDeactivate:        () => false,
            canDeactivateMessage: () => compMessage,
        };

        const guard  = TestBed.inject(CanDeactivateGuard);
        const result = guard.canDeactivate(component, route, state);

        if (result instanceof Observable) {
            result.subscribe(() => void 0);
        }

        expect(result instanceof Observable).toBeTrue();
        expect(spy).toHaveBeenCalledWith(compMessage);
    });

    it('`CanDeactivateMessage` should be used.', () => {
        const appMessage = <TemplateRef<unknown>> <unknown> {app: true};

        TestBed.overrideProvider(CanDeactivateMessage, {useValue: appMessage});

        const service   = <ConfirmatorService> TestBed.inject(ConfirmatorService);
        const spy       = spyOn(service, 'confirm').and.callThrough();
        const component = <ConfirmDeactivation> {
            canDeactivate: () => false,
        };

        const guard  = TestBed.inject(CanDeactivateGuard);
        const result = guard.canDeactivate(component, route, state);

        if (result instanceof Observable) {
            result.subscribe(() => void 0);
        }

        expect(result instanceof Observable).toBeTrue();
        expect(spy).toHaveBeenCalledWith(appMessage);
    });
});
