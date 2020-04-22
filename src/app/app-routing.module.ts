import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MiniatureComponent } from './shared/components/miniature/miniature.component';
import { PostComponent } from './pages/post/post.component';

const routes: Routes = [

  { path: 'posts/:id', component: PostComponent },
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: '**', pathMatch: 'full', component: HomeComponent }
];

@NgModule({

  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [HomeComponent, PostComponent,
  MiniatureComponent];
