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
  buysRecord: function(record, recordstore){
    if(_.includes(this.collection, record) && this.cash > record.price && _.includes(recordstore.inventory, record)){
      record.quantity += 1;
      this.cash -= record.price;
      recordstore.sellRecord(record);
    } else if((this.cash > record.price) && _.includes(recordstore.inventory, record)){
      this.collection.push(record);
      this.cash -= record.price;
      recordstore.sellRecord(record);
    } else if(this.cash < record.price){
      return "Sorry, not enough cash!"
    } else {
      return "Sorry this store doesn't have that record in stock."
    }
  },
  checkValue: function(){
    var totalValue = 0;
    _.forEach(this.collection, function(item){
      totalValue += (item.quantity * item.price);
    })
    return totalValue;
  },
  checkValueByGenre: function(genre){
    var subtotal = 0;
    _.forEach(this.collection, function(item){
      if(item.genre === genre){
        subtotal += item.price;
      }
    });
    return subtotal;
  }

}

module.exports = RecordCollector;
