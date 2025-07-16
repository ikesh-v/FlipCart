import { UserService } from './../../services/user/user.service';
import { MyserviceService } from '../../services/myservice.service';
import { Component, OnDestroy, OnInit, Input } from "@angular/core";
import { Subscription } from 'rxjs';

import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: false,
})
export class HeaderComponent implements OnInit {

	username : string;
	loggedIn:boolean = false;
	listItems:any = [ {name: "Home", link: "#/home"}, {name: "Products", link: "#/products"}, {name: "About", link: "#/about"},
	{name: "Login", link: "#/register-user"}, {name: "Cart", link: "#/cart"} ];

  constructor(private myService: MyserviceService
	,private userService:UserService
    , private _router: Router) {

  }

  ngOnInit(): void {
	  console.log("before:"+this.username);
	  this.fetchData();
	  this.fetchData();
	  console.log("after:"+this.username);
  }

  	ngOnChanges(): void {
	  if(this.loggedIn) {
		  this.fetchData();
	  }
	}

	async fetchData(){
		await this.userService.isLoggedIn()
		.subscribe(
			(data) =>{	this.loggedIn = data; console.log("isloggedin:"+this.loggedIn); if(!data) return },
			(err) => { console.log("error checking logged in or not:"+err); return}
		)

		console.log("self value:"+this.loggedIn);
		if(this.loggedIn){
			console.log("startin gto get userr data:" + this.loggedIn);
			this.userService.getUserData()
			.subscribe(
				(data) =>{	console.log(data) ;this.username = data.first;console.log("setting name to :"+this.username);	},
				(err) => { console.log("err getting username in header:"+err) }

			);

			console.log("inside if login");
		}
	}
	

  @Input() deviceXs: boolean;


  logout() {
    localStorage.removeItem('token');
	localStorage.removeItem('cart');
	this.username = '';
	this.loggedIn = false;
	this._router.navigate(['/home'])
	.then( () => {location.reload();}
	);
  }


}
