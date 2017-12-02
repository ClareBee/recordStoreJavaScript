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
    this.collection.push(record);
  },
  recordNum: function(){
    return _.size(this.collection);
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
    return _.sumBy(this.collection, "price");
  },
  checkValueByGenre: function(genre){
    return _.sumBy(this.collection, function(item){
        if(item.genre === genre){
          return item.price;
        };
      });
  },
  mostValuable: function(){
    return _.maxBy(this.collection, "price");
  },
  orderRecordsByPriceAsc: function(){
    return _.orderBy(this.collection, ["price"], ["asc"]);
  },
  orderRecordsByPriceDesc: function(){
    return _.orderBy(this.collection, ["price"], ["desc"]);
  },
  compareCollection: function(collector){
    var higher = {};
    var lower = {};
    if(this.checkValue() > collector.checkValue()){
      higher = this;
      lower = collector;
    } else {
      higher = collector;
      lower = this;
    }

    return "At £" + higher.checkValue() + ", " + higher.name + "'s collection is worth £" + (higher.checkValue() - lower.checkValue()) + " more than " + lower.name + "'s.";
  }


}

module.exports = RecordCollector;
