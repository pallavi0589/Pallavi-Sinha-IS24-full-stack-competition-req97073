import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AppConstants } from 'src/app/app.constants';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnDestroy, OnInit {
  private routeSubscription: any;

  constructor(private router: Router, private userService: UserService) {
    this.getCurrentRoute();
  }

  public currentRoute: string = '';

  public sidebarIcons = [
    {
      id: 'PRODUCT_LIST',
      name: 'pie_chart',
      route: '/product-list',
      isAllowed: true
    }, {
      id: 'ADD_PRODUCT',
      name: 'add_circle',
      route: '/add-product',
      isAllowed: true
    }
  ];

  ngOnInit() {
    if(this.userService.getUser()?.access?.length) {
      this.sidebarIcons[1].isAllowed = !!(this.userService.getUser().access.find((x:any) => x === AppConstants.access.ADD));
    }
  }

  private getCurrentRoute() {
    this.routeSubscription = this.router.events.subscribe(
      (event: any) => {
        if (event instanceof NavigationEnd) {
          this.currentRoute = this.router.url;
        }
      }
    );
  }

  public goTo(routeName: string) {
    this.router.navigate([routeName]);
  }

  ngOnDestroy() {
    this.routeSubscription?.unsubscribe;
  }
}
