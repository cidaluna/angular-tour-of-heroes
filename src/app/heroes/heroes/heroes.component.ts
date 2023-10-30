import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero.model';
import { HeroService } from '../hero.service';
import { Observable } from 'rxjs';
import { MessageService } from 'src/app/messages/message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];
  selectedHero?: Hero;

  constructor(private heroService: HeroService,
              private messageService: MessageService){}

  ngOnInit(){
    this.getHeroes();
  }

  getHeroes():void{
    // subscribe nao sabemos qdo ocorre, mas, qdo ocorre exibe o retorno
    this.heroService.getHero().subscribe( resp => {
      this.heroes = resp;
    });
  }

  onSelect(hero: Hero): void{
    this.selectedHero = hero;
    this.messageService.add(`HeroesComponent: Selected hero id = ${hero.id} `);
    console.log(this.selectedHero);
  }

}
