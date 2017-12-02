var Record = function(artist, title, genre, price){
  this.artist = artist;
  this.title = title;
  this.genre = genre;
  this.price = price;
  this.quantity = 1;
}

Record.prototype = {
  details: function(){
    return this.quantity + " of " + this.title + " by " + this.artist + ". Its genre is " + this.genre + " and it costs £" + this.price + ".";
  }
}

module.exports = Record;
