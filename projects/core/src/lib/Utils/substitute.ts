import {HashMap} from '../Types/HashMap';

export function substitute(str: string, parameters: HashMap<string | number | boolean>, formatter: (key: string) => string): string {
    for (const key in parameters) {
        if (parameters.hasOwnProperty(key)) {
            str = str.replace(new RegExp(formatter(key), 'g'), parameters[key].toString());
        }
    }

    return str;
}
