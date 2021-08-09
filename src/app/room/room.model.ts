export class Room
{
     room_name: string;
     description: string;
     storage_name: string[];
     
    
     constructor(room_name: string, description: string,storage_name: string[]) 
     {
     this.room_name = room_name;
     this.description=  description;
     this.storage_name = storage_name;

     
     }


    
}