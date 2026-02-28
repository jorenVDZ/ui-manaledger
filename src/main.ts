import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { appConfig } from './app/app.config';

bootstrapApplication(App, appConfig)
  .then(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((reg) => console.log('Service worker registered:', reg.scope))
        .catch((err) => console.warn('Service worker registration failed:', err));
    }
  })
  .catch((err) => console.error(err));
