var assert = require('assert');
var RecordCollector = require('../recordCollector.js');
var Record = require('../record.js');
var RecordStore = require('../recordStore.js');

describe('record collector', function(){
  var bob, record, record2, recordstore;

  beforeEach(function(){
    bob = new RecordCollector("Bob");
    record = new Record("Say", "C Duncan", "Alternative", 8);
    record2 = new Record("Daniel", "Bat For Lashes", "Alternative", 6);
    recordstore = new RecordStore("Big Al's", "Glasgow");
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
    assert.strictEqual(bob.recordNum(), 1);
  });
  it('should be able to sell a record', function(){
    bob.getsRecord(record);
    bob.sellsRecord(record);
    assert.strictEqual(bob.cash, 8);
    assert.strictEqual(bob.recordNum(), 0);
  });
  it('should be able to buy a record', function(){
    bob.getsCash(10);
    recordstore.addRecord(record);
    bob.buysRecord(record, recordstore);
    assert.strictEqual(bob.cash, 2);
    assert.strictEqual(bob.recordNum(), 1);
    assert.strictEqual(recordstore.balance, 8);
    assert.strictEqual(recordstore.numOfRecords(), 0);
  });
  it('should not be able to buy without cash', function(){
    assert.strictEqual(bob.buysRecord(record, recordstore), "Sorry, not enough cash!");
  });
  it('should be able to see value of collection', function(){
    bob.getsCash(10);
    recordstore.addRecord(record);
    bob.buysRecord(record, recordstore);
    assert.strictEqual(bob.recordNum(), 1);
    assert.strictEqual(bob.checkValue(), 8);
  });
  it('should be able to view value by genre', function(){
    bob.getsCash(30);
    recordstore.addRecord(record);
    recordstore.addRecord(record2);
    bob.buysRecord(record, recordstore);
    bob.buysRecord(record2, recordstore);
    assert.strictEqual(bob.checkValueByGenre("Alternative"), 14);
  });
  it('should be able to find most valuable record', function(){
    bob.getsRecord(record);
    bob.getsRecord(record2);
    assert.strictEqual(bob.mostValuable(), record);
  }),
  it('should be able to sort by value, ascending', function(){
    bob.getsRecord(record);
    bob.getsRecord(record2);
    assert.deepStrictEqual(bob.orderRecordsByPriceAsc(), [record2, record]);
  });
  it('should be able to sort by value, descending', function(){
    bob.getsRecord(record);
    bob.getsRecord(record2);
    assert.deepStrictEqual(bob.orderRecordsByPriceDesc(), [record, record2]);
  });
  it('should be able to compare collection value to another collector', function(){
    var bill = new RecordCollector("Bill");
    bill.getsRecord(record);
    bill.getsRecord(record);
    bob.getsRecord(record2);
    bob.getsRecord(record2);
    assert.strictEqual(bill.checkValue(), 16);
    assert.strictEqual(bob.checkValue(), 12);
    assert.strictEqual(bob.compareCollection(bill), "At £16, Bill's collection is worth £4 more than Bob's.")
  });

})
