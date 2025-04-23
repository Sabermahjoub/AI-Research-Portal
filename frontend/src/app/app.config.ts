import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpErrorResponse, provideHttpClient, withInterceptors, withFetch } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of, throwError } from 'rxjs';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(
      withFetch(),
      withInterceptors([
        (req, next) => {
          // Get token from localStorage - only in browser environment
          if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
            const token = localStorage.getItem('token');

            // Add common headers for all requests
            req = req.clone({
              setHeaders: {
                'Content-Type': 'application/json',
                'Accept': '*/*'  // Accept any content type
              }
            });

            // If token exists, add it to the Authorization header
            if (token) {
              req = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${token}`
                }
              });
            }
          }

          console.log('HTTP Request:', req);

          // Just pass the request through
          return next(req);
        }
      ])
    )
  ]
};
