import { NgModule } from "@angular/core";
import { HomePageComponent } from "./components/home-page/home-page.component";
import { RegisterPageComponent } from "./components/register-page/register-page.component";
import { ProfilePageComponent } from "./components/profile-page/profile-main-page/profile-page.component";
import { AuthPageComponent } from "./components/auth-page/auth-page.component";
import { ComplexPageComponent } from "./components/projects-page/complex-page/complex-page.component";
import { WebappDescriptionPageComponent } from "./components/projects-page/webapp-desc-page/webapp-description-page.component";
import { AboutPageComponent } from "./components/about-page/about-page.component";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "src/app/core/guards/authGuard";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { PrivacyPageComponent } from './components/privacy-page/privacy-page.component';
import { FooterComponent } from './components/footer/footer.component';
import {FizikFormComponent} from "./components/register-page/fizik-form/fizik-form.component";
import {EnterpriseFormComponent} from "./components/register-page/enterprise-form/enterprise-form.component";

const routes: Routes = [
    {path: '', component: HomePageComponent},
    {path: 'about', component: AboutPageComponent},
    {path: 'projects/complex', component: ComplexPageComponent},
    {path: 'projects/webapp', component: WebappDescriptionPageComponent},
    {path: 'login', component: AuthPageComponent},
    {path: 'register', component: RegisterPageComponent},
    {path: 'profile', canActivate: [AuthGuard], component: ProfilePageComponent},
    {path: 'privacy', component: PrivacyPageComponent}
]

@NgModule({
    declarations: [
        HomePageComponent,
        RegisterPageComponent,
        ProfilePageComponent,
        AuthPageComponent,
        ComplexPageComponent,
        WebappDescriptionPageComponent,
        AboutPageComponent,
        PrivacyPageComponent,
        FooterComponent,
        FizikFormComponent, EnterpriseFormComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule.forChild(routes),
    ],
    providers: []
})
export class WebSiteModule {}
