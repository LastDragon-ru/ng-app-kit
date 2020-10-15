import {UrlTree} from '@angular/router';

export abstract class LinkActiveMatcher {
    public abstract isActive(url: UrlTree): boolean;
}
