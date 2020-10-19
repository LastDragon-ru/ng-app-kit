import {Injectable, OnDestroy} from '@angular/core';
import {Subject}               from 'rxjs';

// TODO [#5] Useful links:
//      - https://medium.com/angular-in-depth/why-you-have-to-unsubscribe-from-observable-92502d5639d0
//      - https://github.com/angular/angular/issues/14821
//      - https://github.com/angular/angular/issues/28738

@Injectable()
export class DestroyedSubject extends Subject<void> implements OnDestroy {
    public ngOnDestroy(): void {
        this.complete();
    }

    public complete(): void {
        this.next();
        super.complete();
    }
}
