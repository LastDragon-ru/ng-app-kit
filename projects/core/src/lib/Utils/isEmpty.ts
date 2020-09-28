import {ElementRef} from '@angular/core';
import {HashMap}    from '../Classes/HashMap';
import {isArray}    from './isArray';
import {isBoolean}  from './isBoolean';
import {isHashMap}  from './isHashMap';
import {isNumber}   from './isNumber';
import {isString}   from './isString';

export function isEmpty<T>(value: undefined | null | number | string | boolean | Array<T> | Node | ElementRef | HashMap<T>): boolean {
    if (value === null || value === undefined) {
        return true;
    } else if (isNumber(value) || isBoolean(value)) {
        return false;
    } else if (isArray(value)) {
        return value.length === 0;
    } else if (isString(value)) {
        return value.trim().length === 0;
    } else if (value instanceof ElementRef) {
        return isEmpty(value.nativeElement);
    } else if (value instanceof Node) {
        return isNodeEmpty(value);
    } else if (isHashMap(value)) {
        return Object.keys(value).length === 0;
    } else {
        // empty
    }

    throw new Error('Unsupported type.');
}

function isNodeEmpty(node: Node): boolean {
    for (let i = 0; i < node.childNodes.length; i++) {
        const child = node.childNodes.item(i);
        const type  = child.nodeType;

        if (type === Node.ELEMENT_NODE || (type === Node.TEXT_NODE && !isEmpty(child.nodeValue))) {
            return false;
        }
    }

    return true;
}
