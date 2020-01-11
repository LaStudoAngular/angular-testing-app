import ContactClass from './contact';

describe('Contact Class Tests', () => {
  let contact: ContactClass = null;

  beforeEach(() => {
    contact = new ContactClass();
  });

  it('should have a valid constructor', () => {
    expect(contact).not.toBeNull();
  });

  it('should have correct name', () => {
    const joddy = new ContactClass('Joddy');
    expect(joddy.name).toEqual('Joddy');
  });

  it('should set and get name correctly', () => {
    contact.name = 'John';
    expect(contact.name).toEqual('John');
  });

  it('should set and get id correctly', () => {
    contact.id = 2;
    expect(contact.id).toEqual(2);
  });

  it('should set and get email correctly', () => {
    contact.email = 'test.@gmail.com';
    expect(contact.email).toEqual('test.@gmail.com');
  });

  it('should set and get number correctly', () => {
    contact.number = '12';
    expect(contact.number).toEqual('12');
  });

  it('should set and get country correctly', () => {
    contact.country = 'Italy';
    expect(contact.country).toEqual('Italy');
  });

  it('should set and get favorite correctly', () => {
    contact.favorite = true;
    expect(contact.favorite).toBeTruthy();
  });

  afterEach(() => {
    contact = null;
  });
});
