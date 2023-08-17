import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { TrackPurchasesComponent } from './track-purchases/track-purchases.component';
import { RecordSalesComponent } from './record-sales/record-sales.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'track-purchases', component: TrackPurchasesComponent },
  { path: 'record-sales', component: RecordSalesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
