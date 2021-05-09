import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientListComponent } from './components/client/client-list/client-list.component';
import { PolicyListComponent } from './components/policy/policy-list/policy-list.component';

const routes: Routes = [
  {
    path: "",
    component: ClientListComponent
  },
  {
    path: "policies",
    component: PolicyListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
