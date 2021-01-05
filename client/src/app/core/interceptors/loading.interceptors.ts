import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay, finalize } from 'rxjs/operators';
import { BusyService } from '../services/busy.service';

// Não esquecer de incluir "Injectable"
@Injectable()
export class LoadingInterceptor implements HttpInterceptor
{
    constructor(private busyService: BusyService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
    {
        this.busyService.busy();
        return next.handle(req).pipe(
            delay(500),
            finalize(() => {
                this.busyService.idle();
            }
        ));
    }
}
