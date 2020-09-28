import {ElementRef} from '@angular/core';
import {HashMap}    from '../Classes/HashMap';
import {isEmpty}    from './isEmpty';
import {using}      from './Tests/using';

describe('isEmpty', () => {
    const dataProvider: HashMap<{ value: any; empty: boolean; error?: true }> = { // tslint:disable-line:no-any
        null:                            {
            value: null,
            empty: true,
        },
        true:                            {
            value: true,
            empty: false,
        },
        false:                           {
            value: false,
            empty: false,
        },
        undefined:                       {
            value: undefined,
            empty: true,
        },
        0:                               {
            value: 0,
            empty: false,
        },
        'empty string':                  {
            value: '',
            empty: true,
        },
        spaces:                          {
            value: '  ',
            empty: true,
        },
        string:                          {
            value: '123',
            empty: false,
        },
        'empty array':                   {
            value: [],
            empty: true,
        },
        array:                           {
            value: [1],
            empty: false,
        },
        'empty object':                  {
            value: {},
            empty: true,
        },
        object:                          {
            value: {a: 123},
            empty: false,
        },
        'html with comment':             {
            value: (new DOMParser()).parseFromString(' <!-- comment --> ', 'text/html').body,
            empty: true,
        },
        'html with empty element':       {
            value: (new DOMParser()).parseFromString(' <span></span> ', 'text/html').body,
            empty: false,
        },
        'html with element':             {
            value: (new DOMParser()).parseFromString(' <span>123</span> ', 'text/html').body,
            empty: false,
        },
        'html with entity':              {
            value: (new DOMParser()).parseFromString('<body> &#x1F981; </body>', 'text/html').body,
            empty: false,
        },
        'ElementRef with comment':       {
            value: new ElementRef((new DOMParser()).parseFromString(' <!-- comment --> ', 'text/html').body),
            empty: true,
        },
        'ElementRef with empty element': {
            value: new ElementRef((new DOMParser()).parseFromString(' <span></span> ', 'text/html').body),
            empty: false,
        },
        'ElementRef with element':       {
            value: new ElementRef((new DOMParser()).parseFromString(' <span>123</span> ', 'text/html').body),
            empty: false,
        },
        'unsupported type':              {
            value: new Date(),
            empty: false,
            error: true,
        },
    };

    using(dataProvider, (description, data) => {
        it(description, () => {
            if (data.error) {
                expect(() => isEmpty(data.value)).toThrowError('Unsupported type.');
            } else {
                expect(isEmpty(data.value)).toEqual(data.empty);
            }
        });
    });
});
