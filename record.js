var Record = function(artist, title, genre, price){
  this.artist = artist;
  this.title = title;
  this.genre = genre;
  this.price = price;
}

Record.prototype = {
  details: function(){
    return this.artist + " - " + this.title + ". Genre: " + this.genre + ". Price: £" + this.price + ".";
  }
}

module.exports = Record;
