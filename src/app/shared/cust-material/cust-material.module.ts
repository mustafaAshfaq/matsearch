import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  imports: [
    MatSidenavModule,
    MatListModule,
    MatTabsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatCardModule,
    MatRadioModule,
    MatGridListModule,
    MatInputModule,
    MatIconModule,
    MatChipsModule,
    MatMenuModule,
    MatSelectModule,
    MatProgressSpinnerModule
  ],
  exports: [
    MatSidenavModule,
    MatListModule,
    MatTabsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatCardModule,
    MatRadioModule,
    MatGridListModule,
    MatInputModule,
    MatIconModule,
    MatChipsModule,
    MatMenuModule,
    MatSelectModule,
      MatProgressSpinnerModule,
      MatDialogModule
  ]
})

export class CustMaterialModule { };
