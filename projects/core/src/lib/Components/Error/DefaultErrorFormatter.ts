import {InjectionToken, Type}    from '@angular/core';
import {ErrorFormatterComponent} from 'projects/core/src/lib/Components/Error/Formatters/ErrorFormatterComponent';

export const DefaultErrorFormatter = new InjectionToken<Type<ErrorFormatterComponent>>('DefaultErrorFormatter');
