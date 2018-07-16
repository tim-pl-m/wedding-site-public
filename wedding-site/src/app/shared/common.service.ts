import { Injectable } from '@angular/core';
import { throwError } from '../../../node_modules/rxjs/internal/observable/throwError';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  handleError(err) {

    let errorMessage = '';
    if (err.error instanceof Error) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
