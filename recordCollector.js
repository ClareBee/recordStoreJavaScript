var _ = require('lodash');

var RecordCollector = function(name){
  this.name = name;
  this.collection = [];
  this.cash = 0;
}

RecordCollector.prototype = {
  getsCash: function(cash){
    this.cash += cash;
  },
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
  },
  buysRecord: function(record){
    if(_.includes(this.collection, record) && this.cash > record.price){
      record.quantity += 1;
      this.cash -= record.price;
    } else if(this.cash > record.price){
      this.collection.push(record);
      this.cash -= record.price;
    } else {
      return "Sorry, not enough cash!"
    }
  }

}

module.exports = RecordCollector;
