import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-dog-edit-button-renderer',
  standalone: true,
  template: `<button class="btn btn-sm btn-primary" (click)="onEditClick()">
    Edit
  </button>`,
})
export class DogEditButtonRendererComponent implements ICellRendererAngularComp {
  private params!: ICellRendererParams;

  agInit(params: ICellRendererParams): void {
    this.params = params;
  }

  refresh(params: ICellRendererParams): boolean {
    this.params = params;
    return true;
  }

  onEditClick(): void {
    if (this.params.context && this.params.context.componentParent) {
      this.params.context.componentParent.onEditClick(this.params.data);
    }
  }
}
