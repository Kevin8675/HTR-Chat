import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class chatService {

  constructor() { }

  // change to local host

  // to start server on localhost use: ng serve --open in terminal
  // to host server on your computer so other people can use it run 'ng serve --host=0.0.0.0' in terminal
  // in a new terminal cd into the directory and run 'node backend/index.js'
 
  
  private socket = io('localhost:8081');

  joinRoom(data)
  {
    this.socket.emit('join', data);
  }

  newUserJoined()
  {
    let observable = new Observable<{user:String, message: String}>(observer=>{
      this.socket.on('new user joined', (data)=>{
        observer.next(data);
      });
      return () => {this.socket.disconnect();}
    });

    return observable;
  }

  leaveRoom(data){
    this.socket.emit('leave',data);
  }

  userLeftRoom(){
    let observable = new Observable<{user:String, message:String}>(observer=>{
      this.socket.on('left room', (data)=>{
        observer.next(data);
      });
      return () => {this.socket.disconnect();}
    });

    return observable;
  }

  sendMessage(data)
  {
    this.socket.emit('message',data);
  }

  newMessageReceived(){
    let observable = new Observable<{user:String, message:String}>(observer=>{
      this.socket.on('new message', (data)=>{
        observer.next(data);
      });
      return () => {this.socket.disconnect();}
    });

    return observable;
  }
}
