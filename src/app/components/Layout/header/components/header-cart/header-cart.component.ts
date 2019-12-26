import {Component,OnInit,Input} from '@angular/core';
@Component({ selector:"header-cart",templateUrl:'header-cart.component.html',styleUrls:[]})
export class HeaderCartComponent implements OnInit{
    @Input() totalCartItems: number;
    ngOnInit(){
    }
    constructor(){}
    getCurrentOrder(){

    }

}