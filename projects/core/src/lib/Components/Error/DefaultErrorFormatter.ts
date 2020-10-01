import {InjectionToken, Type}    from '@angular/core';
import {ErrorFormatterComponent} from './Formatters/ErrorFormatterComponent';

// TODO [?] Is it really needed?

export const DefaultErrorFormatter = new InjectionToken<Type<ErrorFormatterComponent>>('DefaultErrorFormatter');
