import {isArray} from './isArray';

export function isObject(value: any): value is object { // tslint:disable-line:no-any
    return !isArray(value) && !!value && typeof value === 'object';
}
