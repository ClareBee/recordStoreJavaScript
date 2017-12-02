var Record = function(artist, title, genre, price){
  this.artist = artist;
  this.title = title;
  this.genre = genre;
  this.price = price;
}

Record.prototype = {
  details: function(){
    return "This record is " + this.title + " by " + this.artist + ", its genre is " + this.genre + " and it costs £" + this.price + ".";
  }
}

module.exports = Record;
