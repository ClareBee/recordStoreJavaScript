var _ = require('lodash');

var RecordCollector = function(name){
  this.name = name;
  this.collection = [];
  this.cash = 0;
}

RecordCollector.prototype = {
  getsRecord: function(record){
    if(_.includes(this.collection, record)){
      record.quantity += 1;
    } else {
      this.collection.push(record);
    }
  },
  recordNum: function(){
    var total = 0;
    _.forEach(this.collection, function(item){
      total += item.quantity;
    });
    return total;
  },
  sellsRecord: function(record){
    if(_.includes(this.collection, record) && record.collection > 1){
        record.quantity -= 1;
      }
    else if(_.includes(this.collection, record) && record.quantity === 1){
        _.remove(this.collection, record);
      }
    this.cash += record.price;
  }

}

module.exports = RecordCollector;
