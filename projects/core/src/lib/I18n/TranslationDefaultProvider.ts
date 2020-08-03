import {InlineLoader} from '@ngneat/transloco';
import {TranslationImporter} from 'projects/core/src/lib/I18n/TranslationImporter';
import {TranslationProvider} from 'projects/core/src/lib/I18n/TranslationProvider';
import {Locales} from 'projects/core/src/lib/Locales';

export class TranslationDefaultProvider extends TranslationProvider {
    public constructor(protected readonly importer: TranslationImporter) {
        super();
    }

    public getLoader(): InlineLoader {
        return Locales.reduce((loaders: InlineLoader, locale) => {
            loaders[locale] = () => this.importer(locale);

            return loaders;
        }, {});
    }
}
