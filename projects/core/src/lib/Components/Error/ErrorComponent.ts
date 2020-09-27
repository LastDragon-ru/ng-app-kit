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
import {AppError}                       from 'projects/core/src/lib/Classes/AppError';
import {DefaultErrorFormatter}          from 'projects/core/src/lib/Components/Error/DefaultErrorFormatter';
import {ErrorFormatters}                from 'projects/core/src/lib/Components/Error/ErrorFormatters';
import {DefaultErrorFormatterComponent} from 'projects/core/src/lib/Components/Error/Formatters/DefaultErrorFormatter/DefaultErrorFormatterComponent';
import {ErrorFormatterComponent}        from 'projects/core/src/lib/Components/Error/Formatters/ErrorFormatterComponent';
import {StatefulComponent}              from 'projects/core/src/lib/Components/StatefulComponent';
import {isEmpty}                        from 'projects/core/src/lib/Utils/isEmpty';
import {isEqual}                        from 'projects/core/src/lib/Utils/isEqual';

@Component({
    selector:        'kit-error[error]',
    templateUrl:     './ErrorComponent.html',
    styleUrls:       ['./ErrorComponent.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorComponent extends StatefulComponent implements AfterViewInit {
    private formatters: Type<ErrorFormatterComponent>[];
    private defaultFormatter: Type<ErrorFormatterComponent>;

    @ViewChild('template', {read: ViewContainerRef})
    private container!: ViewContainerRef;

    public constructor(cdr: ChangeDetectorRef,
                       private resolver: ComponentFactoryResolver,
                       @Inject(ErrorFormatters) @Optional() formatters: Type<ErrorFormatterComponent>[] | null,
                       @Inject(DefaultErrorFormatter) @Optional() defaultFormatter: Type<ErrorFormatterComponent> | null) {
        super(cdr);

        this.formatters       = formatters || [];
        this.defaultFormatter = defaultFormatter || DefaultErrorFormatterComponent;
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
        for (const formatter of this.formatters) {
            this.render(formatter);

            if (!this.isEmpty()) {
                break;
            }
        }

        // Default
        if (this.isEmpty()) {
            this.render(this.defaultFormatter);
        }
    }

    private isEmpty(): boolean {
        return isEmpty(this.container.element);
    }

    private render(formatter: Type<ErrorFormatterComponent>): ComponentRef<ErrorFormatterComponent> {
        const factory   = this.resolver.resolveComponentFactory(formatter);
        const component = this.container.createComponent(factory);

        component.instance.error = this.error;

        return component;
    }

    // </editor-fold>
}
