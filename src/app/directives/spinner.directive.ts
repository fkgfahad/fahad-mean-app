import { Component } from '@angular/core';

@Component({
  selector: 'spinner',
  template: `
    <div
      style="min-height: 35px; display: flex; justify-content: center; align-items: center"
    >
      <mat-spinner strokeWidth="2" color="warn" diameter="25"></mat-spinner>
    </div>
  `
})
export class SpinnerComponent {}
