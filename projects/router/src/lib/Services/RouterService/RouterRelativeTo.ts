import {InjectionToken} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NavRelativeTo}  from './NavRelativeTo';

export const RouterRelativeTo = new InjectionToken<Exclude<NavRelativeTo, ActivatedRoute | null>>('RouterRelativeTo');
