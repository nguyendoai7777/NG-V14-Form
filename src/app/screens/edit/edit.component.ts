import { Component, OnInit } from '@angular/core';
import { filter, map, Observable, of, pluck, switchMap, take } from 'rxjs';
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../../services/article.service';
import { Article } from '../../model/model';
import { CheckDeActivate } from '../../model/check-deactivate.model';

interface FormBuilderProps {
  title: FormControl<string>;
  body: FormControl<string>;
}

@Component({
  selector: 'app-edit',
  template: `
  <form [formGroup]="(form$ | async ) || _default">
    <input type="text" formControlName="title">
    <textarea name="" id="" cols="30" rows="10" formControlName="body"></textarea>
  </form>
  `,
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, CheckDeActivate {

  form$!: Observable<FormGroup>;
  form2$!: FormGroup<FormBuilderProps>;
  initialForm: unknown;
  _default = this.fb.nonNullable.group({
    title: [''],
    body: [''],

  })
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private articleService: ArticleService
  ) { }

  ngOnInit(): void {
    /*this.route.params.pipe(
      map(e => e['slug']),
      switchMap(slug => this.articleService.getArticle(slug)),
      filter(article => !!article),
    ).subscribe({
      next: form => {
        this.form2$ = this.fb.nonNullable.group({
          body: [form!.body, Validators.required],
          title: [form!.title]
        })
      }
    })*/

    this.form$ = this.route.params.pipe(
      map(e => e['slug']),
      switchMap(slug => this.articleService.getArticle(slug)),
      filter(article => !!article),
    // @ts-ignore
      switchMap(article => of(this.initForm(article)))
    )
  }

  private initForm(article: Article) {
    const form = this.fb.nonNullable.group({
      body: [article!.body, Validators.required],
      title: [article!.title]
    })
    this.initialForm = form.getRawValue();
    return form;
  }
  checkDeActivate(): Observable<boolean> {
    let formValue = {};
    this.form$.pipe(
      take(1),
    ).subscribe({next: form => {
        formValue = form.getRawValue()
     }
    })
    console.log(formValue, this.initialForm)
    const edited = JSON.stringify(this.initialForm) !== JSON.stringify(formValue);
    // @ts-ignore
    return of(!edited || alert('are you sure quit when not save yet'));
  }
}
