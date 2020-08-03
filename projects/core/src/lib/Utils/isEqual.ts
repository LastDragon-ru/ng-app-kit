import {isArray} from 'projects/core/src/lib/Utils/isArray';
import {isObject} from 'projects/core/src/lib/Utils/isObject';

export function isEqual(a: any, b: any): boolean {
    // Same?
    if (a === b) {
        return true;
    }

    // Array?
    // https://stackoverflow.com/a/19746771
    if (isArray(a) && isArray(b) && a.length === b.length) {
        return a.every((value, index) => value === b[index]);
    }

    // Objects? (only {})
    // https://stackoverflow.com/a/52323412
    if (isObject(a, Object) && isObject(b, Object)) {
        const aKeys = Object.keys(a);
        const bKeys = Object.keys(b);

        return aKeys.length === bKeys.length
            && aKeys.every(key => b.hasOwnProperty(key) && a[key] === b[key]);
    }

    // end
    return false;
}
