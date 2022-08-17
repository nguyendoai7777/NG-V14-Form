import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppbarComponent } from './appbar/appbar.component';
import { DRippleDirective } from './d-ripple.directive';
import { ArticleDetailComponent } from './screens/home/article-detail/article-detail.component';
import { EditComponent } from './screens/edit/edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormSComponent } from './screens/form-s/form-s.component';
import { LinkPreviewComponent } from './screens/link-preview/link-preview.component';
import { HttpClientModule } from '@angular/common/http';
import { TypeFormComponent } from './screens/type-form/type-form.component';


@NgModule({
  declarations: [
    AppComponent,
    ArticleDetailComponent,
    DRippleDirective,
    EditComponent,
    FormSComponent,
    LinkPreviewComponent,
    TypeFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppbarComponent,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
