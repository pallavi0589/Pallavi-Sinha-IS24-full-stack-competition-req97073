import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  public domain = '//localhost:3000/api/'
  public baseUrl = 'products';

  constructor(private http: HttpClient) { }

  get(): Observable<any> {
    return this.http.get<any>(this.domain+this.baseUrl);
  }

  find(id:string):Observable<any> {
    return this.http.get<any>(this.domain+this.baseUrl+"/"+id);
  }

  post(data: any): Observable<any> {
    return this.http.post<any>(this.domain+this.baseUrl, data);
  }

  edit(data: any): Observable<any> {
    return this.http.put<any>(this.domain+this.baseUrl+"/edit", data);
  }
}
