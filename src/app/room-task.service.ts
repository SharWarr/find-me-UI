import { Injectable } from '@angular/core';
import { HttpClient ,HttpClientModule ,HttpHeaders} from '@angular/common/http';
import {Room} from './room/room.model'
import { ThrowStmt } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class RoomTaskService {
  room!: Room[];
  constructor(private httpservice:HttpClient) { 
   room : [];
  }
    results!: string;
    name!: string;

    getAllRooms(){
      return this.httpservice.get<any>('http://localhost:3080/home');
    }

    delete_Room_id(id){
      console.log("In delete room" + id);
      const headers = new HttpHeaders()
      .append(
      'Content-Type',
      'application/json'
    );
      const body=JSON.stringify({_id :id});
      return this.httpservice.post<any>('http://localhost:3080/home/delete',body,{headers:headers});
    }
    insertRoom(roomData){
      return this.httpservice.post<any>('http://localhost:3080/home',roomData);
    }
    insertStorage(storageData){
      return this.httpservice.post<any>('http://localhost:3080/home', storageData);
    }
    
    insert(userData){
          return this.httpservice.post<any>('http://localhost:3080/home',userData);
    }

    getUsers() {
      //return this.httpservice.get('http://localhost:3080/home');
      
        return this.httpservice.get<any>('http://localhost:3080/home');
      

    
      
    }

    search_item(item){
      const headers = new HttpHeaders()
      .append(
      'Content-Type',
      'application/json'
    );
      const body= JSON.stringify({item : item});
       return this.httpservice.post<any>('http://localhost:3080/home/search',body,{headers:headers});
    }

    checkRoomNotTaken(room_name) {

       return this.httpservice.post<any>('http://localhost:3080/home/checkRoomNotTaken',room_name);
    }

    // insertRooms(obj : any[]){
    //   console.log("Inside insertrooms");
    //   var obj1 = obj;
    //     console.log(obj1);
    //     this.httpservice.post<any>('http://localhost:3080/home',obj1);
    // }

    // getUsers(){
    // this.httpservice.get('http://localhost:3080').subscribe(users=>    
    //   {    
    //     this.Emp = users as string [];   
         
    //   }); 
    //   console.log(this.Emp);
    // }
    
    // addUser(user: any) {
    //   return this.http.post('/user', {user});
    // }
  
  }

