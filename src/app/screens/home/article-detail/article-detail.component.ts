import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../../services/article.service';
import { filter, map, Observable, pluck, switchMap } from 'rxjs';
import { Article } from '../../../model/model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss']
})
export class ArticleDetailComponent implements OnInit {
  article$!: Observable<Article | undefined>;
  constructor(
    private readonly articleService: ArticleService,
    private readonly route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.article$ = this.route.params.pipe(
      pluck('slug'),
      switchMap(slug => this.articleService.getArticle(slug)),
      filter(article => !!article)
    )
  }

}
