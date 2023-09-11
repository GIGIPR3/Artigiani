import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent {
  @Input() productData: any;

  selectedImageIndex: number | null = null;

  showImage(index: number) {
    this.selectedImageIndex = index;
  }
}
