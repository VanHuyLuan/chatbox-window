import { Component } from '@angular/core';
import { ChatComponent } from './chatbox-window/chatbox-window.component';

@Component({
  selector: 'app-root',
  template: `
    <div class="app-container">
      <app-chat-window></app-chat-window>
    </div>
  `,
  styles: [
    `
      .app-container {
        width: 100%;
        height: 100vh;
        background: linear-gradient(135deg, #0080ff 0%, #00bfff 100%);
        justify-content: center;
        align-items: center;
        padding: 20px;
      }
    `,
  ],
  imports: [ChatComponent], // Thêm dòng này
  standalone: true,
})
export class AppComponent {
  title = 'angular-chatbox';
}
