var assert = require('assert');
var Record = require ('../record.js');

describe("record test", function(){

  beforeEach(function(){
    record = new Record("C Duncan", "Say", "Alternative", 6);
  });
  it('should have an artist', function(){
    assert.strictEqual(record.artist, "C Duncan");
  });
  it('should have a title', function(){
    assert.strictEqual(record.title, "Say");
  });
  it('should have a genre', function(){
    assert.strictEqual(record.genre, "Alternative");
  });
  it('should have a price', function(){
    assert.strictEqual(record.price, 6);
  });
  it('should show its details as a string', function(){
    assert.strictEqual(record.details(), "C Duncan - Say. Genre: Alternative. Price: £6.")
  })
})
