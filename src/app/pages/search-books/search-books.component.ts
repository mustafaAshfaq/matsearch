import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import {debounceTime,distinctUntilChanged} from 'rxjs/operators'
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'ngb-search-books',
  templateUrl: 'search-books.component.html',
  styleUrls: ['search-books.component.scss']
})
export class SearchBooksComponent implements OnInit {
  searchText = 'science';
  $searchTextChanged: Subject<string> = new Subject<string>();
  books: Book[] = [];
  searching = false;
  constructor(private bookService: BookService) {
      console.log('app component loading');
  }

  ngOnInit() {
    this.initSearchTextHandler();
  }

  initSearchTextHandler() {
    this.$searchTextChanged.pipe(
      debounceTime(300)// wait 300ms after the last event before emitting last event
      ,distinctUntilChanged()// only emit if value is different from previous value
      ).subscribe(searchTextVal => {
        this.searchBooks(this.searchText);
      });
    this.$searchTextChanged.next(this.searchText);
  }

  onSearchTextChange(newSearchVal: string) {
    if (newSearchVal === '') {
      this.searchText = '';
      this.books = [];
    }else {
      this.$searchTextChanged.next(newSearchVal);
    }
  }

  searchBooks(queryText: string) {
    this.searching = true;
    if (queryText) {
      this.bookService.searchBooks(queryText)
          .subscribe(
          (data) => { this.books = data.items; this.searching = false; },
          error => {
          this.books = [];
              this.searchText = '';
              this.searching = false;
          }
          //(response) => {
          //console.log(response);
          //this.searching = false;
          //this.books = response.items;
        //}
      )
    }else {
      setTimeout(() => {
        this.books = [];
        this.searchText = '';
        this.searching = false;
      }, 500);
    }
  }

}
