import {Observable} from 'rxjs';
import {Template}   from '../Classes/Template';

export abstract class ConfirmatorService {
    public abstract confirm<T>(message?: Template<T> | null): Observable<boolean>;

    public abstract confirmed<T>(message?: Template<T> | null): Observable<void>;

    public abstract rejected<T>(message?: Template<T> | null): Observable<void>;
}
