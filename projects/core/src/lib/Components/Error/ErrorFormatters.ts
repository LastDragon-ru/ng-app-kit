import {InjectionToken, Type} from '@angular/core';
import {ErrorFormatter}       from './ErrorFormatter';

export const ErrorFormatters = new InjectionToken<Type<ErrorFormatter>[]>('ErrorFormatters');
