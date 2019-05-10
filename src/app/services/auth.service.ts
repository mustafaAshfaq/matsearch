import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable ,of,throwError} from 'rxjs';
import { filter, mergeMap, catchError,tap } from 'rxjs/operators';
import { User, Authenticate } from '../models/auth.model';

interface APIResponse {
    token:string
}
@Injectable()
export class AuthService {
    private url: string = ''
    constructor(private http: HttpClient) {
        this.url ='https://birotyapp-auth.azurewebsites.net/';
    }
    public authenticateUser(authenticate: Authenticate)//: Observable<User>
    {
        let body = { email: authenticate.username, password: authenticate.password };//JSON.stringify({ email: authenticate.username, password: authenticate.password });
        let headers = new HttpHeaders(
            {
                'Content-Type':'application/json'
            }
        );
        
        return this.http.post(this.url + 'users/login/', body,
            { headers: headers })
            .pipe(
            catchError(this.handleError),
            tap(
                data => this.setuserDetail(data)
            ));
            
            //https://jsonplaceholder.typicode.com/users/new Headers([{'Content-Type':'application/json'}]) }
            //.mergeMap(res => res.json())
            //.filter<any>(data => data.username === authenticate.username)
            //.map(res=>res.json())
            //.map(data => {
            //    localStorage.setItem('user', data.token);
            //    return JSON.parse(this.getUserDetail(data.token));
            //}).catch(err => {
            //    console.log(err);
            //    return Observable.throw(err);
            //});
        
        //return Observable.of(({ name: authenticate.name } as User));
    }
    public register(authenticate: Authenticate)//: Observable<User>
    {
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        let body = { email: authenticate.username, password: authenticate.password, name: authenticate.name };//JSON.stringify({ email: authenticate.username, password: authenticate.password, name: authenticate.name });
        
        return this.http.post(this.url+'users/register/', body, { headers: headers })
           .pipe(
                catchError(this.handleError),
                tap(
                data => this.setuserDetail(data)
            ));
    }
    private setuserDetail(data) {
        localStorage.setItem('user', data.token);
    }
    private getUserDetail(token: string): string {
        let data = token.split('.');
        if (data && data.length > 0) {
            let payload = data[1];
            let user = atob(payload);
            console.log('service' + JSON.stringify(JSON.parse(user)));
            return user;
        }
        return null;
    }
    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent)
            console.log('error in connection');
        else
            console.log(`Server Error ${error.status}, error details:${error.error}`);
        return throwError(`Error in fetching data, please try again`);
    }
    public authorizeUser(): Observable<boolean> {
        if ((['undefined', null].indexOf(localStorage.getItem('user')) === -1)) {
            let user = JSON.parse(this.getUserDetail(localStorage.getItem('user')));
            return of(user && user.exp > Date.now)
        }
        return of(false);
    }
    public getUsers(uname: string)//: Observable<User[]>
    {
        let headers = new HttpHeaders();
        headers.append('Authorization', `bearer ${localStorage.getItem('user')}`);
        return this.http.get(this.url + 'users/', { headers: headers })
            .pipe(catchError(this.handleError));
        //.merge
       // .map(res => res.json())
            //.filter<User>(data => (uname === null || uname.length == 0) || ((uname && uname.length > 0) && data.username === uname))
            //.map(data => <User[]>data.users)
            //.catch(err => { console.log(err); return Observable.of([]) });
    }
    public getUser(): Observable<User> {
        const user = JSON.parse (this.getUserDetail(localStorage.getItem('user')));//JSON.parse(localStorage.getItem('user'));
        return of(user as User);
    }
    public logout(): Observable<boolean> {
        localStorage.removeItem('user');
        return of(true);
    }
}
