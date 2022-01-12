import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import {Dish} from '../IDish'
import { dishes } from './../Dishes';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit, OnChanges{

    dishes = dishes
    @Input() minimalPrice = 0;
    @Input() maximalPrice = 0;
    @Input() types = new Array();
    @Input() categories = new Array();
    filteredTypes: string[] = [];
    filteredCategories:string[] = [];
    @Output() newTypes = new EventEmitter<string[]>();
    @Output() newCategories = new EventEmitter<string[]>();
    @Output() newMinPrice = new EventEmitter<number>();
    @Output() newMaxPrice = new EventEmitter<number>();

    newMinimalPrice = 0;
    newMaximalPrice = this.maximalPrice;



  constructor() {

   }

  ngOnInit(): void {
    for(let dish of this.dishes){
        if(!this.types.includes(dish.type)){
          this.types.push(dish.type);
        } 
        if(!this.categories.includes(dish.category)){
            this.categories.push(dish.category);
        }
      }
    this.newMaximalPrice = this.maximalPrice;
    this.newMaxPrice.emit(this.newMaximalPrice);
  }

  ngOnChanges(changes: SimpleChanges): void{
    this.types = [];
    this.categories=[];
    for (let dish of this.dishes){
      if (!this.types.includes(dish.type)){
        this.types.push(dish.type);
      }
      if (!this.categories.includes(dish.category)){
        this.categories.push(dish.category);
      }
    }
    this.newTypes.emit(this.types);
    this.newCategories.emit(this.categories)
  }


  changeType(event: any): void{
    if(event.target.checked){
      this.filteredTypes.push(event.target.name);
    }
    else{
      this.removeType(event.target.name);
    }
    this.newTypes.emit(this.filteredTypes);
  }

  removeType (type: string){
    for (let i = 0; i < this.filteredTypes.length; i++){
      if (this.filteredTypes[i] === type){
        this.filteredTypes.splice(i, 1);
      }
    }
  }

  changeCategory(event: any): void{
    if(event.target.checked){
      this.filteredCategories.push(event.target.name);
    }
    else{
      this.removeCategory(event.target.name);
    }
    this.newCategories.emit(this.filteredCategories);
  }

  removeCategory (category: string){
    for (let i = 0; i < this.filteredCategories.length; i++){
      if (this.filteredCategories[i] === category){
        this.filteredCategories.splice(i, 1);
      }
    }
  }

  changeMin(event: any){
    this.newMinimalPrice = parseInt(event.target.value, 10);
    this.newMinPrice.emit(this.newMinimalPrice);
  }

  changeMax(event: any){
    this.newMaximalPrice = parseInt(event.target.value, 10);
    this.newMaxPrice.emit(this.newMaximalPrice);
  }


}