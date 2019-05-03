import { Component, Inject,OnInit,OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { selectLoginPending, selectLoggedIn, selectLoginError, selectLoggedInUser } from '../../store/reducers/auth';
import { State } from '../../store/reducers';
import { Login, Logout, Register } from '../../store/actions/auth/auth.action';
@Component({
   
    selector: 'ngb-login-modal',
    templateUrl:'login-modal.component.html'
})
export class LoginModal implements OnInit,  OnDestroy {
    public form: FormGroup = this.fb.group({
        username: ['admin1@test.com', Validators.required],
        password: ['12345678', Validators.required],
        name:['']
    });
    private pendingSubsciption=this.store.select(selectLoginPending).subscribe(p => this._pending = p);
    public _pending: boolean = false;
    public error$: Observable<any> = this.store.select(selectLoginError);
    private loginSubscription: Subscription;
    private loggeduserSubscription: Subscription;
    public isSignup: boolean = false;
    loggedIn: boolean = false;
    loggedUser: any = null;
    ngOnInit() {
        if (this.data && this.data.logout)
            this.store.dispatch(new Logout());
    }
    ngOnDestroy() {
        if (this.loginSubscription)
            this.loginSubscription.unsubscribe();
        if (this.loggeduserSubscription)
            this.loggeduserSubscription.unsubscribe();
        this.pendingSubsciption.unsubscribe();
    }
    constructor(
        private store: Store<State>,
        private fb: FormBuilder
       , public dialogRef: MatDialogRef<LoginModal>
        , @Inject(MAT_DIALOG_DATA) public data: any) {
       
    }
    public submit() {
        if (this.isSignup)
            this.store.dispatch(new Register(this.form.value));
        else
            this.store.dispatch(new Login(this.form.value));
        //this.close();
        this.loginSubscription = this.store.select(selectLoggedIn)
            .subscribe(logged => {
                this.loggedIn = logged
                console.log('login:is logged' + logged);
            });
        this.loggeduserSubscription= this.store.select(selectLoggedInUser)
            .subscribe(login => {
                this.loggedUser = login
                console.log('login: user' + JSON.stringify(login));
                if (login)
                    this.close();
            });
    }
    public close() {
        //if (isCancel || (this.loggedIn === true && this.loggedUser))
        this.dialogRef.close({
            loggedIn: this.loggedIn,
            user: this.loggedUser
        });
    }
}