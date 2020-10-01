import {HashMap}          from '@lastdragon-ru/ng-app-kit-core';
import {ValidationErrors} from './ValidationErrors';

export type ControlErrors = HashMap<ControlErrors | ValidationErrors>;
