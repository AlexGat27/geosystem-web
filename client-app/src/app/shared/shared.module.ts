import { NgModule } from "@angular/core";
import { AuthLayoutComponent } from "./layouts/auth-layout/auth-layout.component";
import { WebappLayoutComponent } from "./layouts/webapp-layout/webapp-layout.component";
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from "@angular/common";
import { AuthGuard } from "../core/guards/authGuard";
import { AuthFizGuard } from "../core/guards/authFizGuard";

const routes: Routes = [
    {  
        path: 'webapp', 
        component: WebappLayoutComponent,
        canActivate: [AuthGuard, AuthFizGuard],
        loadChildren: () => import("../modules/webapp/webapp.module").then(m => m.WebAppModule)
    },
    {
        path: '', 
        component: AuthLayoutComponent,
        loadChildren: () => import("../modules/website/website.module").then(m => m.WebSiteModule)
    }
]

@NgModule({
    declarations: [
        AuthLayoutComponent,
        WebappLayoutComponent
    ],
    imports: [ 
        CommonModule,
        RouterModule.forChild(routes)
    ],
    providers: []
})
export class SharedModule {}