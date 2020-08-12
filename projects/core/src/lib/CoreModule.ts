import {CommonModule}                   from '@angular/common';
import {NgModule}                       from '@angular/core';
import {ErrorComponent}                 from 'projects/core/src/lib/Components/Error/ErrorComponent';
import {ErrorFormatter}                 from 'projects/core/src/lib/Components/Error/ErrorFormatter';
import {ErrorFormattersProvider}        from 'projects/core/src/lib/Components/Error/ErrorFormattersProvider';
import {DefaultErrorFormatterComponent} from 'projects/core/src/lib/Components/Error/Formatters/DefaultErrorFormatter/DefaultErrorFormatterComponent';
import {HttpErrorFormatterComponent}    from 'projects/core/src/lib/Components/Error/Formatters/HttpErrorFormatter/HttpErrorFormatterComponent';
import {CoreTranslation}                from 'projects/core/src/lib/CoreTranslation';
import {TranslocoScopeProvider}         from 'projects/core/src/lib/I18n/TranslocoScopeProvider';

@NgModule({
    imports:         [
        CommonModule,
    ],
    declarations:    [
        ErrorComponent,
        DefaultErrorFormatterComponent,
        HttpErrorFormatterComponent,
    ],
    entryComponents: [
        DefaultErrorFormatterComponent,
        HttpErrorFormatterComponent,
    ],
    exports:         [],
    providers:       [
        TranslocoScopeProvider.provide(CoreTranslation, 'kitCore', (locale) => {
            return import(`../i18n/${locale}.json`);
        }),
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
