import { Injectable } from '@angular/core'
import { Http, Headers, RequestOptions, Response } from '@angular/http'
import { Observable } from 'rxjs'
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
  public token: string

  private headers = new Headers({ 'Content-Type': 'application/json' })
  private options = new RequestOptions({ headers : this.headers })
  private hostURL = 'http://localhost'
  private hostPORT = '8000'

  constructor(private http: Http) {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token
  }

  login(email: string, password: string): Observable<boolean> {

    return this.http.post( this.hostURL+ this.hostPORT + '/authenticate', JSON.stringify({email: email, password: password}),this.options)
      .map((response: Response) => {
        let token = response.json() && response.json().token
        
        if(token) {
          this.storeToken(email, password, token)
          return true
        } else {
          return false
        }
      })
  }

  register(email: string, password: string, password_confirmation: string, name: string): Observable<boolean> {

    return this.http.post(this.hostURL + ':' + this.hostPORT +'/register',JSON.stringify({email: email,password: password, password_confirmation: password_confirmation,name : name}),this.options)
      .map((response: Response) => {
        let token = response.json() && response.json().token
        let errors = response.json() && response.json().errors
        if(token) {
          this.storeToken(email, name, token)
          return true
        }
        if(errors) {
          return errors
        }
        return false;
      })
  }

  logout(): void {
    this.token = null
    localStorage.removeItem('currentUser')
  }

  storeToken(email:string, name:string, token: string){
    this.token = token
    localStorage.setItem('currentUser',JSON.stringify({ email: email, name: name,token: token }))
  }

}
