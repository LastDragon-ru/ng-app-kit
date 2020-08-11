import {Injectable}        from '@angular/core';
import {TranslationString} from 'projects/core/src/lib/I18n/TranslationString';
import {Error}             from 'projects/core/src/lib/Services/ErrorFormatterService/Error';

@Injectable()
export abstract class ErrorFormatter<E> {
    public abstract isError(error: Error): error is E;

    public abstract format(error: E): Error | TranslationString | string;
}
