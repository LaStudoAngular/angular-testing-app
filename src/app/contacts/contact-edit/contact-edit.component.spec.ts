import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';

import {
  Contact,
  ContactService,
  FavoriteIconDirective,
  InvalidEmailModalComponent,
  InvalidPhoneNumberModalComponent,
} from '../shared';
import { AppMaterialModule } from '../../app.material.module';
import { ContactEditComponent } from './contact-edit.component';
import '../../../material-app-theme.scss';

describe('ContactEditComponent Tests', () => {
  let fixture: ComponentFixture<ContactEditComponent>;
  let component: ContactEditComponent;
  let rootElement: DebugElement;
  const contactServiceStub = {
    contact: {
      id: 1,
      name: 'jessy',
    },
    save: async function(contact: Contact) {
      component.contact = contact;
    },
    getContact: async function() {
      component.contact = this.contact;
      return this.contact;
    },
    updateContact: async function(contact: Contact) {
      component.contact = contact;
    },
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ContactEditComponent,
        FavoriteIconDirective,
        InvalidEmailModalComponent,
        InvalidPhoneNumberModalComponent
      ],
      imports: [FormsModule, RouterTestingModule, NoopAnimationsModule, AppMaterialModule ],
      providers: [{ provide: ContactService, useValue: contactServiceStub }]
    });
    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [InvalidEmailModalComponent, InvalidPhoneNumberModalComponent]
      }
    });
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(ContactEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    rootElement = fixture.debugElement;
  });
  describe('saveContact method test', () => {
    it('should display a contact name after contact is set', fakeAsync(() => {
      const newContact: Contact = {
        id: 2,
        name: 'kevin'
      };
      component.isLoading = false;
      component.saveContact(newContact);
      fixture.detectChanges();
      const inputName = rootElement.query(By.css('.contact-name'));
      tick();
      expect(inputName.nativeElement.value).toBe('kevin');
    }));
  });
  describe('loadContact method test', () => {
    it('should display contact name after load contact', fakeAsync(() => {
      component.isLoading = false;
      component.loadContact();
      fixture.detectChanges();
      const inputName = rootElement.query(By.css('.contact-name'));
      tick();
      expect(inputName.nativeElement.value).toEqual('jessy');
    }));
  });
  describe('updateContact method test', () => {
    it('should display contact name after update contact', fakeAsync(() => {
      const updateContact: Contact = {
        id: 1,
        name: 'arnold',
        email: 'arnold@test.com',
        number: '1231231230'
      };
      component.contact = {
        id: 3,
        name: 'jordan',
        email: 'jordan@test.com',
        number: '1231231230'
      };

      component.isLoading = false;
      fixture.detectChanges();
      const nameInput = rootElement.query(By.css('.contact-name'));
      tick();
      expect(nameInput.nativeElement.value).toBe('jordan');

      component.updateContact(updateContact);
      fixture.detectChanges();
      tick(100);
      expect(nameInput.nativeElement.value).toBe('arnold');
    }));
    it('should not update contact name when email is invalid', fakeAsync(() => {
      const updateContact: Contact = {
        id: 1,
        name: 'colombo',
        email: 'colombo@mail',
        number: '1231231230'
      };

      component.contact = {
        id: 6,
        name: 'jordan',
        email: 'jordan@test.com',
        number: '1231231230'
      };
      component.isLoading = false;
      fixture.detectChanges();
      const nameInput = rootElement.query(By.css('.contact-name'));
      tick();
      expect(nameInput.nativeElement.value).toBe('jordan');

      component.updateContact(updateContact);
      fixture.detectChanges();
      tick(100);
      expect(nameInput.nativeElement.value).toBe('jordan');
    }));
    it('should not update contact name if phone number is invalid', fakeAsync(() => {
      const contact: Contact = {
        id: 1,
        name: 'frank',
        email: 'frank@mail.ru',
        number: '123123123099999'
      };
      component.contact = {
        id: 5,
        name: 'jake',
        email: 'jake@test.com',
        number: '1231231230'
      };
      component.isLoading = false;
      fixture.detectChanges();

      const inputContact = rootElement.query(By.css('.contact-name'));
      tick();
      expect(inputContact.nativeElement.value).toBe('jake');

      component.updateContact(contact);
      fixture.detectChanges();
      tick(500);
      expect(inputContact.nativeElement.value).toBe('jake');
    }));
  });
});
