import {Injectable, Type}        from '@angular/core';
import {ErrorFormatterComponent} from './Formatters/ErrorFormatterComponent';

@Injectable({
    providedIn: 'root',
})
export class ErrorFormatters
    implements Iterable<Type<ErrorFormatterComponent>> {
    private formatters: Set<Type<ErrorFormatterComponent>> = new Set<Type<ErrorFormatterComponent>>();

    public add(formatter: Type<ErrorFormatterComponent>): void {
        this.formatters.add(formatter);
    }

    public [Symbol.iterator](): IterableIterator<Type<ErrorFormatterComponent>> {
        return this.formatters.values();
    }
}
