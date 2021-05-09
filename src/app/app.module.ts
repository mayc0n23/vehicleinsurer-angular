import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/templates/header/header.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { FooterComponent } from './components/templates/footer/footer.component';
import { NavComponent } from './components/templates/nav/nav.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { ClientListComponent } from './components/client/client-list/client-list.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { RegistrationDialogComponent } from './components/client/registration-dialog/registration-dialog.component';
import { UpdateDialogComponent } from './components/client/update-dialog/update-dialog.component';
import { DeleteDialogComponent } from './components/client/delete-dialog/delete-dialog.component';
import { PolicyListComponent } from './components/policy/policy-list/policy-list.component';
import { PolicyRegistrationDialogComponent } from './components/policy/registration-dialog/registration-dialog.component';
import { PolicyUpdateDialogComponent } from './components/policy/update-dialog/update-dialog.component';
import { PolicyDeleteDialogComponent } from './components/policy/delete-dialog/delete-dialog.component';
import { PolicyDetailComponent } from './components/policy/policy-detail/policy-detail.component';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    ClientListComponent,
    RegistrationDialogComponent,
    UpdateDialogComponent,
    DeleteDialogComponent,
    PolicyListComponent,
    PolicyRegistrationDialogComponent,
    PolicyUpdateDialogComponent,
    PolicyDeleteDialogComponent,
    PolicyDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    HttpClientModule,
    MatSnackBarModule,
    MatButtonModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [{
    provide: LOCALE_ID,
    useValue: 'pt-BR'
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
