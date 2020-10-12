import {CommonModule}                   from '@angular/common';
import {NgModule}                       from '@angular/core';
import {ErrorComponent}                 from './Components/Error/ErrorComponent';
import {ErrorFormatters}                from './Components/Error/ErrorFormatters';
import {DefaultErrorFormatterComponent} from './Components/Error/Formatters/DefaultErrorFormatter/DefaultErrorFormatterComponent';
import {HttpErrorFormatterComponent}    from './Components/Error/Formatters/HttpErrorFormatter/HttpErrorFormatterComponent';

@NgModule({
    imports:         [
        CommonModule,
    ],
    declarations:    [
        ErrorComponent,
        DefaultErrorFormatterComponent,
        HttpErrorFormatterComponent,
    ],
    exports:         [],
    entryComponents: [ // TODO [#4] Drop `entryComponents`
        DefaultErrorFormatterComponent,
        HttpErrorFormatterComponent,
    ],
})
export class CoreModule {
    public constructor(formatters: ErrorFormatters) {
        formatters.add(HttpErrorFormatterComponent);
    }
}
