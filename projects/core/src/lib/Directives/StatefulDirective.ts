import {ChangeDetectorRef, Injectable, OnDestroy} from '@angular/core';
import {DestroyedSubject}                         from '../Helpers/DestroyedSubject';

@Injectable()
export class StatefulDirective implements OnDestroy {
    protected readonly destroyed = new DestroyedSubject();

    public constructor(private cdr: ChangeDetectorRef) {
        // empty
    }

    // <editor-fold desc="Angular">
    // =========================================================================
    public ngOnDestroy(): void {
        this.destroyed.complete();
    }

    // </editor-fold>

    // <editor-fold desc="Functions">
    // =========================================================================
    protected stateChanged(): void {
        this.cdr.markForCheck();
    }

    // </editor-fold>
}
