import {InlineLoader} from '@ngneat/transloco/lib/types';

export abstract class TranslationProvider {
    public abstract getLoader(): InlineLoader;
}
