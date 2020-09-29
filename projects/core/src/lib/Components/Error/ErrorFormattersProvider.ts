import {Optional, Provider, Self, SkipSelf, Type} from '@angular/core';
import {ErrorFormatters}                          from './ErrorFormatters';
import {ErrorFormatterToken}                      from './ErrorFormatterToken';
import {ErrorFormatterComponent}                  from './Formatters/ErrorFormatterComponent';

export class ErrorFormattersProvider {
    public static provide(): Provider {
        return {
            provide:    ErrorFormatters,
            deps:       [
                [new Self(), ErrorFormatterToken],
                [new Optional(), new SkipSelf(), ErrorFormatterToken],
            ],
            useFactory: ErrorFormattersProviderFactory,
        };
    }
}

export function ErrorFormattersProviderFactory(own: Type<ErrorFormatterComponent>[],
                                               formatters?: Type<ErrorFormatterComponent>[]): Type<ErrorFormatterComponent>[] {
    return [...(formatters || []), ...own];
}
