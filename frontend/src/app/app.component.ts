import { MyserviceService } from './services/myservice.service';
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { async } from 'rxjs/internal/scheduler/async';

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.css"],
  standalone: false,
})
export class AppComponent implements OnInit, OnDestroy {


  username : string = '';
  userdata : any ;
  mediaSub:Subscription;
  deviceXs:boolean;
	title = "FlipCart";
	url = "";
  listItems: any;


  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userdata');
    localStorage.removeItem('cart');
    this._router.navigate(['/home']);
    this.username = '';
  }

  async getUser() {
    if(localStorage.getItem('token') != null ) {
     await this.myService.getUserData()
      .subscribe(
        data =>{
          this.username = data['first'].toString();
          this.userdata = data;
          // localStorage.setItem('userdata', JSON.stringify(data));
          localStorage.setItem('cart', JSON.stringify(data["cart"]));
          console.log(this.username);
          console.log(this.userdata);
       },
        error => { console.log("Error getting the username !"); }
      );
    }
  }

  constructor(private myService: MyserviceService
    , private _router: Router
    ) {

    this.getUser();

		this.listItems = [
			{
				name: "Home",
				link: "home"
			},
			{
				name: "Products",
				link: "products"
      },
			{
				name: "About",
				link: "about"
      },
      {
				name: "Login",
				link: "register-user"
      },
      {
				name: "Cart",
				link: "cart"
			},
		];
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

	add(title, url) {
		if (title !== "" && url !== "") {
			url = "http://" + url;
			this.listItems.push({
				name: title,
				link: url,
				isNew: true
			});
			this.title = "";
			this.url = "";
		}
	}
}
