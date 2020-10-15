import {UrlTree} from '@angular/router';

export abstract class LinkActiveChild {
    public abstract getUrlTree(): UrlTree;
}
