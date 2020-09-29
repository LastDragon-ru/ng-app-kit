import {CommonModule}                   from '@angular/common';
import {NgModule}                       from '@angular/core';
import {ErrorComponent}                 from './Components/Error/ErrorComponent';
import {ErrorFormattersProvider}        from './Components/Error/ErrorFormattersProvider';
import {ErrorFormatterToken}            from './Components/Error/ErrorFormatterToken';
import {DefaultErrorFormatterComponent} from './Components/Error/Formatters/DefaultErrorFormatter/DefaultErrorFormatterComponent';
import {HttpErrorFormatterComponent}    from './Components/Error/Formatters/HttpErrorFormatter/HttpErrorFormatterComponent';

@NgModule({
    imports:      [
        CommonModule,
    ],
    declarations: [
        ErrorComponent,
        DefaultErrorFormatterComponent,
        HttpErrorFormatterComponent,
    ],
    exports:      [],
    providers:    [
        ErrorFormattersProvider.provide(),
        {
            provide:  ErrorFormatterToken,
            useValue: HttpErrorFormatterComponent,
            multi:    true,
        },
    ],
})
export class CoreModule {
}
