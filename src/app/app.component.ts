import { Component } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { concatMap, exhaustMap, filter, fromEvent, interval, mergeMap, of, reduce, scan, startWith, take, tap } from 'rxjs';
import { AppbarComponent } from './appbar/appbar.component';
import { LoadingService } from './services/loading.service';
import { typeCheck } from 'utils';

interface AppState {
  isActive: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ComponentStore]
})
export class AppComponent {
  readonly isActive$ = this.cpnStore.select((state) => state.isActive);
  readonly countActive$ = this.isActive$.pipe(
    filter(e => e),
    scan((acc, e) => acc + 1, 0),
    startWith(0)
  )
  f = of()

  loading = false;

  readonly vm$ = this.cpnStore.select(this.countActive$, (countActive) => ({countActive}), { debounce: true })


  title = 'ng';
  constructor(
    private readonly cpnStore: ComponentStore<AppState>,
    private readonly loadingService: LoadingService
  ) {
    this.cpnStore.setState({ isActive: false })
  }

  ngOnInit(): void {
    const tc = typeCheck(1);
    console.log('check: ', tc)
  /*  console.log(this.loadingService)
     fromEvent(document, 'click').pipe(
      tap(() => {
        this.loading = !this.loading;
        this.loadingService.setLoading(this.loading, {color: '#3daaff', duration: '2s'} )
      }),
    ).subscribe()*/
/*    console.log(`
 ____           _ ____
|  _ \\ __  __  | / ___|
| |_) |\\ \\/ /  | \\___ \\
|  _ <  >  < |_| |___) |
|_| \\_\\/_/\\_\\___/|____/
    `)*/
  }

  onChildChanged(e: {src: AppbarComponent, }) {
    // e.src.isActive$.subscribe(console.log)
  }

  toggle() {
    this.cpnStore.patchState((state) =>  ({isActive: !state.isActive}));

  }

}
