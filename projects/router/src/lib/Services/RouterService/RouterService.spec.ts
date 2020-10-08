import {Component, NgModule, NgZone} from '@angular/core';
import {fakeAsync, TestBed, tick}    from '@angular/core/testing';
import {
    ActivatedRoute,
    DefaultUrlSerializer,
    NavigationExtras,
    Router,
    UrlTree,
}                                    from '@angular/router';
import {RouterTestingModule}         from '@angular/router/testing';
import {HashMap, isFunction}         from '@lastdragon-ru/ng-app-kit-core';
import {using}                       from '@lastdragon-ru/ng-app-kit-core-testing';
import {Link}                        from './Link';
import {NavExtras}                   from './NavExtras';
import {RouterService}               from './RouterService';

describe('RouterService', () => {
    // <editor-fold desc="Vars">
    // =========================================================================
    // FIXME [angular] Navigation triggered outside Angular zone
    //      https://github.com/angular/angular/issues/25837
    let zone: NgZone;
    let router: Router;
    let service: RouterService;
    // </editor-fold>

    // <editor-fold desc="Prepare">
    // =========================================================================
    beforeEach(() => {
        TestBed
            .configureTestingModule({
                declarations: [TestComponent],
                imports:      [
                    RouterTestingModule.withRoutes(
                        [
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
                                        path:      'create',
                                        component: TestComponent,
                                    },
                                    {
                                        path:      ':object/edit',
                                        component: TestComponent,
                                    },
                                ],
                            },
                            {
                                path:         'child',
                                loadChildren: () => TestChildModule,
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
            })
            .compileComponents();
    });

    beforeEach(() => {
        zone    = TestBed.inject(NgZone);
        router  = TestBed.inject(Router);
        service = TestBed.inject(RouterService);
    });
    // </editor-fold>

    // <editor-fold desc="url()">
    // =========================================================================
    describe('url()', () => {
        const dataProvider: { link: Link, expected: string[]; }[] = [
            {
                link:     '/path/to/something',
                expected: ['/path/to/something'],
            },
            {
                link:     ['/path/to/something', {param: 'value'}],
                expected: ['/path/to/something'],
            },
            {
                link:     '/path/:to/something',
                expected: ['/path/:to/something'],
            },
            {
                link:     ['/path/:to/something/:else', {
                    to:   'else',
                    else: 'to',
                }],
                expected: ['/path/else/something/to'],
            },
        ];

        using(dataProvider, (description, data) => {
            it(description, () => {
                expect(service.url(data.link)).toEqual(data.expected);
            });
        });
    });
    // </editor-fold>

    // <editor-fold desc="getCurrentRoute()">
    // =========================================================================
    describe('getCurrentRoute()', () => {
        const dataProvider: { root: string; expected: string | null; }[] = [
            {
                root:     '/',
                expected: '/',
            },
            {
                root:     '/url',
                expected: '/url',
            },
            {
                root:     '/object',
                expected: '/object',
            },
            {
                root:     '/object/create',
                expected: '/object/create',
            },
            {
                root:     '/object/1/edit',
                expected: '/object/1/edit',
            },
            {
                root:     '/child',
                expected: '/child',
            },
            {
                root:     '/child/create',
                expected: '/child/create',
            },
            {
                root:     '/child/1/edit',
                expected: '/child/1/edit',
            },
        ];

        using(dataProvider, (description, data) => {
            it(`${data.root} (#${description})`, fakeAsync(() => {
                // Go to url
                zone.run(() => {
                    router.navigate([data.root]);
                });

                tick();

                // Navigated?
                expect(router.url).toEqual(data.root);

                // Test
                const current = routeToPath(service.getCurrentRoute());

                expect(current).toEqual(router.url);
                expect(current).toEqual(data.expected);
            }));
        });
    });
    // </editor-fold>

    // <editor-fold desc="getParentRoute()">
    // =========================================================================
    describe('getParentRoute()', () => {
        const dataProvider: { root: string; expected: string | null; }[] = [
            {
                root:     '/',
                expected: null,
            },
            {
                root:     '/url',
                expected: '/',
            },
            {
                root:     '/object',
                expected: '/',
            },
            {
                root:     '/object/create',
                expected: '/object',
            },
            {
                root:     '/object/1/edit',
                expected: '/object',
            },
            {
                root:     '/child',
                expected: '/',
            },
            {
                root:     '/child/create',
                expected: '/child',
            },
            {
                root:     '/child/1/edit',
                expected: '/child',
            },
        ];

        using(dataProvider, (description, data) => {
            it(`${data.root} (#${description})`, fakeAsync(() => {
                // Go to url
                zone.run(() => {
                    router.navigate([data.root]);
                });

                tick();

                // Navigated?
                expect(router.url).toEqual(data.root);

                // Test
                expect(routeToPath(service.getParentRoute())).toEqual(data.expected);
            }));
        });
    });
    // </editor-fold>

    // <editor-fold desc="getModuleRoute()">
    // =========================================================================
    describe('getModuleRoute()', () => {
        const dataProvider: { root: string; expected: string | null; }[] = [
            {
                root:     '/',
                expected: '/',
            },
            {
                root:     '/url',
                expected: '/',
            },
            {
                root:     '/object',
                expected: '/',
            },
            {
                root:     '/object/create',
                expected: '/',
            },
            {
                root:     '/object/1/edit',
                expected: '/',
            },
            {
                root:     '/child',
                expected: '/child',
            },
            {
                root:     '/child/create',
                expected: '/child',
            },
            {
                root:     '/child/1/edit',
                expected: '/child',
            },
        ];

        using(dataProvider, (description, data) => {
            it(`${data.root} (#${description})`, fakeAsync(() => {
                // Go to url
                zone.run(() => {
                    router.navigate([data.root]);
                });

                tick();

                // Navigated?
                expect(router.url).toEqual(data.root);

                // Test
                expect(routeToPath(service.getModuleRoute())).toEqual(data.expected);
            }));
        });
    });
    // </editor-fold>

    // <editor-fold desc="getRelativeToRoute()">
    // =========================================================================
    it('getRelativeToRoute()', () => {
        expect(service.getRelativeToRoute(null)).toBe(null);
        expect(service.getRelativeToRoute('module')).toBe(service.getModuleRoute());
        expect(service.getRelativeToRoute('parent')).toBe(service.getParentRoute());
        expect(service.getRelativeToRoute('current')).toBe(service.getCurrentRoute());
        expect(service.getRelativeToRoute(router.routerState.root)).toBe(router.routerState.root);
    });
    // </editor-fold>

    // <editor-fold desc="navigate()">
    // =========================================================================
    describe('navigate()', () => {
        interface DataProviderNavigate {
            root: string;
            path: Link | UrlTree;
            extras?: NavExtras | { relativeToPath: string };
            expected: {
                url: string,
                args: [string[] | UrlTree, NavigationExtras | undefined | ((service: RouterService) => NavigationExtras)],
            };
        }

        const dataProvider: HashMap<DataProviderNavigate | (() => DataProviderNavigate)> = {
            'string: / => child':                                                    {
                root:     '/',
                path:     'child',
                expected: {
                    url:  '/child',
                    args: [['child'], (srv) => ({relativeTo: srv.getRootRoute()})],
                },
            },
            'string: / => child (with extras)':                                      {
                root:     '/',
                path:     'child',
                extras:   {queryParamsHandling: 'merge'},
                expected: {
                    url:  '/child',
                    args: [['child'], (srv) => {
                        return {
                            relativeTo:          srv.getRootRoute(),
                            queryParamsHandling: 'merge',
                        };
                    }],
                },
            },
            'Link: / => child/:child/edit':                                          {
                root:     '/',
                path:     ['child/:child/edit', {child: 1}],
                expected: {
                    url:  '/child/1/edit',
                    args: [['child/1/edit'], (srv) => ({relativeTo: srv.getRootRoute()})],
                },
            },
            'Link: /child => :child/edit':                                           {
                root:     '/child',
                path:     [':child/edit', {child: 1}],
                expected: {
                    url:  '/child/1/edit',
                    args: [['1/edit'], (srv) => ({relativeTo: srv.getModuleRoute()})],
                },
            },
            'Link: /child/1/edit => :child/edit (relativeTo: /child)':               {
                root:     '/child/1/edit',
                path:     [':child/edit', {child: 2}],
                extras:   {relativeToPath: '/child'},
                expected: {
                    url:  '/child/2/edit',
                    args: [['2/edit'], (srv) => ({relativeTo: pathToRoute(srv, '/child')})],
                },
            },
            'string: / => /child':                                                   {
                root:     '/',
                path:     '/child',
                expected: {
                    url:  '/child',
                    args: [['/child'], (srv) => ({relativeTo: srv.getRootRoute()})],
                },
            },
            'Link: / => /child/:child/edit':                                         {
                root:     '/',
                path:     ['/child/:child/edit', {child: 1}],
                expected: {
                    url:  '/child/1/edit',
                    args: [['/child/1/edit'], (srv) => ({relativeTo: srv.getRootRoute()})],
                },
            },
            'Link: /child => /child/:child/edit':                                    {
                root:     '/child',
                path:     ['/child/:child/edit', {child: 1}],
                expected: {
                    url:  '/child/1/edit',
                    args: [['/child/1/edit'], (srv) => ({relativeTo: srv.getModuleRoute()})],
                },
            },
            'string: /child/:child/edit => create (relative to "parent")':           {
                root:     '/child/2/edit',
                path:     'create',
                extras:   {relativeTo: 'parent'},
                expected: {
                    url:  '/child/create',
                    args: [['create'], (srv) => ({relativeTo: srv.getParentRoute()})],
                },
            },
            'Link: /child => :child/edit (relative to "current")':                   {
                root:     '/child',
                path:     [':child/edit', {child: 1}],
                extras:   {relativeTo: 'current'},
                expected: {
                    url:  '/child/1/edit',
                    args: [['1/edit'], (srv) => ({relativeTo: srv.getCurrentRoute()})],
                },
            },
            'Link: /child => child/:child/edit (relative to null)':                  {
                root:     '/child',
                path:     ['child/:child/edit', {child: 1}],
                extras:   {relativeTo: null},
                expected: {
                    url:  '/child/1/edit',
                    args: [['child/1/edit'], {relativeTo: null}],
                },
            },
            'string: /object/:object/edit => /object/create (relative to "module")': {
                root:     '/object/1/edit',
                path:     'object/create',
                extras:   {relativeTo: 'module'},
                expected: {
                    url:  '/object/create',
                    args: [['object/create'], (srv) => ({relativeTo: srv.getModuleRoute()})],
                },
            },
            'string: /child/:child/edit => /child/create (relative to "module")':    {
                root:     '/child/1/edit',
                path:     'create',
                extras:   {relativeTo: 'module'},
                expected: {
                    url:  '/child/create',
                    args: [['create'], (srv) => ({relativeTo: srv.getModuleRoute()})],
                },
            },
            'UrlTree: / => /child/:child/edit':                                      () => {
                const urlTree = (new DefaultUrlSerializer()).parse('/child/1/edit');

                return {
                    root:     '/',
                    path:     urlTree,
                    expected: {
                        url:  '/child/1/edit',
                        args: [urlTree, (srv) => ({relativeTo: srv.getRootRoute()})],
                    },
                };
            },
        };

        using(dataProvider, (description, closure) => {
            it(description, fakeAsync(() => {
                // Prepare
                const data = isFunction(closure) ? closure() : closure;

                zone.run(() => {
                    router.navigate([data.root]);
                });

                tick();

                // Navigated?
                expect(router.url).toEqual(data.root);

                // Test
                const extras      = data.extras && 'relativeToPath' in data.extras
                    ? {relativeTo: pathToRoute(service, data.extras.relativeToPath)}
                    : data.extras;
                const spyNavigate = data.path instanceof UrlTree
                    ? spyOn(router, 'navigateByUrl').and.callThrough()
                    : spyOn(router, 'navigate').and.callThrough();

                if (data.expected.args[1] && isFunction(data.expected.args[1])) {
                    data.expected.args[1] = data.expected.args[1](service);
                }

                zone.run(() => {
                    service.navigate(data.path, extras);
                });

                tick();

                expect(router.url).toEqual(data.expected.url);
                expect(spyNavigate).toHaveBeenCalledWith(...data.expected.args);
            }));
        });
    });
    // </editor-fold>

    // <editor-fold desc="navigateToParent">
    // =========================================================================
    const dataProviderNavigateToParent: { root: string, extras?: NavExtras, expected: string }[] = [
        {
            root:     '/',
            expected: '/',
        },
        {
            root:     '/child',
            expected: '/',
        },
        {
            root:     '/object/1/edit',
            expected: '/object',
        },
        {
            root:     '/object/1/edit',
            extras:   {queryParamsHandling: 'merge'},
            expected: '/object',
        },
    ];

    using(dataProviderNavigateToParent, (description, data) => {
        it(`navigateToParent: ${description}`, fakeAsync(() => {
            zone.run(() => {
                router.navigate([data.root]);
            });

            tick();

            // Navigated?
            expect(router.url).toEqual(data.root);

            // Test
            zone.run(() => {
                service.navigateToParent(data.extras);
            });

            tick();

            expect(router.url).toEqual(data.expected);
        }));
    });
    // </editor-fold>
});

function routeToPath(route: ActivatedRoute | null): string | null {
    return route ? '/' + route.snapshot.pathFromRoot
        .map(p => {
            return p.url.join('/');
        })
        .filter(v => !!v)
        .join('/') : null;
}

function pathToRoute(service: RouterService, path: string): ActivatedRoute | null {
    // tslint:disable-next-line:no-string-literal
    return service['findRoute']((route) => {
        return routeToPath(route) === path;
    });
}

@Component({template: ''})
class TestComponent {
    // empty
}

@Component({template: ''})
class TestChildComponent {
    // empty
}

@NgModule({
    declarations: [TestChildComponent],
    imports:      [
        RouterTestingModule.withRoutes([
            {
                path:      '',
                component: TestChildComponent,
            },
            {
                path:      'create',
                component: TestChildComponent,
            },
            {
                path:      ':child/edit',
                component: TestChildComponent,
            },
        ]),
    ],
})
class TestChildModule {
    // empty
}
