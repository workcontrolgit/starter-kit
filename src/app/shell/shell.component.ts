import { Component, OnInit } from '@angular/core';
import { NbMenuItem, NbSidebarService } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'DASHBOARD',
    group: true,
  },
  {
    title: 'Home',
    icon: 'home-outline',
    link: '/home',
    home: true,
  },
  {
    title: 'About',
    icon: 'people-outline',
    link: '/about',
  },
  {
    title: 'ADMIN',
    group: true,
  },

  {
    title: 'Report',
    icon: 'layout-outline',
    children: [
      {
        title: 'Report 1',
        link: '/about',
      },
      {
        title: 'Report 2',
        link: '/about',
      },
      {
        title: 'Report 3',
        link: '/about',
      },
    ],
  },
];

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
})
export class ShellComponent implements OnInit {
  items = MENU_ITEMS;
  constructor(private readonly sidebarService: NbSidebarService) {}

  toggleSidebar(): boolean {
    this.sidebarService.toggle();
    return false;
  }

  ngOnInit() {}
}
