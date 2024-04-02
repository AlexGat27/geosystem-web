import { NgModule } from "@angular/core";
import { MapPageComponent } from "./map-page/map-page.component";
import { ProcessMediaPageComponent } from "./process-media-page/process-media-page.component";
import { CameraService } from "./services/camera.service";
import { RouterModule, Routes } from "@angular/router";
import { HomeappComponent } from "./home-page/homeapp.component";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { MobileGuard } from "src/app/core/guards/mobileGuard";

const routes: Routes = [
    {path: 'home-app', component: HomeappComponent},
    {path: 'map-page', component: MapPageComponent},
    {path: 'process-media-page', canActivate:[MobileGuard],component: ProcessMediaPageComponent}
]

@NgModule({
    declarations: [
        HomeappComponent,
        MapPageComponent,
        ProcessMediaPageComponent
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        RouterModule.forChild(routes),
    ],
    providers: [
        CameraService
    ]
})
export class WebAppModule {}