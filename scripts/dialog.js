/*
 * This is the Original source licese, but the code has been modified by aaron mcleod
 * Original author:
 * Neverwell Moor, a fantasy action RPG
 * Copyright (C) 2012  Jason Oster
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/* Dialog box */
Game.dialog = function dialog(script, callback) {
  var background = me.loader.getImage('dialog');
  var font = new me.Font("Verdana", 14, "#eee");

  var dialogBox = new Game.DialogObject(
    // x, y
    20, 30,

    // Background image.
    background,

    // Text to display.
    script,

    // width, height.
    440, 100,

    // Text offset x, y.
    12, 12,

    // Font to display it in.
    font,

    // Which key to watch for.
    "action",

    // What to do when dialog has closed.
    callback
  );
  me.game.add(dialogBox, 10000);
  me.game.sort();
};


Game.DialogObject = me.SpriteObject.extend({
  init: function (x, y, background, dialog, widthText, heightText, offsetTextX, offsetTextY, font, tagKey, callback) {
    this.pos = new me.Vector2d(x, y);
    this.nameOffset = 80;
    this.background = background;
    this.font = font;
    this.tagKey = tagKey;
    // offset multiplied by 3 for buffer
    this.firstLineWidthText = 280;
    this.widthText = widthText;
    this.heightText = heightText;
    this.rowCount = Math.floor(this.heightText / (this.font.height * 1.1));
    this.offsetTextX = offsetTextX;
    this.offsetTextY = offsetTextY;
    this.dialog = dialog;
    this.counter = 0;
    this.rows = [ this.getWords(this.dialog[0]) ];
    this.currentRow = 0;
    this.callback = callback;

    this.parent(this.pos.x, this.pos.y, this.background, this.widthText, this.heightText);
  },

  draw: function (context, rect) {
    this.parent(context, rect);
    var dialog = this.dialog[this.counter];
    if (typeof(dialog) !== 'undefined') {
      // Convert screen coordinates to world coordinates.
      var map_pos = me.game.currentLevel.pos;
      context.drawImage(this.background, this.pos.x - map_pos.x, this.pos.y - map_pos.y);
      var offset = 0;
      for (var i = 0; i < this.rowCount; i++) {
        if (typeof(this.rows[this.counter][this.currentRow + i]) !== 'undefined') {
          var offsetText = 0;
          if(i == 0) {
            offsetText = this.nameOffset;
            dialog.font.draw(context, dialog.name, this.pos.x + this.offsetTextX - map_pos.x, this.pos.y + this.offsetTextY - map_pos.y + offset);  
          }
          this.font.draw(
            context,
            this.rows[this.counter][this.currentRow + i],
            this.pos.x + this.offsetTextX - map_pos.x + offsetText,
            this.pos.y + this.offsetTextY - map_pos.y + offset
          );
          offset += (this.font.height * 1.1);
        }
      }
    }
  },

  getWords: function (obj) {
    var totalSize = 0;
    var wordSize = 0;
    var substrings = [];
    var substringsCounter = 0;
    var counter = 0;
    var words = obj.text.split(" ");
    var lineWidth = this.firstLineWidthText;
    while (typeof(words[counter]) !== 'undefined') {
      wordSize = this.font.measureText(me.video.getSystemContext(), words[counter] + " ").width;
      if (counter != 0 && wordSize + totalSize > lineWidth) {
        totalSize = wordSize;
        substringsCounter++;
        substrings[substringsCounter] = words[counter];
        if(lineWidth == this.firstLineWidthText) {
          lineWidth = this.widthText;
        }
      }
      else {
        totalSize += wordSize;
        if (typeof(substrings[substringsCounter]) === 'undefined') {
          substrings[substringsCounter] = words[counter];
        }
        else {
          substrings[substringsCounter] += " " + words[counter];
        }
      }
      counter++;
    }
    return substrings;
  },

  update: function() {
    this.parent(this);
    if (me.input.isKeyPressed(this.tagKey)) {
      if (typeof(this.rows[this.counter][this.currentRow + this.rowCount]) !== 'undefined') {
        this.currentRow += this.rowCount;
      }
      else {
        this.currentRow = 0;
        this.counter++;
        if (typeof(this.dialog[this.counter]) === 'undefined') {
          if (typeof(this.callback) !== 'undefined' && this.callback != null) {
            this.callback();
          }
          me.game.remove(this);
        }
        else  {
          this.rows[this.counter] = this.getWords(this.dialog[this.counter]);
        }
      }
    }
    return true;
  }
});