import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError, pipe } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        console.log(request);

        // wrap in delayed observable to simulate server api call
        return of(null).pipe(mergeMap(() => {


          // authenticate
          if (request.url.endsWith('/users/authenticate') && request.method === 'POST') {

              const body = {
                  id: 1,
                  username: request.body.username,
                  firstName: request.body.firstName,
                  lastName: request.body.lastName,
                  token: 'fake-jwt-token',
                  role: request.body.role
              };

              return of(new HttpResponse({ status: 200, body: body }));
          }

          // create wish
          if (request.url.endsWith('/createWish') && request.method === 'POST') {

              const body = {
                  id: 0,
                  name: request.body.name,
                  price: request.body.price,
                  description: request.body.description,
                  wishUrl: request.body.wishUrl,
              };

              return of(new HttpResponse({ status: 200, body: body }));
          }


          // register user
          if (request.url.endsWith('/users/register') && request.method === 'POST') {

              return of(new HttpResponse({ status: 200 }));
          }
          // pass through any requests not handled above
          return next.handle(request);

        }))
        .pipe(materialize())
        .pipe(delay(500))
        .pipe(dematerialize());
    }
}

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};
