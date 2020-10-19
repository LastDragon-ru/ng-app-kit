import {AbstractType, InjectionToken, Type} from '@angular/core';

export type Token<T> = Type<T> | AbstractType<T> | InjectionToken<T>;
