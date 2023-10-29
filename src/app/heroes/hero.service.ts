import { Injectable } from '@angular/core';
import { HEROES } from './mock-heroes';
import { Hero } from './hero.model';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  getHero(): Hero[]{
    return HEROES; // retorno lista de heroes mock
  }
}
