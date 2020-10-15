import {NgClass}                           from '@angular/common';
import {
    ChangeDetectorRef,
    Directive,
    EventEmitter,
    Inject,
    Input,
    OnDestroy,
    OnInit,
    Optional,
    Output,
    SkipSelf,
}                                          from '@angular/core';
import {NavigationEnd, Router}             from '@angular/router';
import {isEqual}                           from '@lastdragon-ru/ng-app-kit-core';
import {Subject, Subscription}             from 'rxjs';
import {buffer, debounceTime, filter, map} from 'rxjs/operators';
import {ClassList}                         from './ClassList';
import {LinkActiveChild}                   from './LinkActiveChild';
import {LinkActiveContainer}               from './LinkActiveContainer';
import {LinkActiveMatcher}                 from './LinkActiveMatcher';
import {Matcher}                           from './Matcher';
import {ContainsMatcher}                   from './Matchers/ContainsMatcher';
import {DefaultMatcher}                    from './Matchers/DefaultMatcher';
import {ExactMatcher}                      from './Matchers/ExactMatcher';
import {NgClassToken}                      from './NgClassToken';

/**
 * Same as `[routerLinkActive]` but with kit's URLs support.
 */
@Directive({
    selector:  '[kitRouterLinkActive]',
    exportAs:  'kitRouterLinkActive',
    providers: [ // TODO [#4] Use safe `Provider`
        {
            provide:     LinkActiveContainer,
            useExisting: LinkActiveDirective,
        },
        {
            provide:  NgClassToken,
            useClass: NgClass,
        },
    ],
})
export class LinkActiveDirective extends LinkActiveContainer
    implements OnInit, OnDestroy {
    @Output()
    public readonly statusChanges = new EventEmitter<boolean>();

    private active: boolean                   = false;
    private matcher: LinkActiveMatcher | null = null;
    private readonly checker                  = new Subject<LinkActiveContainer | LinkActiveChild | null>();
    private readonly children                 = new Set<LinkActiveContainer | LinkActiveChild>();
    private readonly navigated: Subscription;

    public constructor(
        protected readonly router: Router,
        protected readonly cdr: ChangeDetectorRef,
        @Inject(NgClassToken)
        private readonly ngClass: NgClass,
        @Inject(LinkActiveContainer) @SkipSelf() @Optional()
        private readonly container: LinkActiveContainer | null    = null,
        @Optional()
        private readonly defaultMatcher: LinkActiveMatcher | null = null,
    ) {
        super();

        // We should check the status every time when url changed.
        this.navigated = router.events
            .pipe(filter((event) => event instanceof NavigationEnd))
            .subscribe(() => {
                this.check();
            });

        // To do fewer checks we group all changes and process them by packs.
        this.checker
            .pipe(
                // TODO [router] Move time to config
                // TODO [router] Timeout maybe not optimal, need to check
                buffer(this.checker.pipe(debounceTime(25))),
                map(children => new Set(children)),
            )
            .subscribe((children) => {
                this.recalculate(children);
            });
    }

    // <editor-fold desc="Getters / Setters">
    // =========================================================================
    @Input('kitRouterLinkActive')
    public get classes(): ClassList | null {
        return this.#classes;
    }

    public set classes(classes: ClassList | null) {
        if (!isEqual(this.classes, classes)) {
            this.#classes = classes;

            this.syncClasses();
        }
    }

    // tslint:disable-next-line:member-access
    #classes: ClassList | null = null;

    @Input('matcher')
    public get customMatcher(): Matcher | null {
        return this.#customMatcher;
    }

    public set customMatcher(matcher: Matcher | null) {
        if (!isEqual(this.customMatcher, matcher)) {
            this.#customMatcher = matcher;

            this.resetMatcher();
            this.check();
        }
    }

    // tslint:disable-next-line:member-access
    #customMatcher: Matcher | null = null;

    // </editor-fold>

    // <editor-fold desc="Angular">
    // =========================================================================
    public ngOnInit(): void {
        if (this.container) {
            this.container.add(this);
        }

        this.check();
    }

    public ngOnDestroy(): void {
        this.checker.complete();
        this.navigated.unsubscribe();
        this.statusChanges.complete();

        if (this.container) {
            this.container.delete(this);
        }

        if (this.children.size > 0) {
            throw new Error('`LinkActiveDirective.children` is not empty!');
        }
    }

    // </editor-fold>

    // <editor-fold desc="LinkActiveChild">
    // =========================================================================
    public isActive(): boolean {
        return this.active;
    }

    public add(child: LinkActiveContainer | LinkActiveChild): void {
        this.children.add(child);
        this.check(child);
    }

    public delete(child: LinkActiveContainer | LinkActiveChild): void {
        this.children.delete(child);
        this.check();
    }

    public check(child: LinkActiveContainer | LinkActiveChild | null = null): void {
        if (child && !this.children.has(child)) {
            throw new Error('Unregistered child cannot be checked.');
        }

        this.checker.next(child);
    }

    // </editor-fold>

    // <editor-fold desc="Functions">
    // =========================================================================
    private recalculate(children: Set<LinkActiveContainer | LinkActiveChild | null>): void {
        // Calculate current status by changed children
        let active = this.hasActiveChild(children);

        // Is there any active child?
        if (this.active && !active) {
            active = this.hasActiveChild(this.children);
        }

        // Update status
        if (!isEqual(this.active, active)) {
            this.active = active;

            this.syncClasses();
            this.statusChanges.next(active);
            this.cdr.markForCheck();

            if (this.container) {
                this.container.check(this);
            }
        }
    }

    protected hasActiveChild(children: Set<LinkActiveContainer | LinkActiveChild | null>): boolean {
        let active = false;

        for (const child of children) {
            if (this.isActiveChild(child)) {
                active = true;
                break;
            }
        }

        return active;
    }

    protected isActiveChild(child: LinkActiveContainer | LinkActiveChild | null): boolean {
        let active = false;

        if (child instanceof LinkActiveContainer) {
            active = child.isActive();
        } else if (child) {
            active = this.getMatcher().isActive(child.getUrlTree());
        } else {
            // empty
        }

        return active;
    }

    protected setClasses(classes: ClassList | null): void {
        this.ngClass.ngClass = classes || '';
        this.ngClass.ngDoCheck();
    }

    protected syncClasses(): void {
        if (this.active) {
            this.setClasses(this.classes);
        } else {
            this.setClasses(null);
        }
    }

    protected getMatcher(): LinkActiveMatcher {
        // Exists?
        if (this.matcher) {
            return this.matcher;
        }

        // Custom?
        let matcher: LinkActiveMatcher | null = null;

        switch (this.customMatcher) {
            case 'contains':
                matcher = new ContainsMatcher(this.router);
                break;
            case 'exact':
                matcher = new ExactMatcher(this.router);
                break;
            default:
                matcher = this.customMatcher;
                break;
        }

        // Injected default
        if (!this.matcher) {
            matcher = this.defaultMatcher;
        }

        // Default
        if (!matcher) {
            matcher = new DefaultMatcher(this.router);
        }

        // Save
        this.matcher = matcher;

        // Return
        return matcher;
    }

    protected resetMatcher(): void {
        this.matcher = null;
    }

    // </editor-fold>
}
