import {HashMap} from 'projects/core/src/lib/Classes/HashMap';
import {isArray} from 'projects/core/src/lib/Utils/isArray';

export function isHashMap<T>(value: any): value is HashMap<T> { // tslint:disable-line:no-any
    return !isArray(value) && !!value && value.constructor && value.constructor === Object;
}
