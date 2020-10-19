/*
 * Public API Surface of core
 */

import {AppError}                from './lib/Classes/AppError';
import {HashMap}                 from './lib/Classes/HashMap';
import {Template}                from './lib/Classes/Template';
import {ErrorComponent}          from './lib/Components/Error/ErrorComponent';
import {ErrorFormatter}          from './lib/Components/Error/ErrorFormatter';
import {ErrorFormatterDefault}   from './lib/Components/Error/ErrorFormatterDefault';
import {ErrorFormatters}         from './lib/Components/Error/ErrorFormatters';
import {ErrorFormatterComponent} from './lib/Components/Error/Formatters/ErrorFormatterComponent';
import {StatefulComponent}       from './lib/Components/StatefulComponent';
import {CoreModule}              from './lib/CoreModule';
import {DestroyedSubject}        from './lib/Helpers/DestroyedSubject';
import {Provider}                from './lib/Helpers/Provider';
import {ConfirmatorService}      from './lib/Services/ConfirmatorService';
import {NotificatorService}      from './lib/Services/NotificatorService';
import {isArray}                 from './lib/Utils/isArray';
import {isBoolean}               from './lib/Utils/isBoolean';
import {isEmpty}                 from './lib/Utils/isEmpty';
import {isEqual}                 from './lib/Utils/isEqual';
import {isFunction}              from './lib/Utils/isFunction';
import {isHashMap}               from './lib/Utils/isHashMap';
import {isNumber}                from './lib/Utils/isNumber';
import {isObject}                from './lib/Utils/isObject';
import {isString}                from './lib/Utils/isString';
import {isUndefined}             from './lib/Utils/isUndefined';
import {substitute}              from './lib/Utils/substitute';

export {
    CoreModule as AppKitCoreModule,
    Provider,
    HashMap,
    Template,
    DestroyedSubject,
    StatefulComponent,
    AppError,
    ErrorComponent,
    ErrorFormatter,
    ErrorFormatters,
    ErrorFormatterDefault,
    ErrorFormatterComponent,
    ConfirmatorService,
    NotificatorService,
    isArray,
    isBoolean,
    isEmpty,
    isEqual,
    isFunction,
    isHashMap,
    isNumber,
    isObject,
    isString,
    isUndefined,
    substitute,
};
