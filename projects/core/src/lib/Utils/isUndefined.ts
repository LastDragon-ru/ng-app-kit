export function isUndefined(value: any): value is undefined { // tslint:disable-line:no-any
    return typeof value === 'undefined';
}
