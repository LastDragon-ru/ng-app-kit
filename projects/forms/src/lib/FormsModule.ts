import {CommonModule}                      from '@angular/common';
import {NgModule}                          from '@angular/core';
import {ReactiveFormsModule}               from '@angular/forms';
import {ErrorFormatters}                   from '@lastdragon-ru/ng-app-kit-core';
import {ValidationErrorFormatterComponent} from './Components/Error/ValidationErrorFormatterComponent/ValidationErrorFormatterComponent';

@NgModule({
    imports:      [
        CommonModule,
        ReactiveFormsModule,
    ],
    declarations: [
        ValidationErrorFormatterComponent,
    ],
    exports:      [],
})
export class FormsModule {
    public constructor(formatters: ErrorFormatters) {
        formatters.add(ValidationErrorFormatterComponent);
    }
}
