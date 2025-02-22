import { Component, OnInit, Renderer2, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'schedule-maintenance-page';
  maintenanceEndTime = 'Jan 21, 2025, 12:30 PM IST';
  contactURL = 'mailto:support@example.com';
  
  constructor(
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.applyBrowserTheme();
      this.listenForThemeChanges();
    }
  }

  applyBrowserTheme() {
    setTimeout(() => {
      let theme = this.getStoredTheme() || this.getBrowserTheme();
      console.log('Applying Theme:', theme);
      this.renderer.setAttribute(document.documentElement, 'data-theme', theme);
      this.storeTheme(theme);
    }, 100);
  }

  getBrowserTheme(): string {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    return mediaQuery.matches ? 'dark' : 'light';
  }

  storeTheme(theme: string) {
    localStorage.setItem('user-theme', theme);
  }

  getStoredTheme(): string | null {
    return localStorage.getItem('user-theme');
  }

  listenForThemeChanges() {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', () => {
      let newTheme = this.getBrowserTheme();
      console.log('Theme Changed:', newTheme);
      this.renderer.setAttribute(document.documentElement, 'data-theme', newTheme);
      this.storeTheme(newTheme);
    });
  }
}
