
import { TransferStateInterceptor } from './interceptors/transfer-state.interceptor';
import { TransferStateService } from '../services/transfer-state.service';
import { NgModule,ModuleWithProviders } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
//import { NgProgressModule } from '@ngx-progressbar/core';
//import { HttpClientModule } from '@angular/common/http';
//import { NgProgressHttpModule } from '@ngx-progressbar/http';
// store
import {StoreModule} from '@ngrx/store';
import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';
import { reducer, metaReducers } from '@src/app/store/reducers/index';
import { CustomRouterStateSerializer } from '@src/app/shared/utils';

// Services
import { AuthService } from '../services/auth.service';
import { BookService } from '../services/book.service';

import { TokenInterceptor } from './interceptors/token.interceptor';
// import { ProductDummyService } from './services/product-dummy.service';

import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from '../store/effects/auth.effects';

import { CanActivateViaAuthGuard } from './guards/auth.guard';
import { ResponseInterceptor } from './interceptors/reponse.interceptor';
import { ModalDialogService } from 'nativescript-angular/modal-dialog';

@NgModule({
  declarations: [
    // components
    // DummyService,
    // pipes
  ],
  exports: [
    // components
    // DummyService
    //NgProgressModule
  ],
  imports: [
    StoreModule.forRoot(reducer,{metaReducers}),
    StoreRouterConnectingModule.forRoot(),
    EffectsModule.forRoot([
      AuthEffects,
    ]),
    //HttpClientModule,
   // NgProgressModule,
   // NgProgressHttpModule
  ],
  
})
export class CoreModule {
    static forRoot():ModuleWithProviders{
        return {
            ngModule:CoreModule,
            providers: [
                AuthService,
                BookService,
              CanActivateViaAuthGuard,
              { provide: RouterStateSerializer, useClass: CustomRouterStateSerializer },
              { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
              { provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true },
              ModalDialogService
            ]
        }
    }
}
