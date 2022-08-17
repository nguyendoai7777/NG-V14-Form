import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleDetailComponent } from './screens/home/article-detail/article-detail.component';
import { ArticleGuard } from './guard/article.guard';
import { EditComponent } from './screens/edit/edit.component';
import { FormSComponent } from './screens/form-s/form-s.component';
import { LinkPreviewComponent } from './screens/link-preview/link-preview.component';
import { TypeFormComponent } from './screens/type-form/type-form.component';

const routes: Routes = [
  { path: 'home', loadChildren: () => import('./screens/home/home.module').then(m => m.HomeModule) },
  { path: 'child', canActivate: [ArticleGuard], loadChildren: () => import('./screens/child/child.module').then(m => m.ChildModule)},
  {
    path: 'form',
    component: FormSComponent
  },
  {
    path: 'lpv',
    component: LinkPreviewComponent
  },
  {
    path: 'tp',
    component: TypeFormComponent
  },
  {
    path: ':slug',
    canActivateChild: [ArticleGuard],
    children: [
      {
        path: '',
        component: ArticleDetailComponent
      },
      {
        path: 'edit',
        component: EditComponent,
        canDeactivate: [ArticleGuard]
      }
    ]
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
