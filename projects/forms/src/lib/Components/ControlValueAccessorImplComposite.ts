import {DoCheck, Injectable, OnInit} from '@angular/core';
import {
    AbstractControl,
    FormGroup,
    ValidationErrors,
    Validator,
}                                    from '@angular/forms';
import {isEqual}                     from '@lastdragon-ru/ng-app-kit-core';
import {Subscription}                from 'rxjs';
import {takeUntil}                   from 'rxjs/operators';
import {ControlErrors}               from '../Classes/ControlErrors';
import {setFormGroupErrors}          from '../Utils/setFormGroupErrors';
import {ControlValueAccessorImpl}    from './ControlValueAccessorImpl';

/**
 * Encapsulate `FormGroup` instance.
 */
@Injectable()
export abstract class ControlValueAccessorImplComposite<V>
    extends ControlValueAccessorImpl<V>
    implements OnInit, DoCheck, Validator {
    /**
     * @protected
     */
    public abstract get formGroup(): FormGroup;

    private formControlSubscription: Subscription | null = null;

    // <editor-fold desc="Angular">
    // =========================================================================
    // tslint:disable-next-line:contextual-lifecycle
    public ngOnInit(): void {
        // Sync form.value <-> value
        this.formGroup.valueChanges
            .pipe(
                takeUntil(this.destroyed),
            )
            .subscribe(() => {
                this.value = this.getFormGroupValue();
            });

        this.valueChanges
            .pipe(
                takeUntil(this.destroyed),
            )
            .subscribe(() => {
                this.setFormGroupValue(this.value);
            });

        // Initial sync
        this.setFormGroupValue(this.value);

        // Parent
        super.ngOnInit();
    }

    // tslint:disable-next-line:contextual-lifecycle
    public ngDoCheck(): void {
        // TODO [angular] https://github.com/angular/angular/issues/10887
        if (this.touched && !this.formGroup.touched) {
            this.formGroup.markAllAsTouched();
        }
    }

    // </editor-fold>

    // <editor-fold desc="Validator">
    // =========================================================================
    public validate(control: AbstractControl): ValidationErrors | null {
        return this.value !== null && this.formGroup && this.formGroup.invalid
            ? this.getValidationError()
            : null;
    }

    protected getValidationError(): ValidationErrors {
        return {invalid: true};
    }

    // </editor-fold>

    // <editor-fold desc="ControlValueAccessorImpl">
    // =========================================================================
    protected onFormControlChange(): void {
        super.onFormControlChange();

        if (this.formControlSubscription) {
            this.formControlSubscription.unsubscribe();
        }

        if (this.formControl) {
            this.formControlSubscription = this.formControl.statusChanges
                .pipe(
                    takeUntil(this.destroyed),
                )
                .subscribe(() => {
                    if (this.formControl) {
                        this.setFormGroupErrors(this.formControl.errors);
                    }
                });
        }
    }

    // </editor-fold>

    // <editor-fold desc="Functions">
    // =========================================================================
    protected getFormGroupValue(): V | null {
        return this.formGroup.value;
    }

    protected setFormGroupValue(value: V | null): void {
        if (!isEqual(this.getFormGroupValue(), value)) {
            if (value) {
                this.formGroup.patchValue(value);
            } else {
                this.formGroup.reset();
            }

            this.stateChanged();
        }
    }

    protected setFormGroupErrors(errors: ControlErrors | null): void {
        if (errors) {
            setFormGroupErrors(this.formGroup, errors);
        }

        this.stateChanged();
    }

    // </editor-fold>
}
