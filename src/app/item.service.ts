import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ItemService {
  private items: { id: number; title: string }[] = [];
  private idSeq = 1;

  list() {
    return [...this.items];
  }

  create(payload: { title: string }) {
    const item = { id: this.idSeq++, title: payload.title };
    this.items.push(item);
    return item;
  }

  update(id: number, payload: { title: string }) {
    const idx = this.items.findIndex(i => i.id === id);
    if (idx >= 0) this.items[idx] = { ...this.items[idx], ...payload };
    return this.items[idx];
  }

  delete(id: number) {
    this.items = this.items.filter(i => i.id !== id);
  }
}