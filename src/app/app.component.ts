import { Component, OnInit } from '@angular/core'
import { NavigationEnd, Router } from '@angular/router'
import { RouterExtensions } from '@nativescript/angular'
import {
  DrawerTransitionBase,
  RadSideDrawer,
  SlideInOnTopTransition,
} from 'nativescript-ui-sidedrawer'
import { filter } from 'rxjs/operators'
import { Application } from '@nativescript/core'
import { NotificationService } from './services/notification.service'

@Component({
  standalone: false,
  selector: 'ns-app',
  templateUrl: 'app.component.html',
})
export class AppComponent implements OnInit {
  private _activatedUrl: string
  private _sideDrawerTransition: DrawerTransitionBase

  constructor(
  private router: Router,
  private routerExtensions: RouterExtensions,
  private notificationService: NotificationService
) {}

  ngOnInit(): void {
  this._activatedUrl = '/tasks'
  this._sideDrawerTransition = new SlideInOnTopTransition()

  this.notificationService.initialize()

  this.router.events
    .pipe(filter((event: any) => event instanceof NavigationEnd))
    .subscribe((event: NavigationEnd) => {
      this._activatedUrl = event.urlAfterRedirects
    })
}

  get sideDrawerTransition(): DrawerTransitionBase {
    return this._sideDrawerTransition
  }

  isComponentSelected(url: string): boolean {
    if (url === '/home') {
      return this._activatedUrl === '/home'
    }

    return (
      this._activatedUrl === url ||
      this._activatedUrl.startsWith(url + '/')
    )
  }

  onNavItemTap(navItemRoute: string): void {
    this.routerExtensions.navigate([navItemRoute], {
      transition: {
        name: 'fade',
      },
    })

    const sideDrawer = Application.getRootView() as RadSideDrawer
    sideDrawer.closeDrawer()
  }
}
