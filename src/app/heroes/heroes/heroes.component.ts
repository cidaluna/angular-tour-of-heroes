import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero.model';
import { HeroService } from '../hero.service';

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

    // teste subscribe com exemplo da documentacao rxjs
    this.heroService.getHero().subscribe({
        next(x) {
        console.log('got value ' + JSON.stringify(x, null, 2));
      },
      error(err) {
        console.error('something wrong occurred: ' + err);
      },
      complete() {
        console.log('done');
      }
    });
  }

  onSelect(hero: Hero): void{
    this.selectedHero = hero;
    console.log(this.selectedHero);
  }

}
