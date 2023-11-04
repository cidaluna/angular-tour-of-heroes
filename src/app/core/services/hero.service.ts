import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Hero } from '../models/hero.model';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroesUrl = 'api/heroes';

  constructor(private http: HttpClient, private messageService: MessageService){}

  /*
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
  */

  // GET /heroes
  getAll(): Observable<Hero[]>{
    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      tap((resp) => {
          this.log(`fetched ${resp.length} hero(es).`)
        }
      ))
  }

  // GET /heroes/id
  getOne(id: number): Observable<Hero>{
    return this.http.get<Hero>(`${this.heroesUrl}/${id}`).pipe(
      tap((resp) => {
        this.log(`fetched hero id=${id} and name=${resp.name}`)
      }
    ))
  }

  private log(message: string): void{
    this.messageService.add(`Hero service: ${message}`)
  }

  // PUT /heroes/id
  updateHero(hero: Hero): Observable<Hero>{
    // passar no put a url com id, mais o objeto heroDetail
    return this.http.put<Hero>(`${this.heroesUrl}/${hero.id}`, hero).pipe(
      tap((hero) =>
        this.log(`Updated hero id = ${hero.id} and name = ${hero.name}`)
      )
    );
  }
}
