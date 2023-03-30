import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { AppConstants } from 'src/app/app.constants';
import { UserService } from './user.service';
@Injectable({
  providedIn: 'root'
})
export class EditAccessGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router){};
  canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
        let loggedInUser = this.userService.getUser();
        let isAllowed = false;
        if (this.userService.getUser()?.access?.length){
            isAllowed = this.userService.getUser()?.access.find((x: any) => x === AppConstants.access.EDIT);
        } 
        if(!isAllowed) {
          this.router.navigate([AppConstants.UNAUTHORIZED_ACCESS_ROUTE])
        }
        return isAllowed;
  }
  
}