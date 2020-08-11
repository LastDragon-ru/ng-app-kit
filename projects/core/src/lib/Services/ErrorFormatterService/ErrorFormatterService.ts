import {Inject, Injectable, Optional} from '@angular/core';
import {Error}                        from 'projects/core/src/lib/Services/ErrorFormatterService/Error';
import {ErrorFormatter}               from 'projects/core/src/lib/Services/ErrorFormatterService/ErrorFormatter';
import {ErrorFormatters}              from 'projects/core/src/lib/Services/ErrorFormatterService/ErrorFormatters';
import {DefaultErrorFormatter}        from 'projects/core/src/lib/Services/ErrorFormatterService/Formatters/DefaultErrorFormatter';
import {isString}                     from 'projects/core/src/lib/Utils/isString';

@Injectable({
    providedIn: 'root',
})
export class ErrorFormatterService {
    public constructor(@Optional() @Inject(ErrorFormatters) private formatters: ErrorFormatter<any>[],
                       @Optional() private defaultFormatter: DefaultErrorFormatter) {
        this.defaultFormatter = this.defaultFormatter || new DefaultErrorFormatter();
    }

    public format(error: Error): string {
        for (const formatter of this.formatters) {
            if (formatter.isError(error)) {
                error = formatter.format(error);

                if (isString(error)) {
                    break;
                }
            }
        }

        return this.defaultFormatter.format(error);
    }
}
