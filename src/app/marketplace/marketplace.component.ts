import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../service/category.service';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-marketplace',
  templateUrl: './marketplace.component.html',
  styleUrls: ['./marketplace.component.css'],
})
export class MarketplaceComponent implements OnInit {
  constructor(
    private categoryService: CategoryService,
    private productService: ProductService
  ) {}

  categories: any[] = [];
  allProducts: any[] = [];
  categoryProducts: any[] = [];
  clicked: boolean = false;

  ngOnInit(): void {
    this.productService
      .getAllProducts()
      .subscribe((prods) => (this.allProducts = prods));
    this.categoryService
      .getCategories()
      .subscribe((categ) => (this.categories = categ));
  }

  clickedCategory(category: any) {
    this.clicked = !this.clicked;
    this.categoryProducts = category.products;
    console.log(category);
    console.log('cat-prod', this.categoryProducts);
  }
}
