import { ModuleWithProviders } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
// Components
import { HomeComponent } from './components/home/home.component'
import { LoginComponent } from './components/login/login.component'
import { NotFoundComponent } from './components/notFound/notFound.component'
import { ProjectComponent } from './components/project/project.component'
import { ProjectApiComponent } from './components/project_api/project_api.component'

const appRoutes: Routes = [
    {path:'', component: HomeComponent},
    {path:'home', component: HomeComponent},
    {path:'login', component: LoginComponent},
    {path:'project', component: ProjectComponent},
    {path:'projectApi', component: ProjectApiComponent},
    {path:'**', component: NotFoundComponent}
]

export const appRoutingProviders: any[] = []
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes)