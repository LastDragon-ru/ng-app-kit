import {NgModule}            from '@angular/core';
import {LinkActiveDirective} from './Directives/LinkActive/LinkActiveDirective';
import {LinkDirective}       from './Directives/LinkDirective';
import {LinkWithHrefDirective} from './Directives/LinkWithHrefDirective';

@NgModule({
    imports:      [],
    declarations: [
        LinkDirective,
        LinkWithHrefDirective,
        LinkActiveDirective,
    ],
    exports:      [
        LinkDirective,
        LinkWithHrefDirective,
        LinkActiveDirective,
    ],
})
export class RouterModule {
}
