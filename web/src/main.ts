import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig).catch(err => console.error(err));

// fetch('http://localhost:8080/projects')
//   .then(res => res.json())
//   .then(console.warn);
