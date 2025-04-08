import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrl: './add-new-product.component.scss'
})
export class AddNewProductComponent {
  selectedFile: any;
  ingredientForm: FormGroup;
  showArrayForm:boolean = false;

  constructor(private fb: FormBuilder) {
    this.ingredientForm = this.fb.group({
      ingredients: this.fb.array([this.createIngredientGroup()]) // Initialize with one group
    });
  }

  onSelectCat(event:any){
   let data = event.target.value;
   if(data == 'Processed Food'){
    this.showArrayForm = true;
   }else{
    this.showArrayForm = false;
   }
   debugger
  }

  // Getter for ingredients FormArray
  get ingredients(): FormArray {
    return this.ingredientForm.get('ingredients') as FormArray;
  }

  // Create a new ingredient group
  private createIngredientGroup(): FormGroup {
    return this.fb.group({
      ingredient: ['',],
      percentage: [null, []]
    });
  }

  // Add a new ingredient control
  addIngredient() {
    this.ingredients.push(this.createIngredientGroup());
  }

  // Remove an ingredient control
  removeIngredient(index: number) {
    this.ingredients.removeAt(index);
  }

  // Submit the form
  onSubmit() {
    if (this.ingredientForm.valid) {
      console.log('Form Value:', this.ingredientForm.value);
    } else {
      alert('Please fill all required fields with valid values.');
    }
  }
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    } else {
      this.selectedFile = null;
    }
  }

  clearFile(): void {
    this.selectedFile = null;
  }
}
