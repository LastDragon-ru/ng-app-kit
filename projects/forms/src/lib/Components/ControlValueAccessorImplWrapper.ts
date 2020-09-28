import {Injectable, Input, ViewChild}      from '@angular/core';
import {ControlValueAccessor, FormControl} from '@angular/forms';
import {StatefulComponent}                 from '@lastdragon-ru/ng-app-kit-core';
import {ControlValueAccessorImpl}          from './ControlValueAccessorImpl';

// @Component({
//     providers:   [
//         {
//             provide:     NG_VALUE_ACCESSOR,
//             useExisting: forwardRef(() => MyComponent),
//             multi:       true
//         },
//     ]
// })
// export class MyComponent extends ControlValueAccessorImplWrapper<type> {
//     // empty
// }
@Injectable()
export abstract class ControlValueAccessorImplWrapper<V>
    extends StatefulComponent
    implements ControlValueAccessor {
    /**
     * @protected
     */
    @ViewChild(ControlValueAccessorImpl, {static: true})
    public accessor!: ControlValueAccessorImpl<V>;

    // <editor-fold desc="Getters / Setter">
    // =========================================================================
    @Input()
    public get formControl(): FormControl | null {
        return this.accessor.formControl;
    }

    public set formControl(value: FormControl | null) {
        this.accessor.formControl = value;
    }

    // </editor-fold>

    // <editor-fold desc="ControlValueAccessor">
    // =========================================================================
    public writeValue(value: V | null): void {
        this.accessor.writeValue(value);
    }

    public registerOnChange(fn: any): void {
        this.accessor.registerOnChange(fn);
    }

    public registerOnTouched(fn: any): void {
        this.accessor.registerOnTouched(fn);
    }

    public setDisabledState(isDisabled: boolean): void {
        this.accessor.setDisabledState(isDisabled);
    }

    // </editor-fold>
}
