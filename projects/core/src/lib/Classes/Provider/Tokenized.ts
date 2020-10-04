import {Token} from './Token';

export type Tokenized<T extends unknown[]> = {
    [P in keyof T]: Token<T[P] extends Array<infer U> ? U : T[P]>
};
