import {InjectionToken, Type}    from '@angular/core';
import {ErrorFormatterComponent} from 'projects/core/src/lib/Components/Error/Formatters/ErrorFormatterComponent';

export const ErrorFormatters = new InjectionToken<Type<ErrorFormatterComponent>[]>('ErrorFormatters');
