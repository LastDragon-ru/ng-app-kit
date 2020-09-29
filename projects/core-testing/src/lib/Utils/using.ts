import {isFunction} from '@lastdragon-ru/ng-app-kit-core';

/**
 * Data Provider Helper.
 *
 * Based on
 * - https://github.com/MortalFlesh/jasmine-data-provider
 * - https://medium.com/@a_eife/test-more-with-less-code-103db0d0e94f
 */
export function using<T>(values: T[] | { [key: string]: T } | (() => T[]),
                         callback: (description: string, data: T) => void): void {
    if (isFunction(values)) {
        values = values();
    }

    for (const [description, data] of Object.entries(values)) {
        callback(`${description}`, data);
    }
}
