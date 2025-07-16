import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
  providers: [NgbCarouselConfig],
  standalone: false,
})
export class SliderComponent implements OnInit, OnDestroy {

  deviceXs:boolean;

  constructor(config: NgbCarouselConfig, private router: Router) {
    config.interval = 3500;
    config.wrap = true;
    config.keyboard = true;
    config.pauseOnHover = false;
   }

  ngOnInit(): void {
    console.log(this.deviceXs);
  }

  ngOnDestroy() {
  }

  viewProducts() {
    this.router.navigate(['/products']);
  }

}
