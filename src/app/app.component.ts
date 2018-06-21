import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { LoginModal } from './components/Auth/login-modal.component';
import { Observable } from 'rxjs/Observable';
@Component({
  moduleId: module.id,
  selector: 'ngb-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
    title = 'ngb';
    isLoggedIn=false ;//Observable<boolean>
    loggedUser: any;//Observable<any>
    get loggedText() {
        if (this.isLoggedIn === true)
            return 'Logout';
        else
            return 'Login';
    }
    constructor(private dialog: MatDialog) { }

    openModal() {
        let dialogRef = this.dialog.open(LoginModal, {
            width: '400px',
            data: { logout: this.isLoggedIn }
        });
        
        dialogRef.afterClosed().subscribe(result => {
            
            if (result) {
                //result.loggedIn.subscribe(val => this.isLoggedIn = val);
                //result.user.subscribe(usr => { console.log(usr); this.loggedUser = usr });
                this.isLoggedIn = result.loggedIn;
                this.loggedUser = result.user;
                if (this.loggedUser && !this.isLoggedIn)
                    this.isLoggedIn = true;
                //if (result.user)
                //    this.loggedUser = result.user.get('name');
                //else
                //    this.loggedUser = '';
            }

        });
    }
}
