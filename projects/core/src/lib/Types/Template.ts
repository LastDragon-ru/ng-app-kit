import {TemplateRef, Type} from '@angular/core';

export type Template<T = unknown> = Type<T> | TemplateRef<T>;
