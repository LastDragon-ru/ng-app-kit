import {Translation} from '@ngneat/transloco/lib/types';

export type TranslationImporter = (locale: string) => Promise<Translation>;
