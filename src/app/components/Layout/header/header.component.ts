import {Component,OnInit,AfterContentChecked,ViewChild, AfterViewInit,ChangeDetectorRef} from '@angular/core';
import {Store} from '@ngrx/store';
import {getAuthStatus,State} from '../../../store/reducers/index';
import { NavigationEnd, Router } from "@angular/router";
import {Observable} from 'rxjs'
import {environment} from '../../../../environments/environment'
import {RadSideDrawerComponent}  from 'nativescript-ui-sidedrawer/angular'
import {filter} from 'rxjs/operators';
import {DrawerTransitionBase,SlideInOnTopTransition,RadSideDrawer} from 'nativescript-ui-sidedrawer'
@Component({
    selector:'ngb-header',
    templateUrl:'./header.component.html',
    styleUrls:['./header.component.scss']

})
export class HeaderComponent implements OnInit,AfterViewInit{
    sideDrawerTransition:DrawerTransitionBase;
    @ViewChild(RadSideDrawerComponent,{static:false}) drawerComponent:RadSideDrawerComponent
    sideDrawer:RadSideDrawer
   constructor(private store:Store<State>,private changeDetectionRef:ChangeDetectorRef,private router:Router){

   }
   public isScrolled:boolean=false;
   public isModalShown:boolean=false;
   public headerConfig=environment.headerConfig;
   activatedUrl;
   logged$:Observable<boolean>;
    ngOnInit()
    {
        this.router.events.pipe(filter((events:any)=> events instanceof NavigationEnd))
        .subscribe((event:NavigationEnd)=>this.activatedUrl=event.urlAfterRedirects);
       this.sideDrawerTransition= new SlideInOnTopTransition();
        this.logged$=this.store.select(getAuthStatus)
    }
    ngAfterViewInit(){
        this.sideDrawer=this.drawerComponent.sideDrawer;
        this.changeDetectionRef.detectChanges();

    }
    public isComponentSelected(url){
        return this.activatedUrl===url;
    }
    public showModal()
    {
        this.isModalShown=!this.isModalShown;
        if(this.isModalShown)
            this.sideDrawer.showDrawer();
        else
            this.sideDrawer.closeDrawer();
    }
}