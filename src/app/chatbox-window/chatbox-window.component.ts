import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { X, ArrowRight, Send, MessageCircle } from 'lucide-angular';
import { ChatComponentService } from './chatbox-window.service';
import { ChangeDetectorRef } from '@angular/core';
import lottie from 'lottie-web';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chatbox-window.component.html',
  styleUrls: ['./chatbox-window.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
})
export class ChatComponent implements OnInit {
  @ViewChild('lottieContainer', { static: false }) lottieContainer!: ElementRef;
  @Input() settingLanding: any;
  @ViewChild('scrollTarget') private scrollTarget!: ElementRef;

  xIcon = X;
  arrowRightIcon = ArrowRight;
  sendIcon = Send;
  messageCircleIcon = MessageCircle;

  isLoading = false;
  animationLoaded = false;

  conversationId: any;
  isChatVisible = false; // Set to true by default to show the chat window
  messages: { text: string; sender: 'user' | 'bot' }[] = [];
  newMessage = '';

  constructor(
    private chatComponentService: ChatComponentService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // Tạm comment để test giao diện
    this.chatComponentService.getInit().subscribe((res: any) => {
      if (res?.success) {
        this.conversationId = res.message;
      }
    });
  }

  scrollToBottom() {
    try {
      setTimeout(() => {
        this.scrollTarget.nativeElement.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err) {
      console.error('Lỗi cuộn:', err);
    }
  }

  sendMessage() {
    if (!this.newMessage.trim()) {
      return;
    }

    const userMessage = this.newMessage.trim();
    this.messages.push({ text: userMessage, sender: 'user' });
    this.newMessage = '';
    this.isLoading = true;

    const body = {
      session_id: this.conversationId,
      question: userMessage,
    };

    this.chatComponentService.getAsk(body).subscribe(
      (res: any) => {
        this.messages.push({ text: res.answer, sender: 'bot' });
        this.isLoading = false;
        this.animationLoaded = false;
        this.scrollToBottom();
        this.animationLoaded = false;
      },
      (error) => {
        this.messages.push({
          text: 'Error: Unable to get a response.',
          sender: 'bot',
        });
        this.isLoading = false;
        this.animationLoaded = false;
        this.scrollToBottom();
      }
    );
  }

  toggleChat() {
    this.isChatVisible = !this.isChatVisible;
  }
}
