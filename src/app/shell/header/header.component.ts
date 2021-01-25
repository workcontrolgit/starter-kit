import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';

import { UserData } from '@core/data/users';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: any;

  userMenu = [{ title: 'Profile' }, { title: 'Log out' }];

  constructor(
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private themeService: NbThemeService,
    private userService: UserData,
    // private layoutService: LayoutService,
    private breakpointService: NbMediaBreakpointsService,
    private authservice: AuthService
  ) {}

  ngOnInit() {
    this.userService
      .getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((users: any) => (this.user = users.nick));
    this.menuService.onItemClick().subscribe((event) => {
      this.onItemSelection(event.item.title);
    });
  }

  onItemSelection(title: any) {
    if (title === 'Log out') {
      // Do something on Log out
      this.authservice.signOut();
      //console.log('Log out Clicked ')
    } else if (title === 'Profile') {
      // Do something on Profile
      console.log('Profile Clicked ');
    }
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }

  logout() {
    this.authservice.signOut();
  }
}
