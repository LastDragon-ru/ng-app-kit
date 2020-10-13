import {Component, NgZone, NO_ERRORS_SCHEMA} from '@angular/core';
import {
    ComponentFixture,
    fakeAsync,
    TestBed,
    tick,
}                                            from '@angular/core/testing';
import {By}                                  from '@angular/platform-browser';
import {ActivatedRoute, Router}              from '@angular/router';
import {RouterTestingModule}                 from '@angular/router/testing';
import {HashMap}                             from '@lastdragon-ru/ng-app-kit-core';
import {using}                               from '@lastdragon-ru/ng-app-kit-core-testing';
import {RouterService}                       from '../Services/RouterService/RouterService';
import {LinkWithHrefDirective}               from './LinkWithHrefDirective';

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
                schemas:      [NO_ERRORS_SCHEMA],
                declarations: [LinkWithHrefDirective, TestComponent],
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
