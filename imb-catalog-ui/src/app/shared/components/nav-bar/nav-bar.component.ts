import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  public loggedInUser = 'Lisa';

  constructor(private userService: UserService) {}

  public logout() {
    this.userService.logout();
  }
}
