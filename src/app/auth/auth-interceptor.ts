import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService} from '../../shared/services/login.service'

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    constructor(private loginService: LoginService) {}
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const authToken = this.loginService.getToken();
        const authRequest = req.clone({
            headers: req.headers.set('authorization', "Bearer " + authToken)
        });
        return next.handle(authRequest);
    }
}