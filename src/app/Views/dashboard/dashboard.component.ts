import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { faFilm } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { CRUDdataService } from '../../shared/cruddata.service';
import { Router } from '@angular/router';
import { HandleTokenService } from '../../shared/handle-token.service';
import { AddDialogComponent } from '../components/add-dialog/add-dialog.component';
import { DataDetailsComponent } from '../components/data-details/data-details.component';
import { Store } from '@ngrx/store';
import { debounceTime, Observable } from 'rxjs';
import { ProductService } from 'src/app/store/products/product.service';
import { MatTableDataSource } from '@angular/material/table';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatPaginator } from '@angular/material/paginator';
import { Product, PRODUCT_LIST } from 'src/app/store/products.state';


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
  links = PRODUCT_LIST;
  products$: any = Observable;
  pages = this.productService.pages;
 
  displayedColumns = ['id', 'name', 'image', 'actions'];
  dataSource = new MatTableDataSource<Product>(PRODUCT_LIST);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);


  constructor(
    public dialog: MatDialog,
    private crudService: CRUDdataService , 
    private router: Router,
    private handleToken: HandleTokenService,
    private store: Store,
    private productService: ProductService,
    private breakpointObserver: BreakpointObserver) {
      breakpointObserver.observe(['(max-width: 600px)']).subscribe(result => {
        this.displayedColumns = result.matches ?
            ['id', 'name', 'image', 'actions'] :
            ['id', 'name', 'image', 'actions'];
        });
     }
     
  // @Input()
  // hidePageSize!: boolean;

  ngOnInit(): void {
    this.productService.fetchDataList()
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
      this.refresh()
    });
  }

  editProduct(data:any){
    this.productService.dataID = data.id;
    this.productService.fetchData()
     .subscribe(
      (response: { id: any; name: any; image_link: any; })=>{
      this.productService.dataID = response.id;
      const detailDialogRef = this.dialog.open(DataDetailsComponent, {
        data: { name: response.name, solutionLink: response.image_link},
      });
       detailDialogRef.afterClosed().subscribe(() => {
        this.refresh();
      });
    });
  }

  async onDelete(data:any){
    await (this.productService.dataID = data.id);
    await this.productService.deleteData();
    console.log("====after delete")
    this.refresh();
  }

  onLogout(){
    this.handleToken.signOut();
    this.router.navigate(['/login']);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  previous(){
    console.log("previous")
    this.productService.fetchDataList("previous")
  }

   next(){
    console.log("next")
    this.productService.fetchDataList("next")
    debounceTime(1000)
    this.ngAfterViewInit();
  }

  getPage(page: number){
    console.log("page number",page)
    this.productService.fetchDataList("",page)
  }

  refresh(){
    this.dataSource = new MatTableDataSource<Product>(PRODUCT_LIST);
  }

}


