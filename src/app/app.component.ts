import { Component, OnInit } from '@angular/core';
import { chatService } from './chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'chatting';
  user: String;
  room: String;
  messageText: String;
  messageArray: Array<{ user: String, message: String }> = [];

  constructor(private chatService: chatService) { }

  ngOnInit() {
    this.chatService.newUserJoined().subscribe(data => this.messageArray.push(data));
    this.chatService.userLeftRoom().subscribe(data => this.messageArray.push(data));
    this.chatService.newMessageReceived().subscribe(data => this.messageArray.push(data));
  }

  join() {
    this.chatService.joinRoom({ user: this.user, room: this.room });
  }

  leave() {
    this.chatService.leaveRoom({ user: this.user, room: this.room });
  }

  sendMessage() {
    this.chatService.sendMessage({ user: this.user, room: this.room, message: this.messageText });
    // Clear the input field after sending the message
    this.messageText = '';
  }

  // Function to handle key press event for joining
  handleJoinKeyPress(event: any) {
    if (event.key === 'Enter') {
      this.join();
    }
  }

  // Function to handle key press event for sending messages
  handleKeyPress(event: any) {
    if (event.key === 'Enter') {
      this.sendMessage();
    }
  }
}
