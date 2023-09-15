import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../service/cart.service';
import { LoggedUserService } from '../service/logged-user.service';
import { ProductService } from '../service/product.service';
import { ReviewService } from '../service/review.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {
  @Input() productData: any;
  @Output() deleteCartFromParent = new EventEmitter<string>();

  descriptionForm: FormGroup;
  reviews: any[] = [];
  showReview: boolean = false;
  productForm!: FormGroup;
  selectedImages: string[] = [];

  constructor(
    private router: Router,
    private productService: ProductService,
    private loggedUser: LoggedUserService,
    private formBuilder: FormBuilder,
    private reviewService: ReviewService,
    private cartService: CartService
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
  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      name: [this.productData.name, Validators.required],
      price: [this.productData.price, [Validators.required, Validators.min(0)]],
      images: this.formBuilder.array([]),
      description: [this.productData.description],
      productId: [''],
    });
  }

  selectedImageIndex: number | null = null;

  showImage(index: number) {
    this.selectedImageIndex = index;
  }

  isRouterPageAdmin(): boolean {
    return this.router.url.includes('/admin');
  }

  isRoutterPageCart(): boolean {
    return this.router.url.includes('/carrello');
  }

  onDelete(productId: string) {
    this.productService.deleteProduct(productId).subscribe(() => {
      window.location.reload();
    });
  }

  onDeleteFromCart(productId: string) {
    const productIndex = this.cartService.cart.indexOf(productId);

    this.cartService.cart.splice(productIndex, 1);
    console.log('delete product from cookies');

    this.cartService.updateCartCookies();
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

  addCart(product: any) {
    console.log(product);
    this.cartService.cart!.push(product);
    this.cartService.updateCartCookies();
  }

  parseLinkedCategoryId(
    linkedCategoryId: string
  ): { id: string; name: string }[] {
    const categoriesArray = linkedCategoryId.split(' name: ');

    return categoriesArray.map((categoryString) => {
      const [id, name] = categoryString.split(' id: ');
      return { id, name };
    });
  }
  parentDelete(value: string) {
    this.deleteCartFromParent.emit(value);
  }

  modaleVisibile = false;

  visualizzaModale() {
    this.modaleVisibile = !this.modaleVisibile;
  }

  @ViewChild('filePicker') filePicker!: ElementRef;
  selectedImage: string | null = null;

  onImagePicked(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    const files = fileInput.files;

    if (files) {
      const imagesArray = this.productForm.get('images') as FormArray;
      imagesArray.clear();

      this.selectedImages = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        const reader = new FileReader();
        reader.onload = (e: any) => {
          imagesArray.push(
            this.formBuilder.control(e.target.result.split(',')[1])
          );
          this.selectedImages.push(e.target.result);
        };

        reader.readAsDataURL(file);
      }
    } else {
      this.selectedImages = [];
      const imagesArray = this.productForm.get('images') as FormArray;
      imagesArray.clear();
    }
  }

  onSubmit(productId: string) {
    console.log(productId);
    this.productForm.get('productId')?.setValue(productId);
    this.productService.patchProduct(this.productForm.value).subscribe({
      next: (response) => {
        console.log('Product posted successfully', response);
        window.location.reload();
      },
      error: (error) => {
        console.error('Error posting product', error);
      },
    });
    console.log(this.productForm.value);
  }
}
