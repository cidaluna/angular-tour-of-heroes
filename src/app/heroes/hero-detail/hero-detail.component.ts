import { Component, Input } from '@angular/core';
import { Hero } from '../hero.model';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent {

  @Input() heroDetail?: Hero; //começa com undefined e caso seja selecionada exibe os detalhes


}
