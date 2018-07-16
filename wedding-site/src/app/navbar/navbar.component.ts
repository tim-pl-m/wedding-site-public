import { Component, OnInit } from '@angular/core';
import { AuthService } from '../user/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  pageTitle = 'WeddingApp';

  constructor(private _authService: AuthService) { }

  ngOnInit() {
    this._authService.checkIfUserExists();
  }

  logout() {
    this._authService.logout();

  }

}
