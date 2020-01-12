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
});
