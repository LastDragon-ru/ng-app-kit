import {isArray}   from 'projects/core/src/lib/Utils/isArray';
import {isHashMap} from 'projects/core/src/lib/Utils/isHashMap';

export function isEqual<A, B>(a: A | B, b: B | A): boolean {
    // Same?
    if (a === b) {
        return true;
    }

    // Array?
    // https://stackoverflow.com/a/19746771
    if (isArray(a) && isArray(b) && a.length === b.length) {
        return a.every((value, index) => value === b[index]);
    }

    // HashMap? (only {})
    // https://stackoverflow.com/a/52323412
    if (isHashMap(a) && isHashMap(b)) {
        const aKeys = Object.keys(a);
        const bKeys = Object.keys(b);

        return aKeys.length === bKeys.length
            && aKeys.every(key => Object.prototype.hasOwnProperty.call(b, key) && a[key] === b[key]);
    }

    // end
    return false;
}
