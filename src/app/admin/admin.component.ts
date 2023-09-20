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
  selectedImages: string[] = [];

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
      .get<string[]>(
        'http://ec2-54-216-114-29.eu-west-1.compute.amazonaws.com:8081/api/categories'
      )
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

  onSubmit() {
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

  // onImagePicked(event: Event) {
  //   const fileInput = event.target as HTMLInputElement;
  //   const files = fileInput.files;

  //   if (files) {
  //     const imagesArray = this.productForm.get('images') as FormArray;
  //     imagesArray.clear();

  //     this.selectedImages = [];

  //     for (let i = 0; i < files.length; i++) {
  //       const file = files[i];

  //       const reader = new FileReader();
  //       reader.onload = (e: any) => {
  //         console.log(e.target.result.split(',')[1]);

  //         imagesArray.push(
  //           this.formBuilder.control(e.target.result.split(',')[1])
  //         );
  //         this.selectedImages.push(e.target.result);
  //       };

  //       reader.readAsDataURL(file);
  //     }
  //   } else {
  //     this.selectedImages = [];
  //     const imagesArray = this.productForm.get('images') as FormArray;
  //     imagesArray.clear();
  //   }
  // }

  async onImagePicked(event: Event, maxWidth: number, maxHeight: number) {
    const fileInput = event.target as HTMLInputElement;
    const files = fileInput.files;

    if (files) {
      const imagesArray = this.productForm.get('images') as FormArray;
      imagesArray.clear();

      this.selectedImages = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        const resizedImage = await this.resizeImage(file, maxWidth, maxHeight);

        imagesArray.push(this.formBuilder.control(resizedImage.split(',')[1]));
        this.selectedImages.push(resizedImage);
      }
    } else {
      this.selectedImages = [];
      const imagesArray = this.productForm.get('images') as FormArray;
      imagesArray.clear();
    }
  }

  async resizeImage(
    file: File,
    maxWidth: number,
    maxHeight: number
  ): Promise<string> {
    return new Promise<string>((resolve) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        let newWidth = img.width;
        let newHeight = img.height;

        if (img.width > maxWidth) {
          newWidth = maxWidth;
          newHeight = (img.height * maxWidth) / img.width;
        }

        if (newHeight > maxHeight) {
          newHeight = maxHeight;
          newWidth = (img.width * maxHeight) / img.height;
        }

        canvas.width = newWidth;
        canvas.height = newHeight;

        ctx!.drawImage(img, 0, 0, newWidth, newHeight);

        const resizedImageData = canvas.toDataURL();

        resolve(resizedImageData);
      };
    });
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
          console.log(this.productForm);

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
