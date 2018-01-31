import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';

// Our Array of Angular 2 Routes
const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent // Default Route
  },
  { path: '**', component: HomeComponent } // "Catch-All" Route
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes)],
  providers: [],
  bootstrap: [],
  exports: [RouterModule]
})

export class AppRoutingModule { }
