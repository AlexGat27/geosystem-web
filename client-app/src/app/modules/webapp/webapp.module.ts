import { NgModule } from "@angular/core";
import { MapPageComponent } from "./map-page/map-page.component";
import { ProcessMediaPageComponent } from "./process-media-page/process-media-page.component";
import { CameraService } from "./services/camera.service";
import { RouterModule, Routes } from "@angular/router";
import { HomeappComponent } from "./home-page/homeapp.component";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";

const routes: Routes = [
    {path: 'home-app', component: HomeappComponent},
    {path: 'map-page', component: MapPageComponent},
    {path: 'process-media-page', component: ProcessMediaPageComponent}
]

@NgModule({
    declarations: [
        HomeappComponent,
        MapPageComponent,
        ProcessMediaPageComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        HttpClientModule
    ],
    providers: [
        CameraService
    ]
})
export class WebAppModule {}