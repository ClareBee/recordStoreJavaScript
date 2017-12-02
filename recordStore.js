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
  listInventory: function(){
    var sorted = _.sortBy(this.inventory, "artist");
    return _.map(sorted, function(item){
      return item.details();
    });
  },
  listInventoryNameTitle: function(){
    var briefInventory = _.map(this.inventory, function(item){
      return item.artist + " - " + item.title;
    });
    return briefInventory;
  },
  // listInventoryNameTitle: function(){
  //   var briefInventory = _.map(this.inventory, function(item){
  //     var newEntry = {};
  //     newEntry[item.artist] = item.title;
  //     return newEntry;
  //   });
  //   return briefInventory;
  // },
  sellRecord: function(record){
    if(_.includes(this.inventory, record)){
        _.remove(this.inventory, record);
        this.balance += record.price;
      }else {
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
