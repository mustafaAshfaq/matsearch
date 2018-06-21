import { RouterModule } from '@angular/router';
// import { BooksModule } from './books/books.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './store/effects/auth.effects';
import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';
import { reducer, metaReducers } from './store/reducers';
import { CustomRouterStateSerializer } from './shared/utils';
import { AppRoutes } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustMaterialModule } from './shared/cust-material/cust-material.module';
import { EllipsisPipe } from './pipes/ellipsis.pipe';
import { BookService } from './services/book.service';
import { SearchBooksComponent } from './pages/search-books/search-books.component';
import { BookPreviewComponent } from './components/book-preview/book-preview.component';
import { BooksListComponent } from './components/books-list/books-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { BookDetailPageComponent } from './pages/book-detail-page/book-detail-page.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { LoginModal } from './components/Auth/login-modal.component';
import { CdkTableModule } from '@angular/cdk/table';
import { AuthService } from './services/auth.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/exhaustMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/retry';
@NgModule({
  declarations: [
    AppComponent,
    EllipsisPipe,
    SearchBooksComponent,
    BookPreviewComponent,
    BooksListComponent,
    BookDetailPageComponent,
      BookDetailsComponent,
      LoginModal
  ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule, CommonModule,
        StoreModule.forRoot(reducer, { metaReducers }),
        StoreRouterConnectingModule, CdkTableModule,
    RouterModule,
    AppRoutes,
        FormsModule, ReactiveFormsModule,
        HttpModule, HttpClientModule,
    // BooksModule,
        CustMaterialModule,
        EffectsModule.forRoot([AuthEffects])
  ],
  providers: [{
        provide: LocationStrategy,
        useClass: HashLocationStrategy
  },
      { provide: RouterStateSerializer, useClass: CustomRouterStateSerializer },
      BookService,
      AuthService
    ],
    entryComponents: [LoginModal, AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
