import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../../shared/user.model';
import { UamFormServices } from '../uam-form.services';
import { MessageService } from 'src/app/shared/message.service';

@Component({
  selector: 'app-new-uam-form',
  templateUrl: './new-uam-form.component.html',
  styleUrls: ['./new-uam-form.component.scss'],
})
export class NewUamFormComponent implements OnInit {
  //Optional value that can be passed in
  @Input() selectedUser: User;


  @Output() formSubmit: EventEmitter<User> = new EventEmitter();
  @Output() cancel: EventEmitter<void> = new EventEmitter();

  newUamForm = this.fb.group({
    owner: [this.selectedUser, Validators.required]
  });

  listOfUsers: User[] = [];

  constructor(
    private fb: FormBuilder,
    private uamFormServices: UamFormServices,
    private messageService: MessageService) {}

  ngOnInit(): void {
    this.uamFormServices.loadUsers(null).subscribe(
        (val)=> {
          this.listOfUsers = val;
        },
        (error: any)=> {
          this.messageService.showErrorWithDetailsTst(  error.error.resolution,
                                                        error.error.error);
        }
    );
  }

  onSubmit(form: FormGroup): void {
    this.formSubmit.emit(form.value.owner);
  }

  onClickCancel(): void {
    this.cancel.emit();
  }

  compareUsers(cat1: User, cat2: User): boolean {
    return cat1 && cat2 && cat1.userCreds === cat2.userCreds;
  }
}
