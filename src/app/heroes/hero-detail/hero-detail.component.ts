import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hero } from '../hero.model';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  heroDetail!: Hero;

constructor(private heroService: HeroService,  //buscar Hero
            private location: Location,        // historico do navegador
            private route: ActivatedRoute){}   // mantem as informacoes sobre o momento da rota atual

ngOnInit(): void {
  this.getHero();
}

getHero():void{
  const id = Number(this.route.snapshot.paramMap.get('id'));
  this.heroService.getHeroId(id).subscribe((resp)=>{
    this.heroDetail = resp
  })
  }

goBack(): void{
  this.location.back();
}
}
