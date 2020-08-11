import {Optional, Provider, Self, SkipSelf} from '@angular/core';
import {ErrorFormatter}                     from 'projects/core/src/lib/Services/ErrorFormatterService/ErrorFormatter';
import {ErrorFormatters}                    from 'projects/core/src/lib/Services/ErrorFormatterService/ErrorFormatters';

export class ErrorFormattersProvider {
    public static provide(): Provider {
        return {
            provide:    ErrorFormatters,
            deps:       [
                [new Self(), ErrorFormatter],
                [new Optional(), new SkipSelf(), ErrorFormatter],
            ],
            useFactory: (own: ErrorFormatter<any>[], formatters?: ErrorFormatter<any>[]): ErrorFormatter<any>[] => {
                return [...own, ...(formatters || [])];
            },
        };
    }
}
