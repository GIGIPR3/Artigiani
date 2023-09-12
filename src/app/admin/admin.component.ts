import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
/* import { ServizioService } from '../service/servizio.service'; */
import { HttpClient } from '@angular/common/http';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { User } from '../interfaces/user';
import { LoggedUserService } from '../service/logged-user.service';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  user: User | null = this.loggedUser.user;
  categories: any[] = [];
  file: File | null = null;
  reader = new FileReader();
  products: any[] = [];

  constructor(
    private loggedUser: LoggedUserService,
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private http: HttpClient
  ) {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(0)]],
      categoryId: new FormArray([]),
      images: this.formBuilder.array([]),
      description: [''],
      userId: [''],
    });
    this.http
      .get<string[]>('http://localhost:5000/api/categories')
      .subscribe((data) => {
        console.log('data:', data);
        this.categories = data;
      });
  }

  ngOnInit(): void {
    const userJson = this.loggedUser.getUser();
    console.log(userJson);

    if (userJson) {
      this.user = JSON.parse(userJson);
    } else {
      console.log('User data not found in cookies');
    }

    if (userJson) {
      this.productService.getProductsByUserId(this.user!.userId).subscribe({
        next: (response) => {
          this.products = response;
          console.log('Products by user:', this.products);
        },
        error: (error) => {
          console.error('Error retrieving products by user:', error);
        },
      });
    } else {
      console.log('User data not found in cookies');
    }
  }

  productForm!: FormGroup;

  submitted = false;

  onSubmit() {
    this.submitted = true;
    if (this.productForm.invalid) {
      return;
    }
    this.productForm.get('userId')?.setValue(this.user?.userId);
    this.productService.postProduct(this.productForm.value).subscribe({
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

  @ViewChild('filePicker') filePicker!: ElementRef;
  selectedImage: string | null = null;

  onImagePicked(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const imagesArray = this.productForm.get('images') as FormArray;
        imagesArray.clear();
        imagesArray.push(
          this.formBuilder.control(e.target.result.split(',')[1])
        );
        this.selectedImage = e.target.result;
      };

      reader.readAsDataURL(file);
    } else {
      this.selectedImage = null;
      const imagesArray = this.productForm.get('images') as FormArray;
      imagesArray.clear();
    }
  }

  onCheckChange(event: any) {
    const formArray: FormArray = this.productForm.get(
      'categoryId'
    ) as FormArray;
    if (event.target.checked) {
      formArray.push(new FormControl(event.target.value));
    } else {
      let i: number = 0;
      formArray.controls.forEach((ctrl: any) => {
        console.log(ctrl);

        if (ctrl.value == event.target.value) {
          const imagesArray = this.productForm.get('categoryId') as FormArray;
          imagesArray.push(this.formBuilder.control(event.target.value));
          console.log(event.target.value);
          formArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  modaleVisibile = false;

  visualizzaModale() {
    this.modaleVisibile = !this.modaleVisibile;
  }
}
