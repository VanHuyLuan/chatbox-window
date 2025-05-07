import { NgModule, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { AppComponent } from './app.component';
import { ChatComponent } from './chatbox-window/chatbox-window.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [BrowserModule, AppComponent, ChatComponent, HttpClientModule],
  providers: [],
  bootstrap: [], // KHÔNG bootstrap AppComponent
})
export class AppModule {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    const el = createCustomElement(ChatComponent, { injector: this.injector });
    customElements.define('chatbox-sdk', el);
  }
}
