import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
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
    return this.http.get<Hero>(this.getUrl(id)).pipe(
      tap((resp) => {
        this.log(`Fetched ${this.descAttributes(resp)}`)
      }
    ))
  }

  // GET /heroes/?name=term&age=abc
  // query string
  search(term: string): Observable<Hero[]>{
    if(!term.trim()){
      return of([]); // retorna um array vazio se nao for digitado nada no termo e é como Observable por causa do uso do of
    }

    return this.http.get<Hero[]>(`${this.heroesUrl}?name=${term}`).pipe(
      tap((resp) => {
        resp.length ? this.log(`Found ${resp.length} hero(es) matching ${term}`)
                    : this.log(`No hero(es) matching ${term}`)
      }
    ));
  }


  // POST/heroes/new
  createHero(hero: Hero): Observable<Hero>{
    return this.http.post<Hero>(this.heroesUrl, hero).pipe(
      tap((resp) =>
        this.log(`Created ${this.descAttributes(resp)}`)
      )
    )
  }

  // PUT /heroes/id
  updateHero(hero: Hero): Observable<Hero>{
    // passar no put a url com id, mais o objeto heroDetail
    return this.http.put<Hero>(this.getUrl(Number(hero.id)), hero).pipe(
      tap((resp) =>
        this.log(`Updated ${this.descAttributes(resp)}`)
      )
    );
  }

  // DELETE /heroes/id
  // Backend retorna status 204 e nada a mais
  deleteHero(hero: Hero): Observable<any>{
    return this.http.delete<any>(this.getUrl(Number(hero.id))).pipe(
      tap(() =>
        this.log(`Deleted ${this.descAttributes(hero)}`)
      )
    );
  }

  private log(message: string): void{
    this.messageService.add(`Hero service: ${message}!!!`)
  }

  private descAttributes(hero: Hero): string {
    return ` hero id = ${hero.id} and name = ${hero.name}. `;
  }

  private getUrl(id: number): string {
    return `${this.heroesUrl}/${id}`;
  }
}
