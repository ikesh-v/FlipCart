import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
declare var jQuery: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: false,
})
export class HomeComponent implements OnInit {

  //constructor() { }
  constructor(private router: Router) { }

  ngOnInit() {
    jQuery('.carousel').carousel({
      interval: 2000
    });
    console.log(this.deviceXs);
  }

  @Input() deviceXs: boolean;

  viewProducts() {
    this.router.navigate(['/products']);
  }

}
