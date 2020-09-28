import {Optional, Provider, Self, SkipSelf, Type} from '@angular/core';
import {ErrorFormatter}                           from './ErrorFormatter';
import {ErrorFormatters}                          from './ErrorFormatters';
import {ErrorFormatterComponent}                  from './Formatters/ErrorFormatterComponent';

export class ErrorFormattersProvider {
    public static provide(): Provider {
        return {
            provide:    ErrorFormatters,
            deps:       [
                [new Self(), ErrorFormatter],
                [new Optional(), new SkipSelf(), ErrorFormatter],
            ],
            useFactory: ErrorFormattersProviderFactory,
        };
    }
}

export function ErrorFormattersProviderFactory(own: Type<ErrorFormatterComponent>[],
                                               formatters?: Type<ErrorFormatterComponent>[]): Type<ErrorFormatterComponent>[] {
    return [...(formatters || []), ...own];
}
