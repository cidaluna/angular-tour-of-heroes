import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hero } from '../../core/models/hero.model';
import { HeroService } from '../../core/services/hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
})
export class HeroDetailComponent implements OnInit {
  heroDetail!: Hero;
  isEditing!: boolean;

  constructor(
    private heroService: HeroService, //buscar Hero
    private location: Location, // historico do navegador
    private route: ActivatedRoute
  ) {} // mantem as informacoes sobre o momento da rota atual

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const paramId = this.route.snapshot.paramMap.get('id');

    if(paramId === 'new'){
      this.isEditing = false;
      this.heroDetail = { name: ''} as Hero;
    }else{
      this.isEditing = true;
      const id = Number(paramId);
      this.heroService.getOne(id).subscribe((resp) => {
        this.heroDetail = resp;
      });
    }

  }

  goBack(): void {
    this.location.back();
  }

  save() {
    this.heroService.createHero(this.heroDetail).subscribe(() => this.goBack());
  }

  edit() {
    this.heroService.updateHero(this.heroDetail).subscribe(() => this.goBack());
  }

  isValid(): boolean{
    // se remover os caracteres ou colocar só espaços, não habilita o botao save
    return !!this.heroDetail.name.trim();
    // negando 2x porque:
    // se vier vazio = ' '
    // negar o vazio 1x = ! vira true
    // negar o vazio 2x = !! vira false
  }
}
