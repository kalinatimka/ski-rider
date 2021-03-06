import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/helpers/auth.guard';
import { AddLotComponent } from './features/add-lot/add-lot.component';
import { CategoryPageComponent } from './features/category-page/category-page.component';
import { LoginComponent } from './features/login/login.component';
import { LotPageComponent } from './features/lot-page/lot-page.component';
import { MainPageComponent } from './features/main-page/main-page.component';
import { SavedLotsPageComponent } from './features/saved-lots-page/saved-lots-page.component';
import { SearchPageComponent } from './features/search-page/search-page.component';
import { SignUpComponent } from './features/sign-up/sign-up.component';
import { UserBidsPageComponent } from './features/user-bids-page/user-bids-page.component';
import { UserLotsPageComponent } from './features/user-lots-page/user-lots-page.component';

const routes: Routes = [
  { path: 'category', component: CategoryPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'lot', component: LotPageComponent },
  { path: 'search', component: SearchPageComponent },
  { path: 'saved-lots', component: SavedLotsPageComponent, canActivate: [AuthGuard] },
  { path: 'my-lots', component: UserLotsPageComponent, canActivate: [AuthGuard] },
  { path: 'my-bids', component: UserBidsPageComponent, canActivate: [AuthGuard] },
  { path: 'add-lot', component: AddLotComponent, canActivate: [AuthGuard] },
  { path: '', component: MainPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    {
      scrollPositionRestoration: 'enabled',
    }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
