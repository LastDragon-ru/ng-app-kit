import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ComponentFactoryResolver,
    ComponentRef,
    Inject,
    Input,
    Optional,
    Type,
    ViewChild,
    ViewContainerRef,
}                                       from '@angular/core';
import {AppError}                       from '../../Types/AppError';
import {isEmpty}                        from '../../Utils/isEmpty';
import {isEqual}                        from '../../Utils/isEqual';
import {StatefulComponent}              from '../StatefulComponent';
import {ErrorFormatter}                 from './ErrorFormatter';
import {ErrorFormatterDefault}          from './ErrorFormatterDefault';
import {ErrorFormatters}                from './ErrorFormatters';
import {DefaultErrorFormatterComponent} from './Formatters/DefaultErrorFormatter/DefaultErrorFormatterComponent';
import {ErrorFormatterComponent}        from './Formatters/ErrorFormatterComponent';

@Component({
    selector:        'kit-error[error]',
    templateUrl:     './ErrorComponent.html',
    styleUrls:       ['./ErrorComponent.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorComponent extends StatefulComponent implements AfterViewInit {
    @ViewChild('template', {read: ViewContainerRef})
    private container!: ViewContainerRef;

    public constructor(
        cdr: ChangeDetectorRef,
        private readonly resolver: ComponentFactoryResolver,
        private readonly defaultFormatters: ErrorFormatters,
        @Inject(ErrorFormatter) @Optional()
        private readonly formatters: Type<ErrorFormatterComponent>[]            = [],
        @Inject(ErrorFormatterDefault) @Optional()
        private readonly defaultFormatter: Type<ErrorFormatterComponent> | null = null,
    ) {
        super(cdr);
    }

    // <editor-fold desc="Getters / Setters">
    // =========================================================================
    @Input()
    public get error(): AppError | null {
        return this.#error;
    }

    public set error(errors: AppError | null) {
        if (!isEqual(this.error, errors)) {
            this.#error = errors;
            this.update();
            this.stateChanged();
        }
    }

    #error: AppError | null = null; /* tslint:disable-line:member-access */

    // </editor-fold>

    // <editor-fold desc="Angular">
    // =========================================================================
    public ngAfterViewInit(): void {
        super.ngAfterViewInit();
        this.update();
    }

    // </editor-fold>

    // <editor-fold desc="Functions">
    // =========================================================================
    private update(): void {
        // Initialized?
        if (!this.initialized) {
            return;
        }

        // Clear
        this.container.clear();

        // No error?
        if (!this.error) {
            return;
        }

        // Render
        const formatters = [
            ...this.formatters,                                         // Formatters from providers[]
            ...this.defaultFormatters,                                  // Formatters from libraries/modules
            this.defaultFormatter || DefaultErrorFormatterComponent,    // Default formatter from providers[]
            DefaultErrorFormatterComponent,                             // Last
        ];

        for (const formatter of formatters) {
            this.render(formatter);

            if (!this.isEmpty()) {
                break;
            }
        }
    }

    private isEmpty(): boolean {
        return isEmpty(this.container.element);
    }

    private render(formatter: Type<ErrorFormatterComponent>): ComponentRef<ErrorFormatterComponent> {
        const factory   = this.resolver.resolveComponentFactory(formatter);
        const component = this.container.createComponent(factory);

        component.instance.setError(this.error);

        return component;
    }

    // </editor-fold>
}
