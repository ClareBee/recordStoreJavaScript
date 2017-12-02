var _ = require('lodash');

var RecordStore = function(name, city, balance){
  this.name = name;
  this.city = city;
  this.inventory = [];
  this.balance = balance;
}

RecordStore.prototype = {
  addRecord: function(record){
    this.inventory.push(record);
  },
  listInventory: function(){
    var inventoryListed = _.map(this.inventory, function(item){
      return item.details();
    });
    return inventoryListed;
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
    this.balance -= record.price;
  }

}

module.exports = RecordStore;
