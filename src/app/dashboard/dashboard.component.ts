import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Hero } from '../core/models/hero.model';
import { HeroService } from '../core/services/hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];
  constructor(private heroService: HeroService, private router: Router) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void{
    this.heroService.getAll().subscribe(resp => {
      this.heroes = resp.slice(1,5);  //slice vai pegar os dados do Array da posição 1,2,3 e 4
    })
  }

  onSelected(hero: Hero): void {
    this.router.navigate(['/heroes', hero.id]);
  }

}
