import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppbarComponent } from './appbar/appbar.component';
import { DRippleDirective } from './d-ripple.directive';
import { ArticleDetailComponent } from './screens/home/article-detail/article-detail.component';
import { EditComponent } from './screens/edit/edit.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    ArticleDetailComponent,
    DRippleDirective,
    EditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppbarComponent,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
