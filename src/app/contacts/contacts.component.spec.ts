import { ContactsComponent } from './contacts.component';
import { Contact } from './shared';

describe('Contact Components Test', () => {
  let contactsComponent: ContactsComponent = null;

  beforeEach(() => {
    contactsComponent = new ContactsComponent();
  });

  it('should create instance of ContactsComponent correctly', () => {
    expect(contactsComponent).not.toBeNull();
  });

  it('should be no contacts if there is no data', () => {
    expect(contactsComponent.contacts.length).toBe(0);
  });

  it('should be contacts in contacts array if there is data', () => {
    const contactsList: Contact[] = [];
    const contact: Contact = {
      id: 1,
      name: 'John',
      email: 'john@gmail.com',
      number: '1',
      country: 'USA',
      favorite: false,
    };
    contactsList.push(contact);
    contactsComponent.contacts = contactsList;
    expect(contactsComponent.contacts.length).toBe(1);
  });
});
