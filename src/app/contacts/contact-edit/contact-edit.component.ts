import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef, MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';

import {
  Contact,
  ContactService,
  InvalidEmailModalComponent,
  InvalidPhoneNumberModalComponent,
  countryDialingCodes,
} from '../shared';
import { constants } from './contact-edit.constants';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css'],
  providers: [MatSnackBar],
})
export class ContactEditComponent implements OnInit, OnDestroy {
  public loadingContactMessage: string = constants.LOADING_CONTACT_MESSAGE;
  public noContactFoundMessage: string = constants.NO_CONTACT_FOUND_MESSAGE;
  public isLoading = true;
  public contact: Contact = null;
  public countryDialingCodes: string[] = this.getKeys(countryDialingCodes);

  private modalRef: MatDialogRef<any>;

  constructor(
    private contactService: ContactService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.loadContact();
  }

  ngOnDestroy(): void {
    if (this.modalRef) {
      this.modalRef.close();
    }
  }

  public saveContact(contact: Contact): void {
    contact.favorite = !contact.favorite;
    this.contactService.save(contact);
  }

  public loadContact(): void {
    this.route.params.subscribe((params: Params) => {
      const id: number = Number(params['id']);
      this.contactService.getContact(id).then((contact: Contact) => {
        this.isLoading = false;
        this.contact = contact;
      });
    });
  }

  public updateContact(contact: Contact): void {
    if (!this.isContactValid(contact)) {
      return;
    }

    this.displayEditSnackBar();
    this.contactService.save(contact).then(() => {
      this.router.navigate(['/']);
    });
  }

  private getKeys(object: Object): string[] {
    return Object.keys(object).map((key, value) => key);
  }

  private displayEditSnackBar(): void {
    const message = 'Contact updated';
    const snackConfig: MatSnackBarConfig = { duration: 2000 };
    const actionLabel = '';

    this.snackBar.open(message, actionLabel, snackConfig);
  }

  private isEmailValid(email: string): boolean {
    return email === '' || (email !== '' && email.includes('@') && email.includes('.'));
  }

  private isPhoneNumberValid(phoneNumber: string): boolean {
    return (
      phoneNumber === '' ||
      (phoneNumber !== '' && phoneNumber.length === 10 && /^\d+$/.test(phoneNumber))
    );
  }

  private isContactValid(contact: Contact): boolean {
    if (!this.isEmailValid(contact.email)) {
      this.modalRef = this.dialog.open(InvalidEmailModalComponent);
      return false;
    }

    if (!this.isPhoneNumberValid(contact.number)) {
      this.modalRef = this.dialog.open(InvalidPhoneNumberModalComponent);
      return false;
    }

    return true;
  }
}
