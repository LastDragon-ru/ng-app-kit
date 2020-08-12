import {
    AfterViewInit,
    ChangeDetectorRef,
    EventEmitter,
    Injectable,
    OnDestroy,
    Output,
}                from '@angular/core';
import {Subject} from 'rxjs/internal/Subject';

@Injectable()
export class StatefulComponent implements AfterViewInit, OnDestroy {
    @Output()
    public readonly stateChanges = new EventEmitter<void>();
    protected readonly destroyed = new Subject<boolean>();
    protected initialized        = false;

    public constructor(private cdr: ChangeDetectorRef) {
        // empty
    }

    // <editor-fold desc="Angular">
    // =========================================================================
    // tslint:disable-next-line:contextual-lifecycle
    public ngAfterViewInit(): void {
        this.initialized = true;
    }

    public ngOnDestroy(): void {
        this.stateChanges.complete();
        this.destroyed.complete();
    }

    // </editor-fold>

    // <editor-fold desc="Functions">
    // =========================================================================
    protected stateChanged(): void {
        if (this.initialized) {
            this.stateChanges.emit();
            this.cdr.markForCheck();
        }
    }

    // </editor-fold>
}
