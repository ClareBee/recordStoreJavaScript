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
    if(_.includes(this.collection, record)){
      _.remove(this.collection, record);
      this.cash += record.price;
    } else {
      return "You don't have this record in your collection."
    };
  },
  buysRecord: function(record, recordstore){
    if(this.cash > record.price){
      recordstore.sendGoods(record);
      this.cash -= record.price;
      this.collection.push(record);
    } else if(this.cash < record.price){
      return "Sorry, not enough cash!"
    };
  },
  receivesGoods: function(record){
    this.collection.push(record);
    this.cash -= record.price;
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
