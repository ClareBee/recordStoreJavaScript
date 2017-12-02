var assert = require('assert');
var RecordCollector = require('../recordCollector.js');
var Record = require('../record.js');

describe('record collector', function(){

  beforeEach(function(){
    bob = new RecordCollector("Bob");
    record = new Record("Say", "C Duncan", "Alternative", 8);
  });
  it('should have a name', function(){
    assert.strictEqual(bob.name, "Bob");
  });
  it('should be able to get cash from the atm', function(){
    bob.getsCash(20);
    assert.strictEqual(bob.cash, 20);
  });
  it('should have an empty collection first', function(){
    assert.strictEqual(bob.recordNum(), 0);
  });
  it('should have a collection of records', function(){
    bob.getsRecord(record);
    assert.strictEqual(bob.collection.length, 1);
    assert.strictEqual(bob.recordNum(), 1);
  });
  it('should be able to sell a record', function(){
    bob.sellsRecord(record);
    assert.strictEqual(bob.cash, 8);
    assert.strictEqual(bob.recordNum(), 0);
  });
  it('should be able to buy a record', function(){
    bob.getsCash(10);
    bob.buysRecord(record);
    assert.strictEqual(bob.cash, 2);
    assert.strictEqual(bob.recordNum(), 1);
  });
  it('should not be able to buy without cash', function(){
    assert.strictEqual(bob.buysRecord(record), "Sorry, not enough cash!");
  })

})
