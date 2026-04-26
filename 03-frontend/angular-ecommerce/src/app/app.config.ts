import { ApplicationConfig } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';  // 👈 add withHashLocation
import { provideHttpClient, withFetch } from '@angular/common/http';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withHashLocation()),  // 👈 add withHashLocation
    provideHttpClient(withFetch())
  ]
};