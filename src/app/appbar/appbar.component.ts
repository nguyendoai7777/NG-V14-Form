import { Component, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentStore } from '@ngrx/component-store';
import { AppbarToggleButtonState } from '../shared.model';

@Component({
  selector: 'app-appbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './appbar.component.html',
  styleUrls: ['./appbar.component.scss'],
  providers: [ComponentStore]
})
export class AppbarComponent implements OnInit {
  @Input() set checked(value: boolean) {
    this.setChecked(value);
  }
  isActive$ = this.store.select((state) => state.checked);
  @Output() changed = this.store.select((state) => ({src: this, changeState: state.checked}))

  readonly setChecked = this.store.updater(
    (state, value: boolean) => ({ ...state, checked: value })
  );
  constructor(
    private readonly store: ComponentStore<AppbarToggleButtonState>,
  ) {
    this.store.setState({checked: false})
  }

  ngOnInit(): void {
  }

  toggle() {
    this.store.patchState((state) => ({checked: !state.checked}));
  }
}
