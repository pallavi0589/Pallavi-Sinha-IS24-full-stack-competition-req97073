import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AppConstants } from 'src/app/app.constants';

@Injectable()
export class UserService {

  public userEntity: any | null;
  public userUpdated =  new BehaviorSubject<any>(null);    
  constructor() { }
  
  setUser(userEntity: any) { 
    this.userEntity = this.setAccess(userEntity);
    sessionStorage.setItem("loggedIn", JSON.stringify(this.userEntity)); 
    this.userUpdated.next(this.userEntity);  
  }  

  setAccess(userEntity: any) {
    const access = [];
    if(userEntity?.role === 'devopsResource') {
      access.push(AppConstants.access.ADD);
      access.push(AppConstants.access.EDIT);
    } else if(userEntity?.role === 'director') {
      access.push(AppConstants.access.ADD);
    }
    userEntity['access'] = access;
    return userEntity;
  }
  
  getUser(): any {  
    let data: any = sessionStorage.getItem("loggedIn");
    if(data) {
      data = JSON.parse(data);
    } else {
      data = null;
    }
    return data;  
  }

  logout() {
    sessionStorage.removeItem("loggedIn");
    this.userEntity = null;
    location.reload();
  }
}