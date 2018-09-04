import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { HttpModule } from '@angular/http'
import { FormsModule } from '@angular/forms'
import { routing, appRoutingProviders } from './app.routing'
import { Pipe, PipeTransform } from '@angular/core';
// Modules
import { DxDataGridModule, DxListModule, DxButtonModule } from 'devextreme-angular';
// Components
import { AppComponent } from './app.component'
import { HomeComponent } from './components/home/home.component'
import { LoginComponent } from './components/login/login.component'
import { NotFoundComponent } from './components/notFound/notFound.component'
import { ProjectComponent } from './components/project/project.component'
import { ProjectApiComponent } from './components/project_api/project_api.component'
//Pipes
// @Pipe({
//   name: 'keyValues'
// })
// export class KeysPipe implements PipeTransform {
//   transform(value: any, args: any[] = null): any {
//     return Object.keys(value).map(key => value[key]);
//   }
// }

@Pipe({ name: 'keys' })
export class KeysPipe implements PipeTransform {
  transform(value, args: string[]): any {
    let keys = [];
    for (let key in value) {
      keys.push(key);
    }
    return keys;
  }
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    LoginComponent,
    ProjectComponent,
    ProjectApiComponent,
    KeysPipe
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpModule,
    DxDataGridModule,
    DxListModule,
    DxButtonModule
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
