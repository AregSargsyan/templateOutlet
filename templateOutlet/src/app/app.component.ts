import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MockDataService } from './mock-data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from './user.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @ViewChild('redOnlyTemplate') redOnlyTemplate: TemplateRef<any>
  @ViewChild('editTemplate') editTemplate: TemplateRef<any>

  users: Array<User>
  myForm: FormGroup;
  editedUserID = null;


  constructor(private service: MockDataService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.service.getUsers().subscribe((users: User[]) => {
      this.users = users;
    })
  }

  loadTemplate(user: User) {
    if (user && this.editedUserID == user.id) {
      return this.editTemplate

    }
    else {
      return this.redOnlyTemplate

    }
  }

  editUser(user) {

    this.myForm = this.formBuilder.group({
      id: [user.id, [Validators.required]],
      age: [user.age, [Validators.required]],
      name: [user.name]
    });
    this.editedUserID = user.id;


  }

  submit() {
    for (let key in this.users) {
      if (this.users[key].id == this.editedUserID) {
        this.users[key] = this.myForm.value
        break;
      }
    }
    this.editedUserID = null;
  }
  cancel() {
    this.editedUserID = null;
  }
  deleteUser(user) {
    for (let key in this.users) {
      if (this.users[key].id == user.id) {
        const el = +key;
        this.users.splice(el,1)
        break;
      }
    }
  }

}
