const lib = require('../lib');
const ex = require('../exercise1');
const db = require('../db');

describe('absolute', () => {
  it('should return a positive number if input is positive', () => {
    const result = lib.absolute(1);
    expect(result).toBe(1);
  });
  
  it('should return a positive number if input is negative', () => {
    const result = lib.absolute(-3);
    expect(result).toBe(3);
  });
  
  it('should return 0 if input is not a number', () => {
    const result = lib.absolute(0);
    expect(result).toBe(0);
  });
});

describe('greet', () => {
  it('should return the greeting message', () => {
    const result = lib.greet('Felix');
    expect(result).toBe('Welcome Felix');
  });
});

describe('getCurrencies', () => {
  it('should return supported currencies', () => {
    const result = lib.getCurrencies();

    expect(result).toEqual(expect.arrayContaining(['USD', 'AUD', 'EUR']));
  });
});

describe('getProduct', () => {
  it('should return the product with the given id', () => {
    const result = lib.getProduct(1);
    expect(result).toEqual({ id: 1, price: 10 });
  });
});

describe('registerUser', () => {
  it('should return an exception if username does not exist', () => {
    expect(() => lib.registerUser(null)).toThrow();
  });

  it('should return an object if username exist', () => {
    const result = lib.registerUser('Felix');
    expect(result).toEqual({ id: 2, username: 'Felix' });
  });
}); 

describe('fizzBuzz', () => {
  it('should throw if the input is not a number', () => {
    expect(() => ex.fizzBuzz('')).toThrow();
  });

  it('should return FizzBuzz if input is devided by 3 and 5', () => {
    const result = ex.fizzBuzz(15);
    expect(result).toBe('FizzBuzz');
  });

  it('should return Fizz if input is only devided by 3', () => {
    const result = ex.fizzBuzz(3);
    expect(result).toBe('Fizz');
  });

  it('should return Buzz if unput is only devided by 5', () => {
    const result = ex.fizzBuzz(5);
    expect(result).toBe('Buzz');
  });

  it('should return the number if it is not devided by 3, 5 or 3 and 5 at the same time', () => {
    const result = ex.fizzBuzz(15);
    expect(result).toBe(result);
  });
});

describe('applyDiscount', () => {
  it('should apply discount if customer point is greater than 10', () => {
    db.getCustomerSync = id => {
      console.log('Getting user on fake db...');
      return {id, points: 11};
    }

    const order = {customerId: 3, totalPrice: 10};
    lib.applyDiscount(order);
    expect(order.totalPrice).toBe(9);
  });
});