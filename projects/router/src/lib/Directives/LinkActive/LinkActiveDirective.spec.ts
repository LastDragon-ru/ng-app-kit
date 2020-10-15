import {
    Component,
    ElementRef,
    Inject,
    Input,
    NgZone,
    OnChanges,
    OnDestroy,
    OnInit,
    Optional,
    QueryList,
    SimpleChanges,
    ViewChild,
    ViewChildren,
}                                 from '@angular/core';
import {fakeAsync, TestBed, tick} from '@angular/core/testing';
import {Router, UrlTree}          from '@angular/router';
import {RouterTestingModule}      from '@angular/router/testing';
import {HashMap}                  from '@lastdragon-ru/ng-app-kit-core';
import {EmptyComponent, using}    from '@lastdragon-ru/ng-app-kit-core-testing';
import {RouterService}            from '../../Services/RouterService/RouterService';
import {LinkActiveChild}          from './LinkActiveChild';
import {LinkActiveContainer}      from './LinkActiveContainer';
import {LinkActiveDirective}      from './LinkActiveDirective';
import {ContainsMatcher}          from './Matchers/ContainsMatcher';

describe('LinkActiveDirective', () => {
    // <editor-fold desc="Vars">
    // =========================================================================
    // FIXME [angular] Navigation triggered outside Angular zone
    //      https://github.com/angular/angular/issues/25837
    let zone: NgZone;
    let router: Router;

    // TODO [router] [tests] This value depended on buffer time defined inside
    //      directive. Would be good to move it to config.
    const timeout = 100;
    // </editor-fold>

    // <editor-fold desc="Prepare">
    // =========================================================================
    beforeEach(() => {
        TestBed
            .configureTestingModule({
                declarations: [
                    EmptyComponent,
                    LinkActiveDirective,
                    TestComponent,
                    TestChildComponent,
                    TestContainerComponent,
                ],
                imports:      [
                    RouterTestingModule.withRoutes(
                        [
                            {
                                path:      '',
                                pathMatch: 'full',
                                component: EmptyComponent,
                            },
                            {
                                path:      'object',
                                component: EmptyComponent,
                            },
                        ],
                    ),
                ],
                providers:    [
                    RouterService,
                ],
            });
    });

    beforeEach(fakeAsync(() => {
        // Initial navigation
        zone   = TestBed.inject(NgZone);
        router = TestBed.inject(Router);

        zone.run(() => {
            router.initialNavigation();
        });

        tick();
    }));
    // </editor-fold>

    // <editor-fold desc="Tests">
    // =========================================================================
    it('Should be updated after navigation', fakeAsync(() => {
        const fixture                     = TestBed.createComponent(TestContainerComponent);
        fixture.componentInstance.enabled = true;
        fixture.detectChanges();

        const directive = fixture.componentInstance.link;
        const spy       = spyOn(directive, 'check');

        zone.run(() => {
            router.navigateByUrl('/object');
        });

        tick();

        expect(spy).toHaveBeenCalled();

        fixture.destroy();
    }));

    it('Should stack multiple calls', fakeAsync(() => {
        const fixture                     = TestBed.createComponent(TestContainerComponent);
        fixture.componentInstance.enabled = true;
        fixture.detectChanges();

        const directive = fixture.componentInstance.link;
        const spy       = spyOn<any>(directive, 'recalculate'); // tslint:disable-line:no-any

        directive.check();
        directive.check();
        directive.check();

        tick(timeout);

        expect(spy).toHaveBeenCalledWith(new Set([null]));
        expect(spy).toHaveBeenCalledTimes(1);

        fixture.destroy();
    }));

    it('Should interact with parent container', fakeAsync(() => {
        const fixture = TestBed.createComponent(TestContainerComponent);
        fixture.detectChanges();

        // Prepare
        const addSpy    = spyOn(fixture.componentInstance, 'add');
        const checkSpy  = spyOn(fixture.componentInstance, 'check');
        const deleteSpy = spyOn(fixture.componentInstance, 'delete');

        // Add
        fixture.componentInstance.enabled = true;
        fixture.detectChanges();

        expect(addSpy).toHaveBeenCalled();
        expect(checkSpy).not.toHaveBeenCalled();
        expect(deleteSpy).not.toHaveBeenCalled();

        // Change
        const directive = fixture.componentInstance.link;

        spyOn<any>(directive, 'hasActiveChild').and.returnValue(true); // tslint:disable-line:no-any

        directive?.check();
        tick(timeout);

        expect(checkSpy).toHaveBeenCalled();
        expect(deleteSpy).not.toHaveBeenCalled();

        // Delete
        fixture.componentInstance.enabled = false;
        fixture.detectChanges();

        expect(deleteSpy).toHaveBeenCalled();
    }));

    describe('statusChanges', () => {
        it('Should emit when changed', fakeAsync(() => {
            const fixture                     = TestBed.createComponent(TestContainerComponent);
            fixture.componentInstance.enabled = true;
            fixture.detectChanges();

            // Change
            const directive = fixture.componentInstance.link;
            const spy       = jasmine.createSpy();

            spyOn<any>(directive, 'hasActiveChild').and.returnValue(true); // tslint:disable-line:no-any
            directive.statusChanges.subscribe(spy);
            directive.check();

            tick(timeout);

            expect(spy).toHaveBeenCalled();

            fixture.destroy();
        }));
    });

    describe('classes', () => {
        it('Should be updated when changed only', fakeAsync(() => {
            const fixture                     = TestBed.createComponent(TestContainerComponent);
            fixture.componentInstance.enabled = true;
            fixture.detectChanges();

            const directive = fixture.componentInstance.link;
            const spy       = spyOn<any>(directive, 'setClasses'); // tslint:disable-line:no-any

            directive.classes = ['test'];

            expect(spy).toHaveBeenCalledTimes(1);

            directive.classes = ['test'];

            expect(spy).toHaveBeenCalledTimes(1);

            fixture.destroy();
        }));
    });

    describe('customMatcher', () => {
        it('Should be updated when changed only', fakeAsync(() => {
            const fixture                     = TestBed.createComponent(TestContainerComponent);
            fixture.componentInstance.enabled = true;
            fixture.detectChanges();

            const directive = fixture.componentInstance.link;
            const matcher   = new ContainsMatcher(router);
            const spy       = spyOn(directive, 'check');

            directive.customMatcher = matcher;

            expect(spy).toHaveBeenCalledTimes(1);

            directive.customMatcher = matcher;

            expect(spy).toHaveBeenCalledTimes(1);

            fixture.destroy();
        }));
    });

    describe('Should work', () => {
        const dataProvider: HashMap<{
            state: {
                root?: boolean,
                child?: boolean,
                baby?: boolean,
            },
            expected: {
                root?: boolean,
                rootGroup?: boolean,
                child?: boolean,
                childGroup?: boolean,
            }
        }> = {
            'root is active':  {
                state:    {
                    root: true,
                },
                expected: {
                    root: true,
                },
            },
            'child is active': {
                state:    {
                    child: true,
                },
                expected: {
                    rootGroup: true,
                    child:     true,
                },
            },
            'baby is active':  {
                state:    {
                    baby: true,
                },
                expected: {
                    rootGroup:  true,
                    childGroup: true,
                },
            },
        };

        using(dataProvider, (description, data) => {
            it(description, fakeAsync(() => {
                const fixture   = TestBed.createComponent(TestComponent);
                const component = fixture.componentInstance;
                fixture.detectChanges();

                // Prepare
                component.rootComponent.url  = data.state.root ? '/' : '/object';
                component.childComponent.url = data.state.child ? '/' : '/object';
                component.babyComponent.url  = data.state.baby ? '/' : '/object';

                tick(timeout);
                fixture.detectChanges();

                // Test
                expect(component.rootElement.nativeElement.classList.contains('active')).toBe(!!data.expected.root);
                expect(component.rootGroupElement.nativeElement.classList.contains('active')).toBe(!!data.expected.rootGroup);
                expect(component.childElement.nativeElement.classList.contains('active')).toBe(!!data.expected.child);
                expect(component.childGroupElement.nativeElement.classList.contains('active')).toBe(!!data.expected.childGroup);

                fixture.destroy();
            }));
        });
    });
    // </editor-fold>
});

@Component({
    selector: 'kit-router-test-child',
    template: '',
})
class TestChildComponent extends LinkActiveChild
    implements OnInit, OnChanges, OnDestroy {
    public url: string | null = null;

    public constructor(
        private router: Router,
        @Inject(LinkActiveContainer) @Optional()
        private readonly container: LinkActiveContainer | null = null,
    ) {
        super();
    }

    public getUrlTree(): UrlTree {
        return this.router.parseUrl(this.url || '/');
    }

    public ngOnInit(): void {
        this.container?.add(this);
    }

    public ngOnChanges(changes: SimpleChanges): void {
        this.container?.check(this);
    }

    public ngOnDestroy(): void {
        this.container?.delete(this);
    }
}

@Component({
    selector:  'kit-router-test-container',
    template:  `
                   <ng-container *ngIf="enabled">
                       <span kitRouterLinkActive="test"></span>
                   </ng-container>
               `,
    providers: [
        {
            provide:     LinkActiveContainer,
            useExisting: TestContainerComponent,
        },
    ],
})
export class TestContainerComponent implements LinkActiveContainer {
    @Input()
    public enabled: boolean = false;

    @ViewChildren(LinkActiveDirective)
    public links!: QueryList<LinkActiveDirective>;

    public get link(): LinkActiveDirective {
        return this.links.first;
    }

    public add(child: LinkActiveContainer | LinkActiveChild): void {
    }

    public check(child: LinkActiveContainer | LinkActiveChild): void {
    }

    public delete(child: LinkActiveContainer | LinkActiveChild): void {
    }

    public isActive(): boolean {
        return false;
    }
}

@Component({
    template: `
                  <kit-router-test-child #root kitRouterLinkActive="active"></kit-router-test-child>
                  <span #rootGroup kitRouterLinkActive="active">
                      <kit-router-test-child #child kitRouterLinkActive="active"></kit-router-test-child>
                      <span #childGroup kitRouterLinkActive="active">
                          <kit-router-test-child #baby></kit-router-test-child>
                      </span>
                  </span>
              `,
})
class TestComponent {
    @ViewChild('root', {read: ElementRef})
    public rootElement!: ElementRef;

    @ViewChild('root', {read: TestChildComponent})
    public rootComponent!: TestChildComponent;

    @ViewChild('root', {read: LinkActiveDirective})
    public rootLink!: LinkActiveDirective;

    @ViewChild('rootGroup', {read: ElementRef})
    public rootGroupElement!: ElementRef;

    @ViewChild('child', {read: ElementRef})
    public childElement!: ElementRef;

    @ViewChild('child', {read: TestChildComponent})
    public childComponent!: TestChildComponent;

    @ViewChild('childGroup', {read: ElementRef})
    public childGroupElement!: ElementRef;

    @ViewChild('childGroup', {read: LinkActiveDirective})
    public childGroupComponent!: LinkActiveDirective;

    @ViewChild('baby', {read: TestChildComponent})
    public babyComponent!: TestChildComponent;

    public constructor() {
        // empty
    }
}
