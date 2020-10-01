import {CommonModule}                      from '@angular/common';
import {NgModule}                          from '@angular/core';
import {ReactiveFormsModule}               from '@angular/forms';
import {
    ErrorFormatter,
    ErrorFormattersProvider,
}                                          from '@lastdragon-ru/ng-app-kit-core';
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
    providers:    [
        ErrorFormattersProvider.provide(),
        {
            provide:  ErrorFormatter,
            useValue: ValidationErrorFormatterComponent,
            multi:    true,
        },
    ],
})
export class FormsModule {
}
