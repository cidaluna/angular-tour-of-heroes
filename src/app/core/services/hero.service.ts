import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { Hero } from '../models/hero.model';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  loading: boolean = false;
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
  getHero(): Observable<Hero[]>{
    this.loading = true;
    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      tap((resp) => {
          this.log(`fetched ${resp.length} hero(es).`)
        }
      ),
      finalize(()=> this.loading = false)); // passa sempre aqui, independente se der sucesso ou erro
  }

  // GET /heroes/id
  getHeroId(id: number): Observable<Hero>{
    return this.http.get<Hero>(`${this.heroesUrl}/${id}`).pipe(
      tap((resp) => {
        this.log(`fetched hero id=${id} and name=${resp.name}`)
      }
    ))
  }

  private log(message: string): void{
    this.messageService.add(`Hero service: ${message}`)
  }
}
