import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent {
  @Input() productData: any;

  constructor(private router: Router, private productService: ProductService) {}

  selectedImageIndex: number | null = null;

  showImage(index: number) {
    this.selectedImageIndex = index;
  }

  isRouterPageAdmin(): boolean {
    return this.router.url.includes('/admin');
  }

  onDelete(productId: string) {
    this.productService.deleteProduct(productId).subscribe();
  }
}
