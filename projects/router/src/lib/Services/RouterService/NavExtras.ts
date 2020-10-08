import {NavigationExtras} from '@angular/router';
import {NavRelativeTo}    from './NavRelativeTo';

export interface NavExtras extends Omit<NavigationExtras, 'relativeTo'> {
    relativeTo?: NavRelativeTo;
}
