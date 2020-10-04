import {InjectionToken, Type}    from '@angular/core';
import {ErrorFormatterComponent} from './Formatters/ErrorFormatterComponent';

export const ErrorFormatters = new InjectionToken<Type<ErrorFormatterComponent>>('ErrorFormatters');
