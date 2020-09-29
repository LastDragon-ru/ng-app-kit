import {InjectionToken, Type} from '@angular/core';
import {ErrorFormatter}       from './ErrorFormatter';

export const ErrorFormatterToken = new InjectionToken<Type<ErrorFormatter>[]>('ErrorFormatter');
