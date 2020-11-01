import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SelectItem} from 'primeng/api';
import {Observable} from 'rxjs';
import {first} from 'rxjs/operators';
import {KindOfRequestDtoType} from './types/KindOfRequestDto.type';
import {CustomerRequestResponseType} from './types/CustomerRequestResponse.type';
import {CustomerRequest} from './types/CustomerRequest.type';

@Injectable({
  providedIn: 'root'
})

export class AppRestService {

  static CURRENT_SERVER_NAME = 'http://localhost:8081/';
  static ENDPOINT_GET_MENU_ITEMS = 'getMenuItems';
  static ENDPOINT_INSERT_REQUEST = 'insertCustomerRequest';



  constructor(readonly httpClient: HttpClient) {
  }


  public getMenuItems(): Observable<any> {
    return this.httpClient.get(AppRestService.CURRENT_SERVER_NAME + AppRestService.ENDPOINT_GET_MENU_ITEMS);
  }

  public postRequest(request: CustomerRequest): Observable<any> {
    return this.httpClient.post(AppRestService.CURRENT_SERVER_NAME + AppRestService.ENDPOINT_INSERT_REQUEST, request);
  }
}
