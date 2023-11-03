import { Component } from '@angular/core';
import { MenuItem } from './core/models/menu-item.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tour of Heroes';
  menuItens: MenuItem[] = [
    {
      icon: 'dashboard',
      toRouterLink: '/dashboard',
      tooltipText: 'Dashboard'
    },
    {
      icon: 'sports_martial_arts',
      toRouterLink: '/heroes',
      tooltipText: 'Heroes'
    },
  ]
}
