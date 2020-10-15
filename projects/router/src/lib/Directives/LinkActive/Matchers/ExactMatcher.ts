import {Router, UrlTree}   from '@angular/router';
import {LinkActiveMatcher} from '../LinkActiveMatcher';

export class ExactMatcher extends LinkActiveMatcher {
    public constructor(protected router: Router) {
        super();
    }

    public isActive(url: UrlTree): boolean {
        return this.router.isActive(url, true);
    }
}
