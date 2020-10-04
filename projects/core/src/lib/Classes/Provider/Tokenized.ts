import {Optional, Self, SkipSelf} from '@angular/core';
import {Token}                    from './Token';

export type Tokenized<T extends unknown[]> = {
    [P in keyof T]: Token<Extract<T[P]>> | [Token<Extract<T[P]>>, ...(Optional|SkipSelf|Self)[]]
};

type Extract<T> = T extends Array<infer U> ? U : T;
