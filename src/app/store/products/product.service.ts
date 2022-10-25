import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HandleTokenService } from 'src/app/shared/handle-token.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient,
    private handleToken: HandleTokenService,
  ) { }

  config = {
    headers: new HttpHeaders({'Authorization': 'Bearer '+this.handleToken.getToken()})
  }


  getDataList(): Observable<any>{
    var resposne$ = this.http.get<any>(environment.API_URL + 'api/products', this.config);
    return resposne$;
  }
  getData(id: number): Observable<any>{
    var resposne$ = this.http.get<any>(environment.API_URL + `api/products/${id}`, this.config);
    return resposne$;
  }
  deleteData(id: number): Observable<any>{
    var resposne$ = this.http.delete<any>(environment.API_URL + `api/products/${id}`, this.config);
    return resposne$;
  }
  addData(data: any): Observable<any>{
    var resposne$ = this.http.post<any>(environment.API_URL + 'api/products', data, this.config);
    return resposne$;
  }
  updateData(id: number, data:any): Observable<any>{
    var resposne$ = this.http.put<any>(environment.API_URL + `api/products/${id}`, data, this.config);
    return resposne$;
  }
}
