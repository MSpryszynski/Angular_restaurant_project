import { Component, OnInit } from '@angular/core';
import { Dish } from './../IDish';
import { dishes, sumOfDishes, maxAmountOfDishes } from './../Dishes';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { opinions} from './../Opinions'

@Component({
  selector: 'app-dish-details',
  templateUrl: './dish-details.component.html',
  styleUrls: ['./dish-details.component.css']
})
export class DishDetailsComponent implements OnInit {

  modelForm: FormGroup;

  constructor(private formBuilder : FormBuilder) {
    this.modelForm = this.formBuilder.group({
      nick:['', [Validators.required]],
      name: ['', [Validators.required]],
      opinion: ['', [Validators.required, Validators.minLength(50), Validators.maxLength(500)]],
      date: ['']
    });
   }

  ngOnInit(): void {
  }
  opinions = opinions
  dishes = dishes
  maxAmountOfDishes = maxAmountOfDishes
  sumOfDishes = sumOfDishes[0];
  sumOfDishesArr = sumOfDishes;

  dishname = window.location.href.substring(window.location.href.lastIndexOf('/') + 1)
  pieces = this.dishname.split("%20");
  dishName = this.pieces.join(" ")



  addDish(index: number){
    if(dishes[index].numberOfDishes>0){
      this.sumOfDishes+=1;
      this.sumOfDishesArr[0]+=1;
      dishes[index].numberOfDishes -= 1;
    }
  }

  removeDish(index: number){
    if(dishes[index].numberOfDishes<this.maxAmountOfDishes[index]){
      this.sumOfDishes-=1;
      this.sumOfDishesArr[0]-=1;
      dishes[index].numberOfDishes += 1;
    }
  }

  formErrors = {
    nick: '',
    name: '',
    opinion: '',
    date: ''
  }

  onSubmit(modelForm: FormGroup): void{
    for (let field in this.formErrors){
      if (!modelForm.controls[field].valid){
        alert('Wrong data in ' + field);
        return;
      }
    }
    this.opinions.push({dishName: this.dishName,
                     nick: modelForm.value['nick'],
                     name: modelForm.value[ 'name' ],
                     opinion: modelForm.value['opinion'],
                     date: modelForm.value['date']
    });
    modelForm.reset(); 
  }
}
