var assert = require('assert');
var Record = require ('../record.js');

describe("record test", function(){

  beforeEach(function(){
    record = new Record("C Duncan", "Say", "Alternative", 6);
  });
  xit('should have an artist', function(){
    assert.strictEqual(record.artist, "C Duncan");
  });
  xit('should have a title', function(){
    assert.strictEqual(record.title, "Say");
  });
  xit('should have a genre', function(){
    assert.strictEqual(record.genre, "Alterntative");
  });
  xit('should have a price', function(){
    assert.strictEqual(record.price, 6);
  });
})
