import {HttpErrorResponse} from '@angular/common/http';
import {TranslationString} from 'projects/core/src/lib/I18n/TranslationString';
import {Error}             from 'projects/core/src/lib/Services/ErrorFormatterService/Error';
import {ErrorFormatter}    from 'projects/core/src/lib/Services/ErrorFormatterService/ErrorFormatter';

export class HttpErrorFormatter extends ErrorFormatter<HttpErrorResponse> {
    public isError(error: any): error is HttpErrorResponse {
        return error instanceof HttpErrorResponse;
    }

    public format(error: HttpErrorResponse): Error | TranslationString | string {
        // TODO [ErrorFormatter] Add default http error.
        return [`kitCore.ErrorFormatter.HttpErrorFormatter.${error.status}`, {
            status:  error.status,
            message: error.statusText,
        }];
    }
}
