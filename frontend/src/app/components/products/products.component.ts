import { UserService } from './../../services/user/user.service';
import { DataPassingService } from './../../services/dataPassing/data-passing.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// import book_products from '../scraped-json-products/result-books.json'
// import comp_products from '../scraped-json-products/result-comp-acs.json'
// import grocery_products from '../scraped-json-products/result-grofers.json'
// import shoes_products from '../scraped-json-products/result-shoes.json'

import { MyserviceService } from '../../services/myservice.service';
import { LoadingService } from './../../services/Loading/loading.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  encapsulation: ViewEncapsulation.None,
  standalone: false,
})
export class ProductsComponent implements OnInit {

  Products:any = [];
  cartProducts: any = [];
  title:String = "Products";
  category: any = 0;
  books : any = [];
  pshoes : any = [];
  pcomp : any = [];
  pgrocery : any = [];
  phot : any = [];
  username:String = '';

  constructor(private router: Router, private _myservice:MyserviceService, private UserService:UserService) {  }

  catFunc( i ) {
    this.category = i;
  }

  ngOnInit() {
    this._myservice.getProducts('books')
    .subscribe(
      data => { this.books = data; },
      error => { console.log("Error retrieving items p_books"); }
    );

    this._myservice.getProducts('shoes')
    .subscribe(
      data => { this.pshoes = data; },
      error => { console.log("Error retrieving items p_shoes"); }
    );

    this._myservice.getProducts('electronics')
    .subscribe(
      data => { this.pcomp = data; },
      error => { console.log("Error retrieving items p_comp"); }
    );

    this._myservice.getProducts('groceries')
    .subscribe(
      data => { this.pgrocery = data; },
      error => { console.log("Error retrieving items p_grocery"); }
    );

    this._myservice.getProducts('hot')
    .subscribe(
      data => { this.phot = data; },
      error => { console.log("Error retrieving items p_hot"); }
    );

    this.UserService.getUserData()
    .subscribe(
      data => { 
        this.username = data.first;
        this.cartProducts = data.cart;
       },
      error => { console.log("Error username"); }
    );


    // if(this.username != '') {
    //   this.cartProducts = JSON.parse(localStorage.getItem('cart'));
    // }
    
}

  // addToCart(index){

  //   // this.add_cart_db(id);

  //   let product = this.products[index];
  //   let cartData = [];
  //   let data = localStorage.getItem('cart');
  //   if(data !== null){
  //     cartData = JSON.parse(data);
  //   }
  //   cartData.push(product);
  //   this.updateCartData(cartData);
  //   localStorage.setItem('cart', JSON.stringify(cartData));
  //   this.products[index].isAdded = true;
  // }
  // updateCartData(cartData) {
  //   this.cartProducts = cartData;
  // }

      // for(let i in this.cartProducts){
      //   this.cartProducts[i]["qt"] = 1;
      //   this.bill = this.bill + this.cartProducts[i].price * this.cartProducts[i].qt;
      // }

  goToCart() {
    this.router.navigate(['/cart']);
    setTimeout(function(){
       location.reload();
       console.log("R1");
       setTimeout(function(){
          location.reload();
          console.log("R2");
       }, 1000);
    }, 1000);
  }

  goToLoginPage() {
    this.router.navigate(['/register-user']);
  }

  isLoggedIn() {
    if(localStorage.getItem('token') != null){
      return true;
    }
    else{
      return false;
    }
  }

  add_cart_db(id){
    console.log(id);
    this.cartProducts.push(id);
    this._myservice.updateUserCart(this.cartProducts)
      .subscribe(
          (data) => {
            console.log(data);
          },
          (error) => { console.log("FAILURE :(") },
      );
  }


}
