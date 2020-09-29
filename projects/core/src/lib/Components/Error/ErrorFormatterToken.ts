import {InjectionToken, Type}    from '@angular/core';
import {ErrorFormatterComponent} from './Formatters/ErrorFormatterComponent';

export const ErrorFormatterToken = new InjectionToken<Type<ErrorFormatterComponent>[]>('ErrorFormatter');
