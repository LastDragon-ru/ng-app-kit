import {InjectionToken} from '@angular/core';
import {ErrorFormatter} from 'projects/core/src/lib/Services/ErrorFormatterService/ErrorFormatter';

export const ErrorFormatters = new InjectionToken<ErrorFormatter<any>[]>('ErrorFormatters');
