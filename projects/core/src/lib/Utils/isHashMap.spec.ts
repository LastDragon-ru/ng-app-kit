import {using}     from '@lastdragon-ru/ng-app-kit-core-testing';
import {HashMap}   from '../Types/HashMap';
import {isHashMap} from './isHashMap';

describe('isHashMap', () => {
    const dataProvider: HashMap<{ value: any; expected: boolean; }> = { // tslint:disable-line:no-any
        hashmap:   {
            value:    {a: 123},
            expected: true,
        },
        array:     {
            value:    [1, 2, 3],
            expected: false,
        },
        date:      {
            value:    new Date(),
            expected: false,
        },
        number:    {
            value:    123,
            expected: false,
        },
        function:  {
            value:    () => 123,
            expected: false,
        },
        null:      {
            value:    null,
            expected: false,
        },
        undefined: {
            value:    undefined,
            expected: false,
        },
    };

    using(dataProvider, (description, data) => {
        it(description, () => {
            expect(isHashMap(data.value)).toEqual(data.expected);
        });
    });
});
