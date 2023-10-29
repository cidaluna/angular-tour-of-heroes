import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero.model';
import { HeroService } from '../hero.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];
  selectedHero?: Hero;

  constructor(private heroService: HeroService){}

  ngOnInit(){
    this.getHeroes();
  }

  getHeroes():void{
    // subscribe nao sabemos qdo ocorre, mas, qdo ocorre exibe o retorno
    //this.heroService.getHero().subscribe( resp => {
    //  this.heroes = resp;
    //})

    // teste subscribe com exemplo da documentacao rxjs, com arrow function
    //this.heroService.getHero().subscribe(
    //    (resp) => console.log(resp),
    //    (error) => console.error(error),
    //    () => console.log('done')
   // );

   const observable = new Observable((subscriber) => {
    subscriber.next(1);
    subscriber.next(2);
    subscriber.next(3);
    setTimeout(() => {
      subscriber.next(4);
      subscriber.complete();
    }, 1000);
  });

  console.log('just before subscribe');
  observable.subscribe({
    next(x) {
      console.log('got value ' + x);
    },
    error(err) {
      console.error('something wrong occurred: ' + err);
    },
    complete() {
      console.log('done');
    },
  });
  console.log('just after subscribe');


  }

  onSelect(hero: Hero): void{
    this.selectedHero = hero;
    console.log(this.selectedHero);
  }

}
