import {AppError} from 'projects/core/src/lib/Classes/AppError';

export interface ErrorFormatterComponent {
    error: AppError;
}
