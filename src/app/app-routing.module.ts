import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddFormComponent } from './add-form/add-form.component';
import { DishDetailsComponent } from './dish-details/dish-details.component';
import { MainPageComponent } from './main-page/main-page.component';

const routes: Routes = [
  {path:'mainpage', component: MainPageComponent},
  {path:'form', component: AddFormComponent},
  {path:'mainpage/:dishname', component: DishDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [MainPageComponent, AddFormComponent, DishDetailsComponent]
