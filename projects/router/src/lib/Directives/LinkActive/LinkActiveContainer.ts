import {LinkActiveChild} from './LinkActiveChild';

export abstract class LinkActiveContainer {
    public abstract isActive(): boolean;

    public abstract add(child: LinkActiveContainer | LinkActiveChild): void;

    public abstract delete(child: LinkActiveContainer | LinkActiveChild): void;

    public abstract check(child: LinkActiveContainer | LinkActiveChild): void;
}
