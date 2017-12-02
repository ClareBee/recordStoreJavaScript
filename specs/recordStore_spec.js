var assert = require('assert');
var RecordStore = require('../recordStore.js');
var Record = require('../record.js');
var RecordCollector = require('../recordCollector.js');

describe('record store tests', function(){
    var record, record2, recordstore, customer;

  beforeEach(function(){
    record = new Record("Bat For Lashes", "Daniel", "Alternative", 8);
    record2 = new Record("C Duncan", "Say", "Alternative", 6);
    recordstore = new RecordStore("Big Al's", "Glasgow");
    customer = new RecordCollector("Bob");
    customer.getsCash(20);
  });

  it('should have a name', function(){
    assert.strictEqual(recordstore.name, "Big Al's");
  });

  it('should have a city', function(){
    assert.strictEqual(recordstore.city, "Glasgow");
  });
  it('should have an empty inventory', function(){
    assert.deepStrictEqual(recordstore.inventory, []);
  });
  it('should have a balance', function(){
    assert.strictEqual(recordstore.balance, 0);
  });
  it('should be able to add a record to its inventory', function(){
    recordstore.addRecord(record);
    assert.strictEqual(recordstore.inventory.length, 1);
  });
  it('should be able to increase quantity when the same record is added twice', function(){
    recordstore.addRecord(record);
    recordstore.addRecord(record);
    assert.strictEqual(recordstore.numOfRecords(), 2);
    assert.strictEqual(recordstore.inventory.length, 2);
  });
  it('should be able to list its inventory as string', function(){
    recordstore.addRecord(record);
    recordstore.addRecord(record2);
    assert.deepStrictEqual(recordstore.listInventory(), ["Bat For Lashes - Daniel. Genre: Alternative. Price: £8.", "C Duncan - Say. Genre: Alternative. Price: £6."]);
  });
  it('should be able to include a counter in the inventory', function(){
    recordstore.addRecord(record);
    recordstore.addRecord(record);
    recordstore.addRecord(record2);
    assert.deepStrictEqual(recordstore.listInventoryWithCounter(), ["Bat For Lashes - Daniel x 2", "C Duncan - Say x 1"]);
  })
  it('should be able to include quantity where there are duplicates', function(){
    recordstore.addRecord(record);
    recordstore.addRecord(record);
    recordstore.addRecord(record2);
    recordstore.addRecord(record2);
    assert.deepStrictEqual(recordstore.listInventoryWithQuantity(), ["Bat For Lashes: 2 entries.", "C Duncan: 2 entries."]);
  });
  it('should be able to count duplicates', function(){
    recordstore.addRecord(record);
    recordstore.addRecord(record);
    recordstore.addRecord(record2);
    assert.strictEqual(recordstore.numByTitle("Daniel"), 2);
    assert.strictEqual(recordstore.numByTitle("Say"), 1);
  });
  it('should be able to sell a record and adjust the balance', function(){
    var recordstore2 = new RecordStore("Big Sue's", "Aberdeen");
    recordstore2.addRecord(record);
    recordstore2.sellRecord(record, customer);
    assert.strictEqual(recordstore2.balance, 8);
    assert.strictEqual(customer.cash, 12);
  });
  it('should not be able to sell a record it does not have', function(){
    assert.strictEqual(recordstore.sellRecord(record, customer), "This record is not in stock.");
  });
  it('should be able to give a financial report, showing balance and value of inventory', function(){
    assert.strictEqual(recordstore.financialReport(), "Balance: £0, Inventory Value: £0");
  });
  it('should be able to give a financial report, as above, when store has records', function(){
    recordstore.addRecord(record);
    recordstore.addRecord(record2);
    assert.strictEqual(recordstore.financialReport(), "Balance: £0, Inventory Value: £14");
  });
  it('should be able to give a financial report, as above when store has made sales', function(){
    recordstore.addRecord(record);
    recordstore.addRecord(record2);
    recordstore.sellRecord(record, customer);
    assert.strictEqual(recordstore.financialReport(), "Balance: £8, Inventory Value: £6");
    assert.strictEqual(customer.cash, 12);
  });
  it('should be able to carry out a search by genre', function(){
    record3 = new Record("Cosmopolitan", "Mome", "Electronic", 9);
    recordstore.addRecord(record);
    recordstore.addRecord(record2);
    recordstore.addRecord(record3);
    assert.deepStrictEqual(recordstore.byGenre("Alternative"), [record, record2]);
    assert.deepStrictEqual(recordstore.byGenre("Electronic"), [record3]);
    assert.deepStrictEqual(recordstore.byGenre("Heavy Metal"), "Sorry, that genre is not available.");
  });
})
