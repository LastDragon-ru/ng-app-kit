import {InjectionToken, Type}    from '@angular/core';
import {ErrorFormatterComponent} from 'projects/core/src/lib/Components/Error/Formatters/ErrorFormatterComponent';

export const ErrorFormatter = new InjectionToken<Type<ErrorFormatterComponent>[]>('ErrorFormatter');
