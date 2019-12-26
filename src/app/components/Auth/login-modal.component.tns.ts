import {Component,OnDestroy} from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular/modal-dialog';
import {Store} from '@ngrx/store';
import { Login, Register } from '@src/app/store/actions/auth/auth.action';
import { State } from '@src/app/store/reducers/index';
import { Observable,Subscription } from 'rxjs'
import { selectLoginError, selectLoginPending,selectLoggedIn } from '@src/app/store/reducers/auth/index';

@Component({ selector:'login-modal',
templateUrl:'login-modal.component.tns.html'
,styleUrls:['login-modal.component.tns.scss']})
export class LoginModalNativeComponent implements OnDestroy{

constructor(private modalDialogParams:ModalDialogParams,private store:Store<State>){}
    isSignUp;
    userForm={
        username:'',password:'',name:''
    };
    private pendingSubsciption=this.store.select(selectLoginPending).subscribe(p => this._pending = p);
    public _pending: boolean = false;
    public error$: Observable<any> = this.store.select(selectLoginError);
    private loggedInSubscription:Subscription;
    submit(values){
        if(this.isSignUp)
            this.store.dispatch(new Register(values));
        else
            this.store.dispatch(new Login(values));
        this.loggedInSubscription=this.store.select(selectLoggedIn).subscribe(logged=>{
            if(logged)
                this.modalDialogParams.closeCallback(logged);
        })
    }
    cancel(){
        this.modalDialogParams.closeCallback(false);
    }
    fieldTouched(fieldClass:string){
        return fieldClass.indexOf('ng-dirty')>=0
    }
    ngOnDestroy(){
        if(this.pendingSubsciption)
            this.pendingSubsciption.unsubscribe();
        if(this.loggedInSubscription)
            this.loggedInSubscription.unsubscribe();
    }

}