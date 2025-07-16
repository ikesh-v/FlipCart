import { Component, OnInit, Input } from '@angular/core';
import { MyserviceService } from '../../services/myservice.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  standalone: false,
})
export class CartComponent implements OnInit {
  cartProducts: any =[];
  bill: any = 0;
  actual_product : any = [];

  // @Input() cartProducts: any;
  @Input() username: any;

  constructor( private myService: MyserviceService ) { }

  ngOnInit() {
    this.initiateData();
  }

  initiateData() {

    this.actual_product = [];
    this.bill = 0;
    console.log("username:", this.username);
    let data = JSON.parse(localStorage.getItem('cart'));
    if( data !== null){
      this.cartProducts = data;
      console.log(this.cartProducts);

      for(let id in this.cartProducts){
        console.log(this.cartProducts[id]);
        this.myService.getProductsById(this.cartProducts[id])
        .subscribe(
          data =>{
            console.log(data[0]);
            data[0]["qt"] = 1;
            this.actual_product.push(data[0]);
            this.updateTotal();
            console.log("inisde for inside if");
            // this.bill = this.bill + data[0].price * data[0].qt;
          },
          error => { console.log("Error getting the PRODUCTS !"); }
        );
        console.log("somewhere");
      }

      this.updateTotal();
      console.log("Outside for inside if");

      // for(let i in this.cartProducts){
      //   this.cartProducts[i]["qt"] = 1;
      //   this.bill = this.bill + this.cartProducts[i].price * this.cartProducts[i].qt;
      // }
    }
  }

  updateTotal() {
    this.bill = 0;
    console.log("called update totalfunction");
    for(let i in this.actual_product){
      this.bill = this.bill + this.actual_product[i].price * this.actual_product[i].qt;
    }
  }

  removeItem(delete_id) {
    // this.actual_product.splice(id, 1);

    // if(this.actual_product.length){
    //   localStorage.setItem('cart', JSON.stringify(this.actual_product));
    // } else {
    //   localStorage.removeItem('cart');
    // }
    if(this.cartProducts.indexOf(delete_id) != -1){
      this.cartProducts.splice( this.cartProducts.indexOf(delete_id) , 1);

      localStorage.setItem('cart', JSON.stringify(this.cartProducts));
      this.initiateData();
      this.myService.updateUserCart(this.cartProducts)
        .subscribe(
            (data) => {
              console.log(data);
            },
            (error) => { console.log("FAILURE :(") },
        );
    }
    else {
      console.log("ID doesn't exist in cart products :", delete_id);
      return;
    }
  }



  payBill() {
    if(this.actual_product.length){

      // this.cartProducts.splice( this.cartProducts.indexOf(delete_id) , 1);

      // localStorage.setItem('cart', JSON.stringify(this.cartProducts));
      // this.initiateData();


      localStorage.removeItem('cart');

      // this.initiateData();
      alert("Your bill is: " + this.bill);
      this.cartProducts =[];
      this.bill = 0;
      this.actual_product = [];

      this.myService.updateUserCart([])
      .subscribe(
          (data) => {
            console.log(data);
          },
          (error) => { console.log("FAILURE :(") },
      );

    } else {
      alert("No items in cart");
    }
  }
}
