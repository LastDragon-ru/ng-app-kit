import {Injectable, Optional}                        from '@angular/core';
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
}                                                    from '@angular/router';
import {NotificatorService}                          from '@lastdragon-ru/ng-app-kit-core';
import {Observable, pipe, throwError, UnaryFunction} from 'rxjs';
import {catchError}                                  from 'rxjs/operators';
import {ResolverErrorHandler}                        from './ResolverErrorHandler';

@Injectable()
export abstract class Resolver<T> implements Resolve<T> {
    public constructor(
        protected readonly notificator: NotificatorService,
        @Optional()
        protected readonly handler: ResolverErrorHandler | null = null,
    ) {
        // empty
    }

    // <editor-fold desc="Resolve">
    // =========================================================================
    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<T> | Promise<T> | T {
        return this.resolver(route, state).pipe(this.unresolved());
    }

    // </editor-fold>

    // <editor-fold desc="Abstract">
    // =========================================================================
    protected abstract resolver(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<T>;

    // </editor-fold>

    // <editor-fold desc="Functions">
    // =========================================================================
    private unresolved(): UnaryFunction<Observable<T>, Observable<T>> {
        return pipe(
            catchError((error: unknown) => {
                if (this.handler) {
                    this.handler.onError(error);
                } else {
                    this.notificator.error(error);
                }

                return throwError(error);
            }),
        );
    }

    // </editor-fold>
}
