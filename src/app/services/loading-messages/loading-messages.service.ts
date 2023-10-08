import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingMessagesService {
  messages: string[] = [];
  constructor() {
    this.initMessages();
  }

  initMessages() {
    this.messages.push(
      'Se vuele más facil, cada día es un poco más fácil, pero tienes que hacerlo cada día, es la parte difícil, pero se vuelve más fácil.'
    );
    this.messages.push('Crecer duele');
    this.messages.push(
      'No sirve de nada hacer sacrificios si no tienes disciplina'
    );
    this.messages.push('Cae 7 veces, levantate 8');
    this.messages.push(
      'La disciplina es el puente entre las metas y los logros'
    );
    this.messages.push('Take a sad song and make it better');
  }

  getRandomMessage() {
    return this.messages[Math.floor(Math.random() * this.messages.length)];
  }

  cycleMessages(): Observable<string> {
    return new Observable<string>((observer) => {
      observer.next(this.messages[0]);
      let i = 1;
      setInterval(() => {
        observer.next(this.messages[i]);
        i++;
        if (i === this.messages.length) i = 0;
      }, 3500);
    });
  }
}
