import { Component } from '@angular/core';
import { Room } from './room/room.model';
import { RoomTaskService } from './room-task.service';
import { FormBuilder, FormArray, FormsModule, Validators, SelectMultipleControlValueAccessor } from '@angular/forms';
import { ɵEmptyOutletComponent } from '@angular/router';
import { async, waitForAsync } from '@angular/core/testing';






@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
// export class AppComponent 
// {
//   title = 'find-me';
//   room!: Room[];
//   room1!: any[];

//   addRoom(room_name: HTMLInputElement, description: HTMLTextAreaElement): boolean 
//   {
//     console.log(`Adding article room: ${room_name.value} and desc: ${description.value}`);


//     room_name.value='';
//     description.value='';
//     return false;

//   }





// }


export class AppComponent {

  room: Room[];
  dumiData: any;
  dumiData_array: string[];
  obj!: string[];
  storage!: string[];
  count: number;
  storage_count: number;
  Room_n: '';
  storage_n: '';
  rn: '';
  descn: '';
  description = "";
  roomname = "";
  flag = false;
  flag_show = true;
  result_obj: any;
  obj1!: HTMLElement;
  index: number;
  value!: string;
  hashval!: string;
  search_result: {};
  searched: number;
  Rooms!: {};
  news!: {};
  index_gen() {
    this.index += 1;
    this.value = "value" + this.index;
    this.hashval = "#" + this.value;
    console.log(this.value);
  }


  get room_name() {
    return this.registrationForm.get('Room_name');
  }

  get Description() {
    return this.registrationForm.get('Description');
  }
  get items() {
    return this.registrationForm.get('items') as FormArray;
  }
  get item_name() {
    return this.roomForm.get('item_name') as FormArray;
  }

  get Storage_name_list() {
    return this.roomForm.get('Storage_name_list') as FormArray;
  }

  // openForm() {
  //   var obj1 = document.getElementById('myForm');


  // }

  Search(){
   //this.searched = 1;
  console.log("In search")
  var  search_content:any = document.getElementById('search_id')
  this.appService.search_item(search_content.value)
  .subscribe(
    response=>{console.log(response)
      this.search_result = response;
      this.Rooms = Object.keys(this.search_result)
      // console.log(this.Rooms)
      this.news = Object.values(this.search_result)
      // console.log(this.news)
    }
    
  )

  this.openResults()

  }


  additem() {

    this.item_name.push(this.fb.control(''));
    this.count += 1;
    console.log(this.count);

  }
  deleteitem() {

    this.item_name.removeAt(this.count - 1);
    this.count -= 1;
    console.log(this.count);
  }

  //  addStorage(){
  //    this.storage_name.push(this.fb.control(''));
  //    this.storage_count +=1;
  //  }

  //  deleteStorage(){
  //    this.storage_name.removeAt(this.storage_count - 1);
  //    this.storage_count -= 1;
  //  }

  Submit = async () => {
    console.log("In submit room");
    console.log(this.roomForm.value);
    var itemId = document.getElementById('item_id');
    var storageID = document.getElementById('storage_id');

    if (storageID?.innerText == undefined) {
      console.log(itemId?.innerText)
      console.log(storageID?.innerText)
      console.log(this.roomForm.value.storage_name)
      console.log("Empty here")

    }
    // if(this.roomForm.value.storage_name == ''){
    //   console.log("NONE HERE")
    // }
    else {
      console.log("Entering Else")
      console.log(itemId?.innerText)
      console.log(storageID?.innerText)
      console.log(this.roomForm.value.storage_name)
      await this.insertRoom();
    }

    this.flag_show = true;
    this.flag = false;





  }

  EmptyOut(itemID, storageID) {
    //itemID.value = "";
    storageID.value = "";
    while (this.count > 0) {
      this.deleteitem();
    }
  }

  delete_Room(id) {
    var roomID = document.getElementsByClassName("card-body")
    console.log(id)
    this.appService.delete_Room_id(id)
      .subscribe(
        response => console.log("Response" + JSON.stringify(response)),
        error => console.log(error)
      )

   

  }

  ref() {
    window.location.reload();
    this.getAllRooms();
  }
  addStorage() {
    this.insertRoom();
    this.flag_show = false;
    this.flag = true;
    var itemId = document.getElementById('item_id');
    var storageID = document.getElementById('storage_id');
    this.EmptyOut(itemId, storageID);





    //this.insertRoom();
    // this.roomname = roomname.value;
    // console.log(roomname)
    // this.description = desc.value;
    //window.location.reload();



  }

  insertRoom() {


    console.log("In insert room");
    console.log(this.roomForm.value);
    this.appService.insertRoom(this.roomForm.value)
      .subscribe(
        response => console.log("Response" + JSON.stringify(response)),
        error => console.log(error)

      )





  }

  insertStorage() {
    console.log("In insert storage");
    console.log(this.storageForm.value);
    this.appService.insertStorage(this.storageForm.value)

  }
  insertItem() {
    console.log("In insert item");
    console.log(this.roomForm.value);
  }
  set_form_ele(form_element, val_string) {
    form_element.style.display = val_string;
  }

  openForm() {
    var form_element = document.getElementById("myForm")
    this.set_form_ele(form_element, "block");
  }

  openResults(){
    var form_element = document.getElementById("results_table")
    this.set_form_ele(form_element, "block");
    
  }

  closeForm() {
    var form_element = document.getElementById("myForm")
    this.set_form_ele(form_element, "none");

  }

  registrationForm = this.fb.group({
    Room_name: [''],
    Description: [''],
    storage_name: [''],
    items: this.fb.array([])


  });
  roomForm = this.fb.group({
    Room_name: ['', Validators.required],
    Description: ['',Validators.required],
    storage_area: this.fb.array([],Validators.required),
    storage_name: [''],
    items: this.fb.array([]),
    item_name: this.fb.array([]),
    Storage_name_list: this.fb.array([])

  });

  storageForm = this.fb.group({
    storage_name: [''],
    items: this.fb.array([])
  });

  itemsForm = this.fb.group({
    item_name: this.fb.array([])
  });

  constructor(private appService: RoomTaskService, private fb: FormBuilder) {
    this.dumiData_array = [];
    this.room = [];
    this.count = 0;
    this.storage_count = 0;
    this.storage_n = '';
    this.Room_n = '';
    this.descn = '';
    this.rn = '';
    this.index = 0;
    this.search_result = {};
    this.searched = 0;
    this.Rooms = [];
  }

  ngOnInit() {
    console.log("GETTING ALL ROOMS")
    this.getAllRooms();
  }

  title = 'angular-nodejs-example';

  getAllRooms() {

    console.log("here")
    this.appService.getAllRooms()
      .subscribe(
        result => { this.result_obj = result }
      )

    console.log(JSON.stringify(this.result_obj));


  }





}

