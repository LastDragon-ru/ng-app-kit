export function isNumber(value: any): value is number { // tslint:disable-line:no-any
    return typeof value === 'number';
}
