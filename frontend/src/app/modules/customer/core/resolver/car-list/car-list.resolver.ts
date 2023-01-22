import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {EMPTY, Observable, of} from 'rxjs';
import {ICar} from "../../../../shared/core/models/schemas/cars.schema";

@Injectable({
  providedIn: 'root'
})
export class CarListResolver implements Resolve<ICar[]> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICar[]> {
    return EMPTY;
  }
}
