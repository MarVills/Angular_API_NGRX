import { Injectable } from '@angular/core';
import { SOLUTIONLINKS } from '../../mock-solution-data';
import { CRUDdataService } from '../../shared/cruddata.service';

@Injectable({
  providedIn: 'root'
})
export class MainPageService {

  dataID: any;
  links = SOLUTIONLINKS;

  constructor(private crudService: CRUDdataService) { }
  postData(data: any){
    return this.crudService.addData(data)
  }

  fetchData(data: any){
    return this.crudService.getData(data.id)
  }

  fetchDataList(){
    this.links.splice(0);
    return this.crudService.getDataList().subscribe((response)=>{
      console.log(response.data)
      for (var  data of response.data) {
        this.links.push(data)
         console.log(data)
      }
    })
  }

  updateData(data: any){
    return this.crudService.updateData(this.dataID, data)
  }

  deleteData(){
    return this.crudService.deleteData(this.dataID)
  }
}
