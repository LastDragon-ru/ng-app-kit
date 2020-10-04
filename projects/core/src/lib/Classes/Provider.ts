import {ProviderFactory} from './Provider/ProviderFactory';
import {Token}           from './Provider/Token';

// FIXME [angular]  https://github.com/angular/angular/issues/33883

/**
 * Angular's providers are not type-safe, this function allows make them to type-safe.
 *
 * @constructor
 */
export function Provider<T>(token: Token<T>): ProviderFactory<T> {
    return new ProviderFactory(token);
}
