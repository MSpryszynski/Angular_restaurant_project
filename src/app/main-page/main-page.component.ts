import { Component, OnInit } from '@angular/core';
import { Dish } from './../IDish';
import { dishes, maxAmountOfDishes, sumOfDishes } from './../Dishes';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  constructor(){
  }

  ngOnInit(): void {
    this.setMaxMinPrice();
  }
  dishes = dishes;
  maxAmountOfDishes = maxAmountOfDishes;
  sumOfDishes = sumOfDishes[0];
  sumOfDishesArr = sumOfDishes;
  filteredTypes: string[] = [];
  filteredCategories: string[] = [];
  minimalPrice: number = 0;
  maximalPrice: number = 0;
  filterMinPrice: number = 0;
  filterMaxPrice: number = 0;
  TypesToSendToFilter = new Array();
  Types = new Array();
  CategoriesToSendToFilter = new Array();
  Categories = new Array();
  selectedPagination = dishes.length;
  pageNumber = 1
  dishNumbers:number[] = []
  fails = 0;
  Pages = new Array();
  Page = 0;

  setDishNumbers(){
    this.dishNumbers = []
    for (let index = 0; index < dishes.length; index++) {
      this.dishNumbers.push(index+1)
    }
  }

  setMaxMinPrice(){
    const copyOfDishes = [...this.dishes];
    this.minimalPrice = copyOfDishes.sort((a, b) => a.price - b.price)[0].price;
    this.maximalPrice = copyOfDishes.sort((a, b) => a.price - b.price)[copyOfDishes.length - 1].price;
  }
  

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
  

  minPrice(price: number){
    let dishesCopy = [... this.dishes];
    return price === dishesCopy.sort((a, b) => a.price - b.price)[0].price;
  }

  maxPrice(price: number){
    const dishesCopy = [... this.dishes];
    return price === dishesCopy.sort((a, b) => a.price - b.price)[dishesCopy.length - 1].price;
  }

  changeOpacity(amount: number){
    return amount < 4;
  }
  changeBackground(){
    return this.sumOfDishes >= 10;
  }

  deleteDish(index: number){
    for(let i=0; i<=this.maxAmountOfDishes[index]; i++){
      this.removeDish(index);
    }
    if (index > -1) {
    dishes.splice(index, 1);
    this.maxAmountOfDishes.splice(index, 1);
    }
    this.setMaxMinPrice();
    this.setDishNumbers();
  }
  addCard($event: number){
      this.maxAmountOfDishes.push($event);
      this.setMaxMinPrice();
      for (let dish of this.dishes){
        if (!this.Types.includes(dish.type)){
          this.Types.push(dish.type);
        }
        if (!this.Categories.includes(dish.category)){
          this.Categories.push(dish.category);
        }
      }
      this.TypesToSendToFilter = this.Types;
      this.CategoriesToSendToFilter = this.Categories;
  }

  newTypes(event: any){
    this.filteredTypes = event;
    this.setMaxMinPrice();
    this.reset();
    
  }
  newCategories(event: any){
    this.filteredCategories = event;
    this.setMaxMinPrice();
    this.reset();
  }


  newMinPriceFromFilter(event: any){
    this.filterMinPrice = event;
    this.reset();
  }

  newMaxPriceFromFilter(event: any){
    this.filterMaxPrice = event;
    this.reset();
  }

  useFilters(dish: Dish): boolean{
    if (dish.price > this.filterMaxPrice){
      return false;
    }
    if (dish.price < this.filterMinPrice){
      return false;
    }
    if (!this.filteredTypes.includes(dish.type)){
     return false;
    }
    if (!this.filteredCategories.includes(dish.category)){
      return false;
     }
    return true;
  }


  reset(){
    this.fails = 0;
    this.Pages = new Array();
    this.setDishNumbers();
    for (let index = 0; index < this.pageNumber; index++) {
      this.Pages.push(index+1);
    }
  }

  changeP(index: number){
    this.fails -= 1;
    this.dishNumbers[index] = 1000000000;
  }

  countPagination():number{
    const x = this.selectedPagination - this.fails + this.selectedPagination*this.Page
    return x
  }

  updatePagination(){
    this.pageNumber = Math.ceil(dishes.length/this.selectedPagination);
    this.Page = 0;
    this.reset();
  }

  changePage(page:number){
    this.reset();
    this.Page = page
  }
}

