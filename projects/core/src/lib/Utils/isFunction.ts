export function isFunction(value: any): value is Function { // tslint:disable-line:no-any ban-types
    return typeof value === 'function';
}
