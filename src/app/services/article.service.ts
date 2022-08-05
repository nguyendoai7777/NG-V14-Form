import { Injectable } from '@angular/core';
import { map, Observable, of, shareReplay } from 'rxjs';
import { Article } from '../model/model';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  // articles$: Observable<Article[]>;
  constructor() { }

  get articles$() {
    return  of<Article[]>([
      {title: 'T 1', body: 'lorem ipsum dy', slug: 't-1'},
      {title: 'T 2', body: 'lorem ipsum dy lorem ipsum', slug: 't-2'},
    ]).pipe(
      shareReplay(1)
    );
  }

  getArticle(slug: string) {
    return this.articles$.pipe(map(e => e.find(a => a.slug === slug)));
  }
}
