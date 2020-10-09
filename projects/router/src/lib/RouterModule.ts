import {NgModule}              from '@angular/core';
import {LinkDirective}         from './Directives/LinkDirective';
import {LinkWithHrefDirective} from './Directives/LinkWithHrefDirective';

@NgModule({
    imports:      [],
    declarations: [
        LinkDirective,
        LinkWithHrefDirective,
    ],
    exports:      [
        LinkDirective,
        LinkWithHrefDirective,
    ],
})
export class RouterModule {
}
