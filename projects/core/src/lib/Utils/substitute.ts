import {Properties} from 'projects/core/src/lib/Classes/Properties';

export function substitute(value: string, parameters: Properties, formatter: (key: string) => string): string {
    for (const key in parameters) {
        if (parameters.hasOwnProperty(key)) {
            value = value.replace(new RegExp(formatter(key), 'g'), parameters[key]);
        }
    }

    return value;
}
