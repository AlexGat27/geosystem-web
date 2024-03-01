import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { TokenInterceptor } from "./interceptors/token.interceptor";
import { AuthService } from "./services/auth.service";
import { MapService } from "./services/map.service";
import { PotholeService } from "./services/pothole.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
    declarations: [],
    imports: [],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            multi: true,
            useClass: TokenInterceptor
        },
        AuthService,
        MapService,
        PotholeService
    ]
})
export class CoreModule {}