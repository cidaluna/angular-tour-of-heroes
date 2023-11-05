import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  // Trabalhando com formulário reativo
  form = this.fb.group({
    id: [{ value: '', disabled: true}],
    name: ['', [Validators.required, Validators.minLength(3)]]
  })

  constructor(
    private fb: FormBuilder,
    private heroService: HeroService, //buscar Hero
    private location: Location, // historico do navegador
    private route: ActivatedRoute, // mantem as informacoes sobre o momento da rota atual
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const paramId = this.route.snapshot.paramMap.get('id');

    if(paramId !== 'new'){
      this.isEditing = true;
      const id = Number(paramId);
      this.heroService.getOne(id).subscribe((resp) => {
        this.heroDetail = resp;
        this.form.controls['id'].setValue(resp.id);
        this.form.controls['name'].setValue(resp.name);
      });
    }

  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    const { valid, value } = this.form;

    if(valid){
      const myHero: Hero = {
        name: value.name,
      } as Hero;

      this.heroService.createHero(myHero).subscribe(() => this.goBack());
    }else{
      this.showErrorsMsg();
    }
}

  edit(): void {
    const { valid, value } = this.form; // forma diferente, desestruturando o objeto

    if(valid){
      const myHero: Hero = {
        id: this.heroDetail.id,
        name: value.name,
      };

      this.heroService.updateHero(myHero).subscribe(() => this.goBack());
    }else{
      this.showErrorsMsg();
    }
  }

  private showErrorsMsg(): void {
    this.snackBar.open('Please check the errors found.', 'Ok', {
      duration: 5000,
      verticalPosition: 'top',
    })
  }
}
