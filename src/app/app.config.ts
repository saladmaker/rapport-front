import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { token } from './auth.config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom(
      JwtModule.forRoot({
        config: {
          tokenGetter: token,
          headerName: 'authorization',
          allowedDomains: ['localhost:8080'],
          disallowedRoutes: ['localhost:8080/api/login']
        }
      })
    ),
    provideHttpClient(
      withInterceptorsFromDi()
    ),
  ]
};
