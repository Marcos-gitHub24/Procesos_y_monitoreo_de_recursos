import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PruebaService } from "./services/principal/prueba.service";
import { InfoRamComponent } from './components/info-ram/info-ram.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { InfoCpuComponent } from './components/info-cpu/info-cpu.component';
import { NgChartsModule } from 'ng2-charts';
import { MatExpansionModule } from '@angular/material/expansion'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    InfoRamComponent,
    PrincipalComponent,
    InfoCpuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgChartsModule,
    HttpClientModule,
    MatExpansionModule,
    BrowserAnimationsModule
  ],
  providers: [PruebaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
