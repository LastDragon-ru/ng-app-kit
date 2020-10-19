import {HashMap} from '../Types/HashMap';
import {isArray} from './isArray';

export function isHashMap<T>(value: any): value is HashMap<T> { // tslint:disable-line:no-any
    return !isArray(value) && !!value && value.constructor && value.constructor === Object;
}
