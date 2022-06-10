import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FundosListComponent } from './fundo/pages/fundos-list/fundos-list.component';


const routes: Routes = [
  {
    path: '',
    component: FundosListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
