var Record = function(artist, title, genre, price){
  this.artist = artist;
  this.title = title;
  this.genre = genre;
  this.price = price;
}

Record.prototype = {
  details: function(){
    return this.title + " by " + this.artist + ". Its genre is " + this.genre + " and it costs £" + this.price + ".";
  }
}

module.exports = Record;
