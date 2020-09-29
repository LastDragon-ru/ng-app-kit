import {CommonModule}                   from '@angular/common';
import {NgModule}                       from '@angular/core';
import {ErrorComponent}                 from './Components/Error/ErrorComponent';
import {ErrorFormatter}                 from './Components/Error/ErrorFormatter';
import {ErrorFormattersProvider}        from './Components/Error/ErrorFormattersProvider';
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
            provide:  ErrorFormatter,
            useValue: HttpErrorFormatterComponent,
            multi:    true,
        },
    ],
})
export class CoreModule {
}
