import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProductsComponent } from './products/products.component';
import { UserCabComponent } from './user-cab/user-cab.component';
import { AuthComponent } from './auth/auth.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'projects', component: ProjectsComponent},
  {path: 'user', component: UserCabComponent},
  {path: 'auth', component: AuthComponent}
] 

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ProjectsComponent,
    ProductsComponent,
    UserCabComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
