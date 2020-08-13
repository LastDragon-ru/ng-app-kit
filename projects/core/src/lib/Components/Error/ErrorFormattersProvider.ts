import {Optional, Provider, Self, SkipSelf, Type} from '@angular/core';
import {ErrorFormatter}                           from 'projects/core/src/lib/Components/Error/ErrorFormatter';
import {ErrorFormatters}                          from 'projects/core/src/lib/Components/Error/ErrorFormatters';
import {ErrorFormatterComponent}                  from 'projects/core/src/lib/Components/Error/Formatters/ErrorFormatterComponent';

export class ErrorFormattersProvider {
    public static provide(): Provider {
        return {
            provide:    ErrorFormatters,
            deps:       [
                [new Self(), ErrorFormatter],
                [new Optional(), new SkipSelf(), ErrorFormatter],
            ],
            useFactory: (own: Type<ErrorFormatterComponent>[],
                         formatters?: Type<ErrorFormatterComponent>[]): Type<ErrorFormatterComponent>[] => {
                return [...own, ...(formatters || [])];
            },
        };
    }
}
