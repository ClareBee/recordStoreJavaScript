var assert = require('assert');
var RecordCollector = require('../recordCollector.js');

describe('record collector', function(){
  
  beforeEach(function(){
    bob = new RecordCollector("Bob");
  });
  it('should have a name', function(){
    assert.strictEqual(bob.name, "Bob");
  });
})
