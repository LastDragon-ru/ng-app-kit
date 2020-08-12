import {ElementRef} from '@angular/core';
import {isArray}    from 'projects/core/src/lib/Utils/isArray';
import {isBoolean}  from 'projects/core/src/lib/Utils/isBoolean';
import {isNumber}   from 'projects/core/src/lib/Utils/isNumber';
import {isObject}   from 'projects/core/src/lib/Utils/isObject';
import {isString}   from 'projects/core/src/lib/Utils/isString';

export function isEmpty(value: any): boolean {
    if (value === null || value === undefined) {
        return true;
    } else if (isNumber(value) || isBoolean(value)) {
        return false;
    } else if (isArray(value)) {
        return value.length === 0;
    } else if (isString(value)) {
        return value.trim().length === 0;
    } else if (isObject(value, Object)) {
        return Object.keys(value).length === 0;
    } else if (value instanceof Node) {
        return isNodeEmpty(value);
    } else if (value instanceof ElementRef) {
        return isEmpty(value.nativeElement);
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
