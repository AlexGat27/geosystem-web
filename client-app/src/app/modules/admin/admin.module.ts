import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule, Routes } from "@angular/router";
import { LoginPageComponent } from './components/login-page/login-page.component';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field'
import {MatButtonModule} from '@angular/material/button';
import { MatInputModule } from "@angular/material/input";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AdminHomePageComponent } from "./components/admin-home-page/admin-home-page.component";
import { provideAnimations } from '@angular/platform-browser/animations';
import { AuthAdminGuard } from "src/app/core/guards/authAdminGuard";

const routes: Routes = [
    {path: 'login', component: LoginPageComponent},
    {path: 'home', canActivate:[AuthAdminGuard],component: AdminHomePageComponent}
]

@NgModule({
    declarations: [
        LoginPageComponent,
        AdminHomePageComponent
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule, 
        MatInputModule,
        MatButtonModule,
        RouterModule.forChild(routes)
    ],
    providers: [
        {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}},
        provideAnimations()
    ]
})
export class AdminModule {}