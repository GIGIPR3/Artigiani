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
  clickCategory: number = 0;
  clicked: boolean = false;
  categoryName: string = '';

  ngOnInit(): void {
    this.productService
      .getAllProducts()
      .subscribe((prods) => (this.allProducts = prods));
    this.categoryService
      .getCategories()
      .subscribe((categ) => (this.categories = categ));
  }

  clickedCategory(category: any, iter: number) {
    if (this.clickCategory === iter) {
      this.clicked = false;
      this.clickCategory = -1;
    } else {
      this.clicked = true;
      this.categoryProducts = category.products;
      this.categoryName = category.name;
      this.clickCategory = iter;
    }
  }

  renderByName(name: string) {
    if (name.length > 0) {
      this.productService
        .getProductbyName(name)
        .subscribe((product) => (this.allProducts = product));
    } else {
      this.productService
        .getAllProducts()
        .subscribe((prods) => (this.allProducts = prods));
    }
  }
}
