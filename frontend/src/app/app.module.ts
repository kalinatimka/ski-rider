import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { LotCardComponent } from './shared/components/lot-card/lot-card.component';
import { CategoriesComponent } from './shared/components/categories/categories.component';
import { MainPageComponent } from './features/main-page/main-page.component';
import { CategoryPageComponent } from './features/category-page/category-page.component';
import { PaginationComponent } from './shared/components/pagination/pagination.component';
import { LoginComponent } from './features/login/login.component';
import { SignUpComponent } from './features/sign-up/sign-up.component';
import { AddLotComponent } from './features/add-lot/add-lot.component';
import { LotPageComponent } from './features/lot-page/lot-page.component';
import { LotsListComponent } from './shared/components/lots-list/lots-list.component';
import { UserBidsPageComponent } from './features/user-bids-page/user-bids-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LotCardComponent,
    CategoriesComponent,
    MainPageComponent,
    CategoryPageComponent,
    PaginationComponent,
    LoginComponent,
    SignUpComponent,
    AddLotComponent,
    LotPageComponent,
    LotsListComponent,
    UserBidsPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
