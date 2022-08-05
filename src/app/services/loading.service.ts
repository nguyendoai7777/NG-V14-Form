import { Inject, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DOCUMENT } from '@angular/common';

const CSSStyleSheet = `
.loading-splash-screen {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #000000a3;
  backdrop-filter: blur(5px);
  z-index: 1000;
}
.loading-splash-screen .indicator {
  position: absolute;
  z-index: 1001;
  top: 10px;
  right: 10px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border-top: 2px solid deeppink;
  border-left: 2px solid deeppink;
  border-right: 2px solid deeppink;
  border-bottom: 2px solid transparent;
  animation: spin 0.5s linear infinite;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
`;


@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  readonly #loading$ = new Subject();
  readonly loadingController$ = this.#loading$.asObservable();
  #loadingColor = 'deeppink';
  #loadingDuration = '.5s';
  constructor(
    @Inject(DOCUMENT) private readonly document: Document
  ) {
    this.#applyCss();
    this.#loading$.next(false);
    this.loadingController$.subscribe({
      next: v => {
        if (v) {
          this.document.body.appendChild(this.#setView());
          this.document.body.style.overflowY = 'hidden';
        } else {
          this.document.body.style.overflowY = 'scroll';
          const d = this.document.body.querySelector('#loading29041998');
          if (d) {
            this.document.body.removeChild(d)
          }
        }
      }
    });

  }

  setIndicatorStyle(color = this.#loadingColor, duration = this.#loadingDuration) {
    this.#loadingColor = color || this.#loadingColor;
    this.#loadingDuration = duration || this.#loadingDuration;
  }

  setLoading(state: boolean, config?: {color?: string, duration?: string}) {
    if(!config) {
      config = {
        color: this.#loadingColor,
        duration: this.#loadingDuration
      }
    }
    this.setIndicatorStyle(config.color, config.duration);
    this.#loading$.next(state);

  }

  #setView(): HTMLElement {
    const loadingIndicator = this.document.createElement('div');
    loadingIndicator.className = 'indicator';
    loadingIndicator.style.borderTopColor = this.#loadingColor;
    loadingIndicator.style.borderLeftColor = this.#loadingColor;
    loadingIndicator.style.borderRightColor = this.#loadingColor;
    loadingIndicator.style.animationDuration = this.#loadingDuration;

    const loadingWrapper = this.document.createElement('div');
    loadingWrapper.id = 'loading29041998';
    loadingWrapper.className = 'loading-splash-screen';
    loadingWrapper.appendChild(loadingIndicator);

    return loadingWrapper;
  }

  #applyCss(): void {
    const styleOfLoading = this.document.createElement('style');
          styleOfLoading.setAttribute('detect-css', '');
          styleOfLoading.innerHTML = CSSStyleSheet;

    this.document.head.appendChild(styleOfLoading);
  }
}
