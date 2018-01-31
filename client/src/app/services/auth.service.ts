import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {

  // domain = ""; // Production
  domain = environment.domain;

  constructor(
    private http: Http
  ) { }

  // Function to register user accounts
  buttonPushed(user) {
    return this.http.post(this.domain + 'api/pushButton', user).map(res => res.json());
  }

}
