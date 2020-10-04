import {
    ClassProvider,
    ExistingProvider,
    FactoryProvider,
    Type,
    ValueProvider,
}                   from '@angular/core';
import {isFunction} from '../../Utils/isFunction';
import {Token}      from './Token';
import {Tokenized}  from './Tokenized';

export class ProviderFactory<T> {
    public constructor(private token: Token<T>,
                       private isMulti: boolean = false) {
    }

    public multi(multi: boolean = true): this {
        this.isMulti = multi;

        return this;
    }

    public useClass(classname: Type<T>): ClassProvider {
        return {
            provide:  this.token,
            useClass: classname,
            multi:    this.isMulti,
        };
    }

    public useValue(value: T): ValueProvider {
        return {
            provide:  this.token,
            useValue: value,
            multi:    this.isMulti,
        };
    }

    public useExisting(value: T | Token<T>): ExistingProvider {
        return {
            provide:     this.token,
            useExisting: value,
            multi:       this.isMulti,
        };
    }

    public useFactory(factory: () => T): FactoryProvider;
    public useFactory<A extends unknown[], D extends Tokenized<A>>(deps: D, factory: (...args: A) => T): FactoryProvider;
    public useFactory<A extends unknown[], D extends Tokenized<A>>(
        deps: D | ((...args: A) => T),
        factory?: (...args: A) => T,
    ): FactoryProvider {
        if (isFunction(deps)) {
            factory = deps;
            deps    = <never> [];
        }

        if (!factory) {
            throw new Error('factory is not defined.');
        }

        return {
            provide:    this.token,
            useFactory: factory,
            deps:       deps,
            multi:      this.isMulti,
        };
    }
}
