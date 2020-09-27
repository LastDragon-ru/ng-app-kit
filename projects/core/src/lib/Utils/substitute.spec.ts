import {HashMap}    from 'projects/core/src/lib/Classes/HashMap';
import {substitute} from 'projects/core/src/lib/Utils/substitute';
import {using}      from 'projects/core/src/lib/Utils/Tests/using';

describe('substitute', () => {
    const formatter = (key: string) => `\{${key}\}`;
    const dataProvider: HashMap<{
        str: string,
        parameters: HashMap<string | number | boolean>,
        formatter: (key: string) => string,
        expected: string
    }>              = {
        'string without replacements': {
            str:        'string without replacements',
            parameters: {},
            formatter:  formatter,
            expected:   'string without replacements',
        },
        'string with replacements':    {
            str:        'string {with} replacements',
            parameters: {with: 'without'},
            formatter:  formatter,
            expected:   'string without replacements',
        },
    };

    using(dataProvider, (description, data) => {
        it(description, () => {
            expect(substitute(data.str, data.parameters, data.formatter)).toEqual(data.expected);
        });
    });
});
