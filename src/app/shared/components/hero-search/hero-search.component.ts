import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent {

  @Input() label: string = '';




}
