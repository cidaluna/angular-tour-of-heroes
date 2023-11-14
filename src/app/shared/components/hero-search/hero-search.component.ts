import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Hero } from 'src/app/core/models/hero.model';
import { HeroService } from 'src/app/core/services/hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit{
  // Observable pega valores dele, Subject posso atribuir valores pra ele atraves do next, o BehaviorSubject eu consigo dar um valor inicial
  heroes$!: Observable<Hero[]>;

  private searchTerm = new Subject<string>(); // a os valores dos dados estao sendo modificados a cada digitacao feita

  @Input() label: string = '';

  @Output() private selected = new EventEmitter<Hero>(); // output é pra enviar de volta a info para o filho que chamou

  constructor(private heroService: HeroService){}

  ngOnInit(): void {
    // chamada ao serviço de busca atraves do switchMap
    this.heroes$ = this.searchTerm.pipe(
      debounceTime(700), // 600 milisegundos
      distinctUntilChanged(), // executa se o valor for diferente do que ja foi digitado
      switchMap((resp) => this.heroService.search(resp))
    );
  }

  search(term: string): void {
    this.searchTerm.next(term); // vai atualizar o Subject
  }

  onSelected(selectedItem: MatAutocompleteSelectedEvent): void {
    this.searchTerm.next('');  // faz a limpeza do dropdown que aparece nas buscas
    const hero: Hero = selectedItem.option.value;
    this.selected.emit(hero); // emite um valor(hero) pra quem estiver ouvindo
  }

}
