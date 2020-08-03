import {NgModule} from '@angular/core';
import {CoreTranslation} from 'projects/core/src/lib/CoreTranslation';
import {TranslocoScopeProvider} from 'projects/core/src/lib/I18n/TranslocoScopeProvider';

@NgModule({
    declarations: [],
    imports:      [],
    exports:      [],
    providers:    [
        TranslocoScopeProvider.getScope(CoreTranslation, 'kitCore', (locale) => {
            return import(`../i18n/${locale}.json`);
        }),
    ],
})
export class CoreModule {
}
