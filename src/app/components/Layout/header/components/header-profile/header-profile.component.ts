import {Component,OnInit,Input, ViewContainerRef} from '@angular/core';
import {ModalDialogOptions,ModalDialogService} from 'nativescript-angular/modal-dialog'
import { LoginModalNativeComponent } from '@src/app/components/Auth/login-modal.component';
import { RouterExtensions } from 'nativescript-angular/router'

@Component({
    selector:"header-profile",
    templateUrl:"./header-profile.component.html",
    styleUrls:["header-profile.component.scss"]
})
export class HeaderProfileComponent implements OnInit{
    @Input() isAuthenticated:boolean
    constructor(private viewRef:ViewContainerRef,private dialogService:ModalDialogService,private router:RouterExtensions){}
    ngOnInit(){

    }
    showModal(){
        let options:ModalDialogOptions= {
            viewContainerRef:this.viewRef,
            fullscreen:false,
            context:{loggedIn:this.isAuthenticated}
        };
        
        this.dialogService.showModal(LoginModalNativeComponent,options)
        .then((viewResult)=>console.log(`login :${viewResult==true?'Successful':'Failed'}`));
        
    }
}