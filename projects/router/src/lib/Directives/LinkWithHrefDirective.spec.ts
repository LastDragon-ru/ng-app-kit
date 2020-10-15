import {Component, NgZone, QueryList, ViewChildren} from '@angular/core';
import {
    ComponentFixture,
    fakeAsync,
    TestBed,
    tick,
}                                                   from '@angular/core/testing';
import {By}                                         from '@angular/platform-browser';
import {ActivatedRoute, Router}                     from '@angular/router';
import {RouterTestingModule}                        from '@angular/router/testing';
import {HashMap}                                    from '@lastdragon-ru/ng-app-kit-core';
import {using}                                      from '@lastdragon-ru/ng-app-kit-core-testing';
import {RouterService}                              from '../Services/RouterService/RouterService';
import {LinkActiveChild}                            from './LinkActive/LinkActiveChild';
import {LinkActiveContainer}                        from './LinkActive/LinkActiveContainer';
import {LinkWithHrefDirective}                      from './LinkWithHrefDirective';

describe('LinkWithHrefDirective', () => {
    // <editor-fold desc="Vars">
    // =========================================================================
    // FIXME [angular] Navigation triggered outside Angular zone
    //      https://github.com/angular/angular/issues/25837
    let zone: NgZone;
    let router: Router;
    let fixture: ComponentFixture<TestComponent>;
    // </editor-fold>

    // <editor-fold desc="Prepare">
    // =========================================================================
    beforeEach(() => {
        TestBed
            .configureTestingModule({
                declarations: [
                    LinkWithHrefDirective,
                    TestComponent,
                    LinkWithHrefDirectiveChildComponent,
                ],
                imports:      [
                    RouterTestingModule.withRoutes(
                        [
                            {
                                path:       '',
                                pathMatch:  'full',
                                redirectTo: '/object/404/edit',
                            },
                            {
                                path:      'url',
                                component: TestComponent,
                            },
                            {
                                path:     'object',
                                children: [
                                    {
                                        path:      '',
                                        component: TestComponent,
                                    },
                                    {
                                        path:      ':object/edit',
                                        component: TestComponent,
                                    },
                                ],
                            },
                        ],
                        {
                            relativeLinkResolution: 'corrected',
                        },
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

        // Component
        fixture = TestBed.createComponent(TestComponent);
        fixture.detectChanges();
    }));
    // </editor-fold>

    // <editor-fold desc="Tests">
    // =========================================================================
    it('/object/404/edit', () => {
        expect(router.url).toEqual('/object/404/edit');
    });

    describe('click()', () => {
        const dataProvider: HashMap<{ selector: string, expected: string }> = {
            'absolute url':                    {
                selector: '#appLinkAbsolute',
                expected: '/url',
            },
            'absolute url with params':        {
                selector: '#appLinkAbsoluteWithParams',
                expected: '/object/123/edit',
            },
            'relative url':                    {
                selector: '#appLinkRelative',
                expected: '/object',
            },
            'relative to null':                {
                selector: '#appLinkRelativeToNull',
                expected: '/url',
            },
            'relative to <route>':             {
                selector: '#appLinkRelativeToRoute',
                expected: '/object',
            },
            'relative to "current"':           {
                selector: '#appLinkRelativeToCurrent',
                expected: '/object',
            },
            'relative to "parent"':            {
                selector: '#appLinkRelativeToParent',
                expected: '/object/123/edit',
            },
            'relative url with params':        {
                selector: '#appLinkRelativeWithParams',
                expected: '/object/123/edit',
            },
            '<button appLink="url"></button>': {
                selector: '#appLinkInvalid',
                expected: '/object/404/edit',
            },
        };

        using(dataProvider, (description, data) => {
            it(description, fakeAsync(() => {
                const link: HTMLElement = fixture.debugElement.query(By.css(data.selector)).nativeElement;

                expect(link).toBeInstanceOf(HTMLElement);

                link.click();

                tick();

                if (link instanceof HTMLAnchorElement || link instanceof HTMLAreaElement) {
                    expect(link.getAttribute('href')).toEqual(data.expected);
                }

                expect(router.url).toEqual(data.expected);
            }));
        });
    });

    it('LinkActiveChild', fakeAsync(() => {
        // Create component
        const component = TestBed.createComponent(LinkWithHrefDirectiveChildComponent);

        component.detectChanges();

        // Prepare
        const addSpy    = spyOn(component.componentInstance, 'add');
        const checkSpy  = spyOn(component.componentInstance, 'check');
        const deleteSpy = spyOn(component.componentInstance, 'delete');

        // Add
        component.componentInstance.enabled = true;
        component.detectChanges();

        expect(addSpy).toHaveBeenCalledWith(component.componentInstance.link);
        expect(checkSpy).toHaveBeenCalledWith(component.componentInstance.link);
        expect(deleteSpy).not.toHaveBeenCalled();

        // Delete
        const directive                     = component.componentInstance.link;
        component.componentInstance.enabled = false;
        component.detectChanges();

        expect(deleteSpy).toHaveBeenCalledWith(directive);
    }));
    // </editor-fold>
});

@Component({
    template: `
                  <a id="appLinkAbsolute" kitRouterLink="/url"></a>
                  <a id="appLinkRelative" kitRouterLink="../object"></a>
                  <a id="appLinkRelativeToNull" kitRouterLink="url" [relativeTo]="null"></a>
                  <a id="appLinkRelativeToRoute" kitRouterLink="./object" [relativeTo]="route"></a>
                  <a id="appLinkRelativeToParent" kitRouterLink="123/edit" relativeTo="parent"></a>
                  <a id="appLinkRelativeToCurrent" kitRouterLink="../../../object" relativeTo="current"></a>
                  <a id="appLinkAbsoluteWithParams" [kitRouterLink]="['/object/:object/edit', {object: 123}]"></a>
                  <a id="appLinkRelativeWithParams" [kitRouterLink]="['../object/:object/edit', {object: 123}]"></a>
                  <button type="button" id="appLinkInvalid" kitRouterLink="/url"></button>
              `,
})
class TestComponent {
    public constructor(public route: ActivatedRoute) {
        // empty
    }
}

@Component({
    template:  `
                   <ng-container *ngIf="enabled">
                       <a kitRouterLink="/url"></a>
                   </ng-container>
               `,
    providers: [
        {
            provide:     LinkActiveContainer,
            useExisting: LinkWithHrefDirectiveChildComponent,
        },
    ],
})
class LinkWithHrefDirectiveChildComponent implements LinkActiveContainer {
    public enabled: boolean = false;

    @ViewChildren(LinkWithHrefDirective)
    public links!: QueryList<LinkWithHrefDirective>;

    public get link(): LinkWithHrefDirective {
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
