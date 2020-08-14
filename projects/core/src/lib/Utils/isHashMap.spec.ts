import {HashMap}   from 'projects/core/src/lib/Classes/HashMap';
import {isHashMap} from 'projects/core/src/lib/Utils/isHashMap';
import {using}     from 'projects/core/src/lib/Utils/Tests/using';

describe('isHashMap', () => {
    const dataProvider: HashMap<{ value: any; expected: boolean; }> = { // tslint:disable-line:no-any
        hashmap:  {
            value:    {a: 123},
            expected: true,
        },
        array:    {
            value:    [1, 2, 3],
            expected: false,
        },
        date:     {
            value:    new Date(),
            expected: false,
        },
        number:   {
            value:    123,
            expected: false,
        },
        function: {
            value:    () => 123,
            expected: false,
        },
        null: {
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
