import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import{ HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { ProjectsPageComponent } from './projects-page/projects-page.component';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { WebappLayoutComponent } from './shared/layouts/webapp-layout/webapp-layout.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { AuthGuard } from './shared/classes/authGuard';
import { TokenInterceptor } from './shared/classes/token.interceptor';
import { MapPageComponent } from './webapp/map-page/map-page.component';
import { ProfilePageComponent } from './profile/profile-page/profile-page.component';
import { ComplexPageComponent } from './projects-page/complex-page/complex-page.component';
import { WebappDescriptionPageComponent } from './projects-page/webapp-description-page/webapp-description-page.component';

const appRoutes: Routes = [
  {path: '', component: AuthLayoutComponent, children:[
    {path: '', component: HomePageComponent},
    {path: 'about', component: AboutPageComponent},
    {path: 'projects', component: ProjectsPageComponent},
    {path: 'login', component: AuthPageComponent},
    {path: 'register', component: RegisterPageComponent},
    {path: 'profile', canActivate: [AuthGuard], component: ProfilePageComponent},
  ]},
  {path: '', component: WebappLayoutComponent, canActivate: [AuthGuard], children:[
    
  ]}
]

@NgModule({
  declarations: [
    AppComponent,
    AuthLayoutComponent,
    HomePageComponent,
    AboutPageComponent,
    ProjectsPageComponent,
    AuthPageComponent,
    RegisterPageComponent,
    MapPageComponent,
    ProfilePageComponent,
    ComplexPageComponent,
    WebappDescriptionPageComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
