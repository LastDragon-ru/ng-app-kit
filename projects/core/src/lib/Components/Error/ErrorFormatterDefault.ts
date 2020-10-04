import {InjectionToken, Type}    from '@angular/core';
import {ErrorFormatterComponent} from './Formatters/ErrorFormatterComponent';

export const ErrorFormatterDefault = new InjectionToken<Type<ErrorFormatterComponent>>('ErrorFormatterDefault');
