var assert = require('assert');
var RecordStore = require('../recordStore.js');
var Record = require('../record.js');

describe('record store tests', function(){
    var record, recordstore;

  beforeEach(function(){
    record = new Record("Bat For Lashes", "Daniel", "Alternative", 8);
    record2 = new Record("C Duncan", "Say", "Alternative", 6);
    recordstore = new RecordStore("Big Al's", "Glasgow", [], 0);
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
  it('should be able to list its inventory as string', function(){
    recordstore.addRecord(record);
    recordstore.addRecord(record2);
    assert.deepStrictEqual(recordstore.listInventory(), ["Daniel by Bat For Lashes. Its genre is Alternative and it costs £8.", "Say by C Duncan. Its genre is Alternative and it costs £6."]);
  });
  it('should be able to list its inventory by artist and title', function(){
    recordstore.addRecord(record);
    recordstore.addRecord(record2);
    assert.deepStrictEqual(recordstore.listInventoryNameTitle(), ["Bat For Lashes - Daniel", "C Duncan - Say"]);
  })
})
