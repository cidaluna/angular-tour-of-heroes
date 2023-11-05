import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { LoadingComponent } from './components/loading/loading.component';
import { MessagesComponent } from './components/messages/messages.component';
import { PageNotFoundComponent } from './components/page-not-found.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { HttpErrorInterceptor } from './interceptors/http-error.interceptor';
import { LoadingInterceptor } from './interceptors/loading.interceptor';

const COMPONENTS = [MessagesComponent, ToolbarComponent, PageNotFoundComponent, LoadingComponent];
const MODULES = [MaterialModule, RouterModule];

@NgModule({
  declarations: [COMPONENTS ],
  imports: [CommonModule, MODULES],
  exports:[COMPONENTS, MODULES],
  providers:[
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    }
  ]
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
