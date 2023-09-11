import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../service/category.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css'],
})
export class CreateCategoryComponent {
  categoryForm: FormGroup;

  constructor(
    private categoryService: CategoryService,
    private formBuilder: FormBuilder
  ) {
    // Initialize the form in the constructor
    this.categoryForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.categoryForm.valid) {
      this.categoryService.postCategory(this.categoryForm.value).subscribe(
        (response) => {
          console.log('Category posted successfully', response);
        },
        (error) => {
          console.error('Error posting category', error);
        }
      );
    }
  }
}
