import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
interface Expense { id: number; description: string; category: string; value: number; }
const KEY = 'angular-portfolio-expenses';
function loadExpenses(): Expense[] { try { const data = JSON.parse(localStorage.getItem(KEY) || '[]'); return Array.isArray(data) ? data : []; } catch { return []; } }
@Component({selector:'app-root',standalone:true,imports:[FormsModule],templateUrl:'./app.component.html'})
export class AppComponent {
  description = ''; category = 'Alimentação'; amount: number | null = null;
  readonly selectedCategory = signal('Todas');
  readonly categories = ['Alimentação','Transporte','Moradia','Estudos','Outros'];
  readonly expenses = signal<Expense[]>(loadExpenses());
  readonly total = computed(() => this.expenses().reduce((acc,e) => acc + e.value,0));
  readonly filtered = computed(() => this.expenses().filter(e => this.selectedCategory() === 'Todas' || e.category === this.selectedCategory()));
  money(n:number): string { return n.toLocaleString('pt-BR',{style:'currency',currency:'BRL'}); }
  add(): void { const description = this.description.trim(); const value = Number(this.amount); if (!description || !Number.isFinite(value) || value <= 0) return;
    this.persist([{id:Date.now(),description,category:this.category,value},...this.expenses()]); this.description='';this.amount=null; }
  remove(id:number):void { this.persist(this.expenses().filter(e=>e.id!==id)); }
  private persist(items:Expense[]):void {this.expenses.set(items);localStorage.setItem(KEY,JSON.stringify(items));}
}
