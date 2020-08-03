export function isFunction(value: any): value is Function { // tslint:disable-line:ban-types
    return typeof value === 'function';
}
