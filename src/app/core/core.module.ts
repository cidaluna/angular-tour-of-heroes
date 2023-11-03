import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MessagesComponent } from './components/messages/messages.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MaterialModule } from './material/material.module';

const COMPONENTS = [MessagesComponent, ToolbarComponent];
const MODULES = [MaterialModule, RouterModule];

@NgModule({
  declarations: [COMPONENTS],
  imports: [CommonModule, MODULES],
  exports:[COMPONENTS, MODULES]
})
export class CoreModule {
  // criando uma variavel parantModule nao obrigatoria, uma vez que o CoreModule for importado la no AppModule
  // nao permite que outros modulos carregem o CoreModule de novo.
  constructor(@Optional() @SkipSelf() parentModule?: CoreModule){
    if (parentModule){
      throw new Error('Core Module has already been Loaded. Import this Module in the App Module.')
    }
  }
}
