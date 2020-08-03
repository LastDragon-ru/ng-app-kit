import {isArray} from 'projects/core/src/lib/Utils/isArray';
import {isObject} from 'projects/core/src/lib/Utils/isObject';
import {isString} from 'projects/core/src/lib/Utils/isString';

export function isEmpty(value: any): boolean {
    return value == null
        || ((isString(value) || isArray(value)) && value.length === 0)
        || (isObject(value) && Object.keys(value).length === 0 && value.constructor === Object);
}
