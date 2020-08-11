import {NgModule}                from '@angular/core';
import {CoreTranslation}         from 'projects/core/src/lib/CoreTranslation';
import {TranslocoScopeProvider}  from 'projects/core/src/lib/I18n/TranslocoScopeProvider';
import {ErrorFormatter}          from 'projects/core/src/lib/Services/ErrorFormatterService/ErrorFormatter';
import {ErrorFormattersProvider} from 'projects/core/src/lib/Services/ErrorFormatterService/ErrorFormattersProvider';
import {HttpErrorFormatter}      from 'projects/core/src/lib/Services/ErrorFormatterService/Formatters/HttpErrorFormatter';

@NgModule({
    declarations: [],
    exports:      [],
    providers:    [
        TranslocoScopeProvider.provide(CoreTranslation, 'kitCore', (locale) => {
            return import(`../i18n/${locale}.json`);
        }),
        ErrorFormattersProvider.provide(),
        {
            provide:  ErrorFormatter,
            useValue: HttpErrorFormatter,
            multi:    true,
        },
    ],
})
export class CoreModule {
}
