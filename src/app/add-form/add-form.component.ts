import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { dishes, maxAmountOfDishes} from './../Dishes';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css']
})
export class AddFormComponent implements OnInit {

  dishes = dishes;
  maxAmountOfDishes = maxAmountOfDishes
  modelForm: FormGroup;

  constructor(private formBuilder : FormBuilder) {
    this.modelForm = this.formBuilder.group({
      dishName:['', [Validators.required]],
      kitchen: ['', [Validators.required]],
      type: ['', [Validators.required]],
      category: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      ingredients: ['', Validators.required],
      numberOfDishes: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      price: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      description:['', Validators.required],
      img:['', Validators.required]
    });
   }

   formErrors = {
    dishName: '',
    kitchen: '',
    type: '',
    category: '',
    ingredients: '',
    numberOfDishes: '',
    price: '',
    description: '',
    img: ''
  }

  ngOnInit(): void {
  }
  

  onSubmit(modelForm: FormGroup): void{
    for (let field in this.formErrors){
      if (!modelForm.controls[field].valid){
        alert('Wrong data in ' + field);
        return;
      }
    }
    this.dishes.push({dishName: modelForm.value['dishName'],
                     kitchen: modelForm.value['kitchen'],
                     type: modelForm.value[ 'type' ],
                     category: modelForm.value['category'],
                     ingerdients: modelForm.value['ingredients'],
                     numberOfDishes: modelForm.value['numberOfDishes'],
                     price: modelForm.value['price'],
                     description: modelForm.value['description'],
                     img: modelForm.value['img']
    });
    this.maxAmountOfDishes.push(modelForm.value['numberOfDishes'])
    modelForm.reset();  
  }
}
