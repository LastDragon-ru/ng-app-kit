import {Observable, of}    from 'rxjs';
import {filter, switchMap} from 'rxjs/operators';
import {Template}          from '../Types/Template';

export abstract class ConfirmatorService {
    public abstract confirm<T>(message?: Template<T> | null): Observable<boolean>;

    public confirmed<T>(message?: Template<T> | null): Observable<void> {
        return this.confirm(message).pipe(
            filter((confirmed: boolean) => confirmed),
            switchMap(() => of(void (0))),
        );
    }

    public rejected<T>(message?: Template<T> | null): Observable<void> {
        return this.confirm(message).pipe(
            filter((confirmed: boolean) => !confirmed),
            switchMap(() => of(void (0))),
        );
    }
}
