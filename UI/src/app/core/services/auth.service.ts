import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(private http: HttpClient) {}
  private TOKEN_KEY = 'jwt_token';

  // login(request: any) {
  //   // localStorage.setItem(this.TOKEN_KEY, token);
  // }

  login(request: any): Observable<any> {
    let  baseUrl = 'https://localhost:44392/api/Auth';
    return this.http.post(`${baseUrl}/login`, request);
  }

  getEmpListDetails(request: any) : Observable<any> {
    let  baseUrl = 'https://localhost:44392/api/Auth';
    return this.http.post(`${baseUrl}/getEmployeeList`, request);
  }

 addEmployee(request: any): Observable<any>{
  let baseUrl = 'https://localhost:44392/api/Auth'
  return this.http.post(`${baseUrl}/registoreEmployee`, request);
 }





  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }
}
