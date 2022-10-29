import { Component, Input, OnInit } from '@angular/core';
// import { HeaderVisibility } from './shared/header-visibility.service';
import { RouterModule,Routes, Router }from '@angular/router'; 
import { HandleTokenService } from './shared/handle-token.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private router: Router,
    private handleToken: HandleTokenService) { }

  ngOnInit() {
  }

 

  onLogout(){
    this.handleToken.signOut();
    this.router.navigate(['/login']);
  }
  title = 'routing_app';
}
