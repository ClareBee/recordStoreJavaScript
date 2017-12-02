var _ = require('lodash');

var RecordStore = function(name, city){
  this.name = name;
  this.city = city;
  this.inventory = [];
  this.balance = 0;
}

RecordStore.prototype = {
  addRecord: function(record){
    if(_.includes(this.inventory, record)){
      record.quantity += 1;
    }else{
      this.inventory.push(record);
    }
  },
  numOfRecords: function(){
    var total = 0;
    _.forEach(this.inventory, function(item){
      total += item.quantity;
    })
    return total;
  },
  listInventory: function(){
    var inventoryListed = _.map(this.inventory, function(item){
      return item.details();
    });
    return inventoryListed;
  },
  listInventoryNameTitle: function(){
    var briefInventory = _.map(this.inventory, function(item){
      return item.artist + " - " + item.title + " x " + item.quantity;
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
    if(_.includes(this.inventory, record) && record.quantity > 1){
        record.quantity -= 1;
      }
    else if(_.includes(this.inventory, record) && record.quantity === 1){
        _.remove(this.inventory, record);
      }
    this.balance += record.price;
  },
  financialReport: function(){
    var inventoryValue = _.sumBy(this.inventory, function(item){
      return item.price * item.quantity;
    });
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
