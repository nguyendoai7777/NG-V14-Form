import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ArticleService } from 'src/app/services/article.service';
import { Article } from '../../model/model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  articles$!: Observable<Article[]>;
  constructor(
    private articleService: ArticleService
  ) { }

  ngOnInit(): void {
    this.articles$ = this.articleService.articles$;
  }

}
