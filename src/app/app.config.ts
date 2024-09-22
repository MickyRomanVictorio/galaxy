import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(), provideAnimationsAsync(), provideFirebaseApp(() => initializeApp({"projectId":"curso-galaxy","appId":"1:295383739324:web:991c75943950e5974999b9","databaseURL":"https://curso-galaxy-default-rtdb.firebaseio.com","storageBucket":"curso-galaxy.appspot.com","apiKey":"AIzaSyDaB89umsiLE4h7N3AS3UPvKRDQkQCSB8E","authDomain":"curso-galaxy.firebaseapp.com","messagingSenderId":"295383739324","measurementId":"G-PE6GWMWCSS"})), provideFirestore(() => getFirestore())]
};
