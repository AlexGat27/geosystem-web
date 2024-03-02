import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule, Routes } from "@angular/router";
import { LoginPageComponent } from './components/login-page/login-page.component';

const routes: Routes = [
    {path: 'login', component: LoginPageComponent},
    
]

@NgModule({
    declarations: [
    LoginPageComponent
  ],
    imports: [
        CommonModule,
        HttpClientModule,
        RouterModule.forChild(routes)
    ],
    providers: [
        
    ]
})
export class AdminModule {}