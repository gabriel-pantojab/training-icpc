import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { provideStore } from '@ngrx/store';
import { routes } from './app.routes';
import { todosReducer } from './state';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'training-icpc',
        appId: '1:332791973283:web:821c40fcf6598c7878c616',
        storageBucket: 'training-icpc.appspot.com',
        apiKey: 'AIzaSyCyDrhYWQgmym3_Pw3zZUuT6kUmWZW0e58',
        authDomain: 'training-icpc.firebaseapp.com',
        messagingSenderId: '332791973283',
        measurementId: 'G-DZRRK3MP28',
        databaseURL: 'https://training-icpc-default-rtdb.firebaseio.com/',
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase()),
    provideStore({
      todosState: todosReducer,
    }),
  ],
};
