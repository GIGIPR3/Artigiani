import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoggedUserService } from '../service/logged-user.service';
import { ProductService } from '../service/product.service';
import { ReviewService } from '../service/review.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent {
  @Input() productData: any;

  descriptionForm: FormGroup;
  reviews: any[] = [];
  showReview: boolean = false;

  constructor(
    private router: Router,
    private productService: ProductService,
    private loggedUser: LoggedUserService,
    private formBuilder: FormBuilder,
    private reviewService: ReviewService
  ) {
    const userJson = JSON.parse(this.loggedUser.getUser());
    console.log(userJson);
    this.descriptionForm = this.formBuilder.group({
      userId: [userJson.userId],
      productId: [''],
      comment: [''],
      rating: [
        null,
        [
          Validators.required,
          Validators.pattern(/^[0-9]*$/),
          Validators.max(10),
        ],
      ],
    });
  }

  selectedImageIndex: number | null = null;

  showImage(index: number) {
    this.selectedImageIndex = index;
  }

  isRouterPageAdmin(): boolean {
    return this.router.url.includes('/admin');
  }

  onDelete(productId: string) {
    this.productService.deleteProduct(productId).subscribe();
    window.location.reload();
  }

  addDescription(productId: string) {
    console.log('entro in addDescription');

    this.descriptionForm.get('comment')!.value;
    const ratingString = this.descriptionForm.get('rating')!.value;
    const rating = parseInt(ratingString, 10);
    if (isNaN(rating) || rating < 0 || rating > 10) {
      console.error('Rating is not a valid integer between 0 and 10');
      return;
    }
    this.descriptionForm.get('productId')!.setValue(productId);
    console.log('Form Value:', this.descriptionForm.value);
    this.reviewService.postReview(this.descriptionForm.value).subscribe();
  }

  getReviews(productId: string) {
    this.showReview = !this.showReview;
    this.reviewService
      .getReviewsFromProduct(productId)
      .subscribe((reviews) => (this.reviews = reviews));
    console.log(this.reviews);
  }
}
