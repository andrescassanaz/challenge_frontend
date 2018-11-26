import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpErrorResponse, HttpHeaders, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

import 'rxjs/Rx';

/*  
    se encarga de insertar el token del usuario para el request y ademas
    saca del header del response el token actualizado que viene en cada 
    response y se lo actualiza al usuario.
 */
@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(public auth: AuthService) {
        console.log("TokenInterceptor");
     }
   
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.auth.getToken()) {
            console.log("INTERCEPTOR 1");
            console.log("TOKEN: " + this.auth.getToken());
            request = request.clone({
                setHeaders: {
                    Authorization: this.auth.getToken()
                }
            });
        }
        return next.handle(request).map((event: HttpEvent<any>) => {
            /* intercepto todos los response que no sean del login */
            console.log("INTERCEPTOR 2 ");
            if (event instanceof HttpResponse && event.url.indexOf('login') < 0) {
                console.log("INCERCEPTADO 3");
                let resp = event as HttpResponse<Response>;
                const headers: HttpHeaders = resp.headers;
                this.auth.refreshToken(headers);
            }
            return event;
        });
    }
}