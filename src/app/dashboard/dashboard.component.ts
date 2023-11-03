import { Component, OnInit } from '@angular/core';
import { HeroService } from '../heroes/hero.service';
import { Hero } from '../heroes/hero.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];
  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void{
    this.heroService.getHero().subscribe(resp => {
      this.heroes = resp.slice(1,5);  //slice vai pegar os dados do Array da posição 1,2,3 e 4
    })
  }

}
