import {
    EventEmitter,
    Injectable,
    Input,
    OnDestroy,
    OnInit,
    Output,
}                                          from '@angular/core';
import {ControlValueAccessor, FormControl} from '@angular/forms';
import {
    isEqual,
    StatefulComponent,
}                                          from '@lastdragon-ru/ng-app-kit-core';

@Injectable()
export abstract class ControlValueAccessorImpl<V>
    extends StatefulComponent
    implements ControlValueAccessor, OnInit, OnDestroy {
    // <editor-fold desc="Properties">
    // =========================================================================
    @Output()
    public readonly valueChanges                          = new EventEmitter<V | null>();
    private onChanged: ((value: V | null) => void) | null = null;
    private onTouched: (() => void) | null                = null;
    // </editor-fold>

    // <editor-fold desc="Getters / Setters">
    // =========================================================================
    public get value(): V | null {
        return this.#value;
    }

    public set value(value: V | null) {
        if (!isEqual(this.value, value)) {
            // Value
            this.#value = value;

            // Changes
            this.valueChanges.emit(value);

            // ControlValueAccessor
            if (this.onChanged) {
                this.onChanged(value);
            }

            // Changed
            this.stateChanged();
        }
    }

    #value: V | null = null; // tslint:disable-line:member-access

    @Input()
    public get formControl(): FormControl | null {
        return this.#formControl;
    }

    public set formControl(formControl: FormControl | null) {
        if (!isEqual(this.formControl, formControl)) {
            this.#formControl = formControl;
            this.onFormControlChange();
            this.stateChanged();
        }
    }

    #formControl: FormControl | null = null; // tslint:disable-line:member-access

    public get disabled(): boolean {
        return this.#disabled;
    }

    #disabled: boolean = false; // tslint:disable-line:member-access

    public get touched(): boolean {
        return this.formControl !== null && this.formControl.touched;
    }

    // </editor-fold>

    // <editor-fold desc="Angular">
    // =========================================================================
    public ngOnInit(): void { // tslint:disable-line:contextual-lifecycle
        // empty
    }

    public ngOnDestroy(): void {
        this.valueChanges.complete();
        super.ngOnDestroy();
    }

    // </editor-fold>

    // <editor-fold desc="Functions">
    // =========================================================================
    protected touch(): void {
        // ControlValueAccessor
        if (this.onTouched) {
            this.onTouched();
        }

        // Changed
        this.stateChanged();
    }

    protected onFormControlChange(): void {
        // empty
    }

    // </editor-fold>

    // <editor-fold desc="ControlValueAccessor">
    // =========================================================================
    public writeValue(value: V | null): void {
        this.value = value;
    }

    public registerOnChange(fn: (value: V | null) => void): void {
        this.onChanged = fn;
    }

    public registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    public setDisabledState(isDisabled: boolean): void {
        if (!isEqual(this.disabled, isDisabled)) {
            this.#disabled = isDisabled;
            this.stateChanged();
        }
    }

    // </editor-fold>
}
