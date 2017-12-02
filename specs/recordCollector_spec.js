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
  it('should have a collection of records', function(){
    bob.getRecord(record);
    assert.strictEqual(bob.collection.length, 1);
  });
  it('should be able to sell a record', function(){
    bob.sellRecord(record);
    assert.strictEqual(bob.cash, 8);
    assert.strictEqual(bob.collection.recordNum(), 0);
  });
})
