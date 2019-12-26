import {Component,OnInit,ViewChild} from '@angular/core';
import { TokenModel } from 'nativescript-ui-autocomplete';
import { ObservableArray } from "tns-core-modules/data/observable-array";
import { RadAutoCompleteTextViewComponent } from 'nativescript-ui-autocomplete/angular/autocomplete-directives';
import { BookService } from '@src/app/services/book.service';

@Component({
    selector:'app-header-search',
    templateUrl:'./header-search.component.html',
    styleUrls:['./header-search.component.scss']
})
export class HeaderSearchComponent implements OnInit{
    public dataItems:ObservableArray<TokenModel>
    @ViewChild('searchBar',{static:true}) searchBar:RadAutoCompleteTextViewComponent
    constructor(private bookService:BookService){}
    ngOnInit(){
        this.searchBar.autoCompleteTextView.loadSuggestionsAsync=(text)=>{
           
            const promise= new Promise((resolve,reject)=>{
                if(text.length>3)
                this.bookService.searchBooks(text).subscribe(
                    (data)=>{
                        
                        const items:Array<TokenModel>=data.items.map(item=> new TokenModel(item.volumeInfo.title,undefined));
                       
                        resolve(items);
                    },
                    (error)=>{ console.log(error);reject()}
                );
            });
            return promise;
        }
    }
}