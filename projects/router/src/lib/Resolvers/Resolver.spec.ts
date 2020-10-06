import {Injectable}                                  from '@angular/core';
import {TestBed}                                     from '@angular/core/testing';
import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {RouterTestingModule}                         from '@angular/router/testing';
import {
    AppError,
    NotificatorService,
}                                                    from '@lastdragon-ru/ng-app-kit-core';
import {NotificatorTestingService}                   from '@lastdragon-ru/ng-app-kit-core-testing';
import {Observable, of, throwError}                  from 'rxjs';
import {Resolver}                                    from './Resolver';
import {ResolverErrorHandler}                        from './ResolverErrorHandler';

describe('Resolver', () => {
    const route: ActivatedRouteSnapshot = <ActivatedRouteSnapshot> {};
    const state: RouterStateSnapshot    = <RouterStateSnapshot> {};

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports:   [RouterTestingModule],
            providers: [
                ResolvedResolver,
                UnResolvedResolver,
                {
                    provide:  NotificatorService,
                    useClass: NotificatorTestingService,
                },
            ],
        });
    });

    it('Nothing happened when resolved', () => {
        const resolver = TestBed.inject(ResolvedResolver);
        const resolved = resolver.resolve(route, state);
        const spy      = jasmine.createSpy();

        expect(resolved instanceof Observable).toBeTrue();

        if (resolved instanceof Observable) {
            resolved.subscribe(spy);
            expect(spy).toHaveBeenCalledWith(resolver.value);
        }
    });

    it('`NotificatorService.error()` should be called', () => {
        const notificator       = TestBed.inject(NotificatorService);
        const resolver          = TestBed.inject(UnResolvedResolver);
        const resolved          = resolver.resolve(route, state);
        const errorSpy          = spyOn(notificator, 'error');
        const subscribeSpy      = jasmine.createSpy();
        const subscribeErrorSpy = jasmine.createSpy();

        expect(resolved instanceof Observable).toBeTrue();

        if (resolved instanceof Observable) {
            resolved.subscribe(subscribeSpy, subscribeErrorSpy);

            expect(subscribeSpy).not.toHaveBeenCalled();
            expect(subscribeErrorSpy).toHaveBeenCalledWith(resolver.value);
            expect(errorSpy).toHaveBeenCalledWith(resolver.value);
        }
    });

    it('`ResolverErrorHandler` should be called', () => {
        TestBed.overrideProvider(ResolverErrorHandler, {
            useValue: new TestResolverErrorHandler(),
        });

        const notificator       = TestBed.inject(NotificatorService);
        const resolver          = TestBed.inject(UnResolvedResolver);
        const resolved          = resolver.resolve(route, state);
        const handler           = TestBed.inject(ResolverErrorHandler);
        const handlerSpy        = spyOn(handler, 'onError').and.callThrough();
        const errorSpy          = spyOn(notificator, 'error');
        const subscribeSpy      = jasmine.createSpy();
        const subscribeErrorSpy = jasmine.createSpy();

        expect(resolved instanceof Observable).toBeTrue();

        if (resolved instanceof Observable) {
            resolved.subscribe(subscribeSpy, subscribeErrorSpy);

            expect(subscribeSpy).not.toHaveBeenCalled();
            expect(errorSpy).not.toHaveBeenCalled();
            expect(subscribeErrorSpy).toHaveBeenCalledWith(resolver.value);
            expect(handlerSpy).toHaveBeenCalledWith(resolver.value);
        }
    });
});

@Injectable()
class ResolvedResolver extends Resolver<boolean> {
    public readonly value = true;

    protected resolver(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return of(this.value);
    }
}

@Injectable()
class UnResolvedResolver extends Resolver<boolean> {
    public readonly value = new Error('UnResolvedResolver');

    protected resolver(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return throwError(this.value);
    }
}

@Injectable()
class TestResolverErrorHandler extends ResolverErrorHandler {
    public onError(error: AppError): void {
        // empty
    }
}
