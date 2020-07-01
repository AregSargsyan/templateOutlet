import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {

  users: Array<User> = [
    { id: 1, age: 29, name: "Areg" },
    { id: 2, age: 26, name: "Rafo" },
    { id: 3, age: 24, name: "Jano" },
    { id: 4, age: 21, name: "Dav" },
    { id: 5, age: 27, name: "Aram" }
  ]

  constructor() { }

  getUsers(): Observable<User[]>  {
    return new Observable((observer)=>{
      setTimeout(() => {
        observer.next(this.users)
      }, 1000);
    })
  }
}
