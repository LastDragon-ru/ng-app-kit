import {InjectionToken, Optional, Provider} from '@angular/core';
import {TRANSLOCO_SCOPE} from '@ngneat/transloco';
import {TranslocoScope} from '@ngneat/transloco/lib/types';
import {TranslationDefaultProvider} from 'projects/core/src/lib/I18n/TranslationDefaultProvider';
import {TranslationImporter} from 'projects/core/src/lib/I18n/TranslationImporter';
import {TranslationProvider} from 'projects/core/src/lib/I18n/TranslationProvider';

export class TranslocoScopeProvider {
    public static provide(token: InjectionToken<TranslationProvider>, scope: string, importer: TranslationImporter): Provider {
        return {
            provide:    TRANSLOCO_SCOPE,
            deps:       [[new Optional(), token]],
            useFactory: (provider?: TranslationProvider): TranslocoScope => {
                provider = provider || new TranslationDefaultProvider(importer);

                return {
                    scope:  scope,
                    loader: provider.getLoader(),
                };
            },
        };
    }
}
