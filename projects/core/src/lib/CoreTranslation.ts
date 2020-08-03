import {InjectionToken} from '@angular/core';
import {TranslationProvider} from 'projects/core/src/lib/I18n/TranslationProvider';

export const CoreTranslation = new InjectionToken<TranslationProvider>('CoreTranslationProvider');
