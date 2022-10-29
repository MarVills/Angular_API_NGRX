import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HandleTokenService } from './handle-token.service';

@Injectable({
  providedIn: 'root'
})
export class CRUDdataService {
  constructor(
    private http: HttpClient,
    private handleToken: HandleTokenService,
    ) { }
  config = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer '+this.handleToken.getToken(),
      
    })
  }
  
  getData(id: number): Observable<any>{
    var resposne$ = this.http.get<any>(environment.API_URL + `api/products/${id}`, this.config);
    return resposne$;
  }

}
