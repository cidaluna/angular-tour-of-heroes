import { Injectable } from '@angular/core';
import { HEROES } from './mock-heroes';
import { Hero } from './hero.model';
import { Observable, of, throwError } from 'rxjs';
import { MessageService } from '../messages/message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private messageService: MessageService){}

  getHero(): Observable<Hero[]>{ // retorna o Observable de uma lista de Hero[]
    //return HEROES; // retorno lista de heroes mock, dados sincronos, estão aqui, no mesmo momento que eu peço os dados eu obtenho
    const heroes = of(HEROES); // transforma o mock no Observable
    this.messageService.add('HeroService: fetched heroes');
    return heroes;
  }
}
