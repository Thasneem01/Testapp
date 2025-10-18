import { Component } from '@angular/core';
import { ItemService } from './item.service';

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <h1>My notes app</h1>

      <form (submit)="addItem()" class="add-form">
        <input class="input-title" [(ngModel)]="newTitle" name="title" placeholder="Item title" required />
        <button class="btn primary" type="submit">Add</button>
      </form>

      <ul class="item-list">
        <li *ngFor="let item of items" class="item">
          <span class="title" *ngIf="!editing || editing.id !== item.id">{{item.title}}</span>
          <input class="edit-input" *ngIf="editing && editing.id === item.id" [(ngModel)]="editing.title" />

          <div class="actions">
            <button class="btn" (click)="startEdit(item)">Edit</button>
            <button class="btn primary" (click)="saveEdit(item)" *ngIf="editing && editing.id === item.id">Save</button>
            <button class="btn" (click)="cancelEdit()" *ngIf="editing && editing.id === item.id">Cancel</button>
            <button class="btn danger" (click)="deleteItem(item)">Delete</button>
          </div>
        </li>
      </ul>
    </div>
  `,
  styles: [
    `
    :host { display: block; padding: 20px; }
    .container { max-width: 700px; margin: 0 auto; background: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 6px 18px rgba(0,0,0,0.08); }
    h1 { margin: 0 0 12px 0; font-size: 1.6rem; color: #333; }

    .add-form { display: flex; gap: 8px; margin-bottom: 16px; }
    .input-title { flex: 1; padding: 8px 10px; border: 1px solid #ddd; border-radius: 4px; }
    .edit-input { padding: 6px 8px; border: 1px solid #ddd; border-radius: 4px; }

    .item-list { list-style: none; padding: 0; margin: 0; display: grid; gap: 8px; }
    .item { display: flex; align-items: center; justify-content: space-between; padding: 10px; border: 1px solid #f0f0f0; border-radius: 6px; }
    .title { flex: 1; color: #222; }

    .actions { display: flex; gap: 8px; align-items: center; }
    .btn { padding: 6px 10px; border: 1px solid transparent; border-radius: 4px; background: #f3f4f6; cursor: pointer; }
    .btn.primary { background: linear-gradient(180deg,#2563eb,#1d4ed8); color: white; border-color: rgba(0,0,0,0.05); }
    .btn.danger { background: #fee2e2; color: #b91c1c; }

    @media (max-width: 520px) {
      .add-form { flex-direction: column; }
      .actions { gap: 6px; }
    }
    `
  ]
})
export class AppComponent {
  items = [] as { id: number; title: string }[];
  newTitle = '';
  editing: { id: number; title: string } | null = null;

  constructor(private service: ItemService) {
    this.items = this.service.list();
  }

  addItem() {
    if (!this.newTitle.trim()) return;
    this.service.create({ title: this.newTitle.trim() });
    this.items = this.service.list();
    this.newTitle = '';
  }

  startEdit(item: any) {
    this.editing = { ...item };
  }

  saveEdit(item: any) {
    if (!this.editing) return;
    this.service.update(this.editing.id, { title: this.editing.title });
    this.items = this.service.list();
    this.editing = null;
  }

  cancelEdit() {
    this.editing = null;
  }

  deleteItem(item: any) {
    this.service.delete(item.id);
    this.items = this.service.list();
  }
}