import {isArray} from 'projects/core/src/lib/Utils/isArray';

export function isObject(value: any, type?: typeof Object): value is Object { // tslint:disable-line:ban-types
    return !isArray(value) && Object(value) === value
        && (!type || (value.constructor && value.constructor === type));
}
