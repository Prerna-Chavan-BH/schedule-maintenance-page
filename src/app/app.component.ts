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
      const theme = this.getBrowserTheme();
      console.log('Detected Browser Theme:', theme);
      this.renderer.setAttribute(document.documentElement, 'data-theme', theme);
    }, 100);
  }

  getBrowserTheme(): string {
    // This ensures we get the browser's theme setting, NOT the system theme.
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    return mediaQuery.matches ? 'dark' : 'light';
  }

  listenForThemeChanges() {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', () => {
      this.applyBrowserTheme();
    });
  }
}
