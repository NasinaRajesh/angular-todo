import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { LoginComponent } from './pages/login/login.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { SignupComponent } from './pages/signup/signup.component';
import { TodoComponent } from './pages/todo/todo.component';
import { TwoWayBindingComponent } from './pages/two-way-binding/two-way-binding.component';

const routes: Routes = [
  
  {
    path:'',
    component:HomeComponent
  },
  {
    path:'todo',
    component:TodoComponent
  },
  {
    path:'task',
    component:LayoutComponent
  },
  {
    path:'two',
    component:TwoWayBindingComponent
  },
 
  {
    path:'todo/:id',
    component:TodoComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'signup',
    component:SignupComponent
  },
  {
    path:'**',
    component:PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
