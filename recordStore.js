var _ = require('lodash');

var RecordStore = function(name, city){
  this.name = name;
  this.city = city;
  this.inventory = [];
  this.balance = 0;
}

RecordStore.prototype = {
  addRecord: function(record){
      this.inventory.push(record);
  },
  numOfRecords: function(){
    return _.size(this.inventory);
  },
  numByTitle: function(title){
    var counted = [];
    this.inventory.forEach(function(item){
      if(item.title === title){
        counted.push(item);
      }
    });
    return _.size(counted);
  },
  listInventory: function(){
    var sorted = _.sortBy(this.inventory, "artist");
    return _.map(this.inventory, function(item){
      return item.details();
    });
  },
  listInventoryWithCounter: function(){
    var self = this;
    var listed = _.map(this.inventory, function(item){
      var counter = this.numByTitle(item.title);
      return item.artist + " - " + item.title + " x " + counter;
    }.bind(this));
    return _.uniq(listed);
  },
  listInventoryWithQuantity: function(){
    var sorted = _.groupBy(this.inventory, "artist");
    return basics = _.map(sorted, function(items, artist){
       var obj = {artist, count: items.length};
       return obj["artist"] + ": " + obj["count"] + " entries.";
    });
  },
  sellRecord: function(record, customer){
    if(_.includes(this.inventory, record)){
        customer.receivesGoods(record);
        _.remove(this.inventory, record);
        this.balance += record.price;
      } else {
        return "This record is not in stock."
      }
  },
  sendGoods: function(record){
    if(_.includes(this.inventory, record)){
      _.remove(this.inventory, record);
      this.balance += record.price;
    } else {
      return "This record is not in stock."
    }
  },
  financialReport: function(){
    var inventoryValue = _.sumBy(this.inventory, "price");
    return "Balance: £" + this.balance + ", Inventory Value: £" + inventoryValue;
  },
  byGenre: function(genre){
    var sorted = [];
    _.forEach(this.inventory, function(item){
      if(item.genre === genre){
        sorted.push(item);
      }
    });
    if(sorted.length > 0){
      return sorted;
    }else {
      return "Sorry, that genre is not available."
    }
  }

}

module.exports = RecordStore;
