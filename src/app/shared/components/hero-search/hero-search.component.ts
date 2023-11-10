import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Hero } from 'src/app/core/models/hero.model';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent {

  heroes$!: Observable<Hero[]>;

  @Input() label: string = '';

  search(term: string): void {
    console.log(term);
  }



}
