import { Component, OnInit } from '@angular/core';
import { Hero } from '../../core/models/hero.model';
import { HeroService } from '../../core/services/hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'actions'];
  heroes: Hero[] = [];

  constructor(private heroService: HeroService){}

  ngOnInit(){
    this.getHeroes();
  }

  getHeroes():void{
    // subscribe nao sabemos qdo ocorre, mas, qdo ocorre exibe o retorno
    this.heroService.getAll().subscribe( resp => {
      this.heroes = resp;
    });
  }

  excluir(hero: Hero): void {
    this.heroService.deleteHero(hero).subscribe(() => {
      // utilizando o filter, ele percorre a lista e remove, sem precisar chamar novamente a lista com o getHeroes
      // uma chamada a menos para o Backend
      //this.heroes = this.heroes.filter((h) => h !== hero) // true or
      this.getHeroes(); // dessa forma, é feito chamada para o backend novamente
    });
  }

}
