import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/core/components/confirmation-dialog/confirmation-dialog.component';
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

  constructor(private dialog: MatDialog, private heroService: HeroService){}

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
    const dialogData = {
      cancelText: 'Cancel',
      confirmText: 'Delete',
      content: `Delete '${hero.name}' ?`
    };

    // abrindo dialog
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: dialogData,
      width: '300px',
    });

    dialogRef.afterClosed().subscribe((resp) => {
      //console.log(resp);
      if(resp){
        this.heroService.deleteHero(hero).subscribe(() => {
          // utilizando o filter, ele percorre a lista e remove, sem precisar chamar novamente a lista com o getHeroes
          // uma chamada a menos para o Backend
          //this.heroes = this.heroes.filter((h) => h !== hero) // true or
          this.getHeroes(); // dessa forma, é feito chamada para o backend novamente
        });
      }
    })


  }

  onSelected(hero: Hero): void {
    this.excluir(hero);
  }

}
