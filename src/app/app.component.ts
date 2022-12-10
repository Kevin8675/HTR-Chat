import {Component, OnInit} from '@angular/core';
import {chatService} from './chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'chatting';
  user: String;
  room: String;
  // tslint:disable-next-line:ban-types
  messageText: String;
  messageArray: Array<{user: String , message: String }> = [];
  constructor(private chatService: chatService){
    this.chatService.newUserJoined()
      .subscribe(data => this.messageArray.push(data));


    this.chatService.userLeftRoom()
      .subscribe(data => this.messageArray.push(data));

    this.chatService.newMessageReceived()
      .subscribe(data => this.messageArray.push(data));
  }

  join(){
      this.chatService.joinRoom({user: this.user, room: this.room});
  }

  leave(){
    this.chatService.leaveRoom({user: this.user, room: this.room});
  }

  sendMessage()
  {
    this.chatService.sendMessage({user: this.user, room: this.room, message: this.messageText});
  }
}