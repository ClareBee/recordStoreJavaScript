var assert = require('assert');
var RecordStore = require('../recordstore.js');
var Record = require('../record.js');

describe('record store tests', function(){
    var record, recordstore;
  beforeEach(function(){
    var record = new Record("Bat For Lashes", "Daniel", "Alternative", 8);
    var recordstore = new RecordStore("Big Al's", "Glasgow", []);
  });

  xit('should have a name', function(){
    assert.strictEqual(recordstore.name, "Big Al's");
  });

  xit('should have a city', function(){
    assert.strictEqual(recordstore.city, "Glasgow");
  });
  xit('should have an empty inventory', function(){
    assert.deepStrictEqual(recordstore.inventory, []);
  });
})
