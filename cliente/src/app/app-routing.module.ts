import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './components/principal/principal.component'
import { InfoRamComponent } from './components/info-ram/info-ram.component'
import { InfoCpuComponent } from './components/info-cpu/info-cpu.component'
const routes: Routes = [
  {
    path: '',
    redirectTo: '/principal',
    pathMatch: 'full'
  },
  {
    path: 'principal',
    component: PrincipalComponent
  },
  {
    path: 'info-ram',
    component: InfoRamComponent
  },
  {
    path: 'info-cpu',
    component: InfoCpuComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
