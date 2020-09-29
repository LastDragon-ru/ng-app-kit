import {InjectionToken, Type} from '@angular/core';
import {ErrorFormatter}       from './ErrorFormatter';

// TODO [?] Is it really needed?

export const DefaultErrorFormatter = new InjectionToken<Type<ErrorFormatter>>('DefaultErrorFormatter');
