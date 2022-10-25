import { Component, OnInit, Inject } from '@angular/core';
import { faFilm } from '@fortawesome/free-solid-svg-icons';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { SOLUTIONLINKS } from '../../mock-solution-data';
import { Link } from '../../mock-solution-data';
import { CRUDdataService } from '../../shared/cruddata.service';
import { MainPageService } from './dashboard.service';
import { HeaderVisibility } from '../../shared/header-visibility.service';
import { Router } from '@angular/router';
import { HandleTokenService } from '../../shared/handle-token.service';
import { AddDialogComponent } from '../components/add-dialog/add-dialog.component';
import { DataDetailsComponent } from '../components/data-details/data-details.component';

export interface DialogData {
  name: string;
  solutionLink: string;
  price: string;
  isPublished: any;
  id: any;
}

@Component({
  selector: 'app-main-page',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  showFiller = false;
  filmIcon = faFilm;
  name?: string ;
  solutionLink?: string ;
  links = SOLUTIONLINKS;
  selectedLink?: Link;

  constructor(
    public dialog: MatDialog,
    private crudService: CRUDdataService , 
    private mainService: MainPageService,
    public headerVisibility: HeaderVisibility, 
    private router: Router,
    private handleToken: HandleTokenService) { }

  ngOnInit(): void {
    this.mainService.fetchDataList()
  }
  gotoFb(page: String){
    switch (page) {
      case 'facebook':
        window.location.href ='https://facebook.com';
          break;
      case 'twitter':
        window.location.href ='https://twitter.com';
          break;
      case 'instagram':
        window.location.href ='https://instagram.com';
          break;
      case 'tiktok':
        window.location.href ='https://tiktok.com';
          break;
      case 'telegram':
        window.location.href ='https://telegram.com';
          break;
      case 'linkedin':
        window.location.href ='https://linkedin.com';
          break;
      default:
          console.log("No url for this page!");
          break;
    }
  }
  openAddSolutionDialog(): void {
    const addSolutionDialogRef = this.dialog.open(AddDialogComponent, {
      width: '250px',
      data: {prob: this.name, sol: this.solutionLink},
    
    });
    addSolutionDialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
   openSolutionDetailsDialog(link:any){
     this.mainService.fetchData(link).subscribe((response: { id: any; name: any; image_link: any; })=>{
      console.log(response)
      this.mainService.dataID = response.id
      const detailDialogRef = this.dialog.open(DataDetailsComponent, {
        data: { name: response.name, solutionLink: response.image_link},
      });
       detailDialogRef.afterClosed().subscribe((result) => {
        console.log('The dialog was closed');
      });
    });
  }

  onUpdate(data:any){
    return this.crudService.updateData(data.id, data).subscribe((response)=>{
      console.log(response)
      this.mainService.fetchDataList()
      
    });
  }

  onLogout(){
    this.handleToken.signOut();
    this.headerVisibility.setShow(!this.handleToken.userLoggedIn);
    this.router.navigate(['/login']);
  }

  
}


