import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { LotCardComponent } from './shared/components/lot-card/lot-card.component';
import { CategoriesComponent } from './shared/components/categories/categories.component';
import { PaginationComponent } from './shared/components/pagination/pagination.component';
import { LotsListComponent } from './shared/components/lots-list/lots-list.component';
import { ImagePickerComponent } from './shared/components/image-picker/image-picker.component';

import { MainPageComponent } from './features/main-page/main-page.component';
import { CategoryPageComponent } from './features/category-page/category-page.component';
import { LoginComponent } from './features/login/login.component';
import { SignUpComponent } from './features/sign-up/sign-up.component';
import { AddLotComponent } from './features/add-lot/add-lot.component';
import { LotPageComponent } from './features/lot-page/lot-page.component';
import { UserBidsPageComponent } from './features/user-bids-page/user-bids-page.component';
import { UserLotsPageComponent } from './features/user-lots-page/user-lots-page.component';
import { SearchPageComponent } from './features/search-page/search-page.component';
import { SavedLotsPageComponent } from './features/saved-lots-page/saved-lots-page.component';
import { SaveLotComponent } from './shared/components/save-lot/save-lot.component';
import { FilterPanelComponent } from './shared/components/filter-panel/filter-panel.component';

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
    ImagePickerComponent,
    UserLotsPageComponent,
    SearchPageComponent,
    SavedLotsPageComponent,
    SaveLotComponent,
    FilterPanelComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatMenuModule,
    MatButtonModule,
    RouterModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
