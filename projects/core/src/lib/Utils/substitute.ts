import {HashMap} from 'projects/core/src/lib/Classes/HashMap';

export function substitute(value: string, parameters: HashMap<string | number>, formatter: (key: string) => string): string {
    for (const key in parameters) {
        if (parameters.hasOwnProperty(key)) {
            value = value.replace(new RegExp(formatter(key), 'g'), parameters[key].toString());
        }
    }

    return value;
}
