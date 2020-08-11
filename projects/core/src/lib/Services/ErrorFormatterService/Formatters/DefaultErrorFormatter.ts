import {TranslationString} from 'projects/core/src/lib/I18n/TranslationString';
import {Error}             from 'projects/core/src/lib/Services/ErrorFormatterService/Error';
import {ErrorFormatter}    from 'projects/core/src/lib/Services/ErrorFormatterService/ErrorFormatter';
import {isBoolean}         from 'projects/core/src/lib/Utils/isBoolean';
import {isString}          from 'projects/core/src/lib/Utils/isString';

export class DefaultErrorFormatter extends ErrorFormatter<any> {
    public isError(error: Error): error is any {
        return true;
    }

    public format(error: any): Error | TranslationString | string {
        let message: TranslationString | string;

        if (isBoolean(error) && error === false) {
            message = '';
        } else if (isString(error)) {
            message = error;
        } else {
            message = ['kitCore.ErrorFormatter.DefaultErrorFormatter.unknown'];
        }

        return message;
    }
}
