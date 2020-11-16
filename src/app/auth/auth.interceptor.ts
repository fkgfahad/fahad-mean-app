import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable, Observer } from 'rxjs';

export class AuthInterceptor implements HttpInterceptor {
  clonedRequest: HttpRequest<any>;
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.getToken().subscribe((token: string) => {
      this.clonedRequest = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + token)
      });
    });
    return next.handle(this.clonedRequest);
  }

  private getToken(): Observable<string> {
    return Observable.create((observer: Observer<string>) => {
      const localToken = localStorage.getItem('$.auth');
      if (localToken) {
        observer.next(localToken);
      } else {
        observer.next(null);
      }
      observer.complete();
    });
  }
}
