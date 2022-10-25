import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderVisibility {
  constructor() { }
  show:boolean = false;

  setShow(isShow: boolean){
    this.show = !isShow;
  }
  getShow(){
    return this.show;
  }
}
