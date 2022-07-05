import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  constructor() {}

  alert(message: string): void {
    window.alert(message);
  }

  showLoading(): void {
    const loading = document.getElementById('loading');
    if (loading) {
      loading.classList.remove('hidden');
      loading.classList.add('shown');
    }
  }

  hideLoading(): void {
    const loading = document.getElementById('loading');
    if (loading) {
      loading.classList.remove('shown');
      loading.classList.add('hidden');
    }
  }
}
