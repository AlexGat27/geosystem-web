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
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { AuthAdminGuard } from "src/app/core/guards/authAdminGuard";
import { AdminDatabasePageComponent } from './components/admin-database-page/admin-database-page.component';
import { AdminStatisticsPageComponent } from './components/admin-statistics-page/admin-statistics-page.component';
import { AdminTablesPageComponent } from './components/admin-tables-page/admin-tables-page.component';
import { AdminMediaprocessPageComponent } from './components/admin-mediaprocess-page/admin-mediaprocess-page.component';

const routes: Routes = [
    {path: 'login', component: LoginPageComponent},
    {path: 'home', canActivate:[AuthAdminGuard],component: AdminHomePageComponent},
    {path: 'database', canActivate:[AuthAdminGuard],component: AdminDatabasePageComponent},
    {path: 'mediaProcessing', canActivate:[AuthAdminGuard],component: AdminMediaprocessPageComponent},
    {path: 'generateTables', canActivate:[AuthAdminGuard],component: AdminTablesPageComponent},
    {path: 'statistics', canActivate:[AuthAdminGuard],component: AdminStatisticsPageComponent}
]

@NgModule({
    declarations: [
        LoginPageComponent,
        AdminHomePageComponent,
        AdminDatabasePageComponent,
        AdminStatisticsPageComponent,
        AdminTablesPageComponent,
        AdminMediaprocessPageComponent
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
    ]
})
export class AdminModule {}