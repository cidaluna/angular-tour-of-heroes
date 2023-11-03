import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Hero } from '../models/hero.model';
import { MessageService } from './message.service';
import { HEROES } from './mock-heroes';

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

  getHeroId(id: number): Observable<Hero>{
    const heroId = HEROES.find(resp => Number(resp.id) === id)!;
    this.messageService.add(`HeroService: fetched hero id = ${id}`);
    return of(heroId);
  }
}
