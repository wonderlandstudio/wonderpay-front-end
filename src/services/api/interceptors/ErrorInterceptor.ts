import { ApiError } from '@monite/sdk-api';
import { toast } from '@/hooks/use-toast';

export class ErrorInterceptor {
  static handleError(error: ApiError): never {
    console.error('API Error:', error);

    let message = 'An unexpected error occurred';
    let details = error.message;

    if (error.status) {
      switch (error.status) {
        case 401:
          message = 'Authentication failed. Please log in again.';
          break;
        case 403:
          message = 'You do not have permission to perform this action.';
          break;
        case 404:
          message = 'The requested resource was not found.';
          break;
        case 422:
          message = 'Invalid data provided.';
          break;
        case 429:
          message = 'Too many requests. Please try again later.';
          break;
        case 500:
          message = 'Server error. Please try again later.';
          break;
        default:
          message = details || message;
      }
    }

    toast({
      title: "Error",
      description: message,
      variant: "destructive",
    });

    throw error;
  }
}