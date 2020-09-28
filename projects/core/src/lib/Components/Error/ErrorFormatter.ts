import {InjectionToken, Type}    from '@angular/core';
import {ErrorFormatterComponent} from './Formatters/ErrorFormatterComponent';

export const ErrorFormatter = new InjectionToken<Type<ErrorFormatterComponent>[]>('ErrorFormatter');
