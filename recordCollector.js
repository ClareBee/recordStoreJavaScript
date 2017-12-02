var RecordCollector = function(name){
  this.name = name;
  this.collection = [];
  this.cash = 0;
}

RecordCollector.prototype = {
  sellRecord: function(record){
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
