import {AppError} from '@lastdragon-ru/ng-app-kit-core';

export abstract class ResolverErrorHandler {
    public abstract onError(error: AppError): void;
}
