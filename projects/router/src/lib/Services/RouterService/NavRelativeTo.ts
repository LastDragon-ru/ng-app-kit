import {ActivatedRoute} from '@angular/router';

export type NavRelativeTo = ActivatedRoute
    | 'module'
    | 'parent'
    | 'current'
    | null;
