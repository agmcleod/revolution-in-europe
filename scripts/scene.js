Game.Scene = Object.extend({
  init: function(dialogues) {
    this.dialogues = dialogues;
    this.startDialogue = false;
  },

  cleanup: function() {
    me.input.unbindTouch();
    me.input.unbindKey(me.input.KEY.ENTER);
    me.game.viewport.reset();
    me.game.removeAll();
  },

  load: function() {
    me.input.bindKey(me.input.KEY.ENTER, 'action', true);
    me.input.bindTouch(me.input.KEY.ENTER);
  },

  update: function() {
    if(this.startDialogue) {
      Game.dialog(this.dialogues[0].dialogue, this.dialogues[0].callback);
      this.startDialogue = false;
    }
    return true;
  }
});

Game.IntroScene = Game.Scene.extend({
  init: function() {
    var _this = this;
    var dialogues = [{
      dialogue: [{
        name: "Kevin:",
        text: "I can't believe we're in London!",
        font: Game.playScreen.kevinFont
      }, {
        name: "Aaron:",
        text: "So much nicer than back home.",
        font: Game.playScreen.aaronFont,
      }, {
        name: "Shannon:",
        text: "Well guys, shall we go?",
        font: Game.playScreen.shannonFont
      }, {
        name: "Kevin:",
        text: "Sounds good. Hey Aaron, bet you I can run up all those stairs.",
        font: Game.playScreen.kevinFont
      }, {
        name: "Aaron",
        text: "You always out ran me as a kid. Bring it!",
        font: Game.playScreen.aaronFont
      }],
      callback: function() {
        Game.playScreen.race = new Game.Race();
        _this.cleanup();
      }
    }];
    this.parent(dialogues);

    this.train = Game.atlas.createSpriteFromName('subway.png');
    this.train.pos = new me.Vector2d(-500, 72);
    this.background = Game.atlas.createSpriteFromName('tube.png');
    this.background.pos = new me.Vector2d(0, 0);
    this.setupColumns();
    this.playersStaged = false;
  },

  cleanup: function() {
    this.parent();
    Game.playScreen.loadRace();
  },

  load: function() {
    this.parent();
    me.game.add(this.background, 1);
    me.game.add(this.train, 10);
    me.game.add(this.columns[0], 20);
    me.game.add(this.columns[1], 20);
    me.game.sort();
  },

  setupColumns: function() {
    var colOne = Game.atlas.createSpriteFromName('column.png');
    colOne.pos = new me.Vector2d(90, 64);
    var colTwo = Game.atlas.createSpriteFromName('column.png');
    colTwo.pos = new me.Vector2d(370, 64);
    this.columns = [colOne, colTwo];
  },

  stagePlayers: function() {
    this.playersStaged = true;
    for(var i = 0; i < Game.playScreen.players.length; i++) {
      me.game.add(Game.playScreen.players[i], 30);
    }
    me.game.sort();
  },

  update: function() {
    this.parent();
    if(this.train.pos.x < -20) {
      this.train.pos.x += 10;
    }
    else if(!this.playersStaged) {
      this.stagePlayers();
      this.startDialogue = true;
    }
  }
});

Game.AfterRaceScene = Game.Scene.extend({
  init: function(i) {
    var first = {};
    var _this = this;
    if(i == 0) {
      first.dialogue = [{
        name: "Aaron",
        text: "Wow, can't believe that I beat you!",
        font: Game.playScreen.aaronFont
      }, {
        name: "Kevin",
        text: "Indeed",
        font: Game.playScreen.kevinFont
      }];
    } 
    else {
      first.dialogue = [{
        name: "Kevin",
        text: "Haha, well good try!",
        font: Game.playScreen.kevinFont
      }, {
        name: "Aaron",
        text: "Thanks. I have to say that it's nice being out here, with such modest weather",
        font: Game.playScreen.aaronFont
      }];
    }
    var second = {
      dialogue: [{
        name: "Shannon",
        text: "It's so beautiful out here, you guys done being kids?",
        font: Game.playScreen.shannonFont
      }, {
        name: "Aaron",
        text: "Of course! Lets head to the hotel, I think I need some sleep for this jetlag",
        font: Game.playScreen.aaronFont
      }],
      callback: function() {
        _this.cleanup();
        Game.playScreen.setScene(3);
      }
    };
    first.callback = function() {
      Game.playScreen.players[2].visible = true;
      Game.playScreen.players[3].visible = true;
      Game.dialog(second.dialogue, second.callback);
    }
    var dialogues = [first, second];
    this.parent(dialogues);
  },

  load: function() {
    this.parent();
    this.startDialogue = true;
    var players = Game.playScreen.players;
    var viewportHeight = me.game.viewport.getHeight();
    players[0].makeStill();
    players[1].makeStill();
    players[2].visible = false;
    players[3].visible = false;

    players[0].pos.x = 40;
    players[0].pos.y = viewportHeight - 148;
    players[1].pos.x = 110;
    players[1].pos.y = viewportHeight - 148;
    players[2].pos.x = 180;
    players[2].pos.y = viewportHeight - 148;
    players[3].pos.x = 250;
    players[3].pos.y = viewportHeight - 148;
  }
});

Game.ThatsAll = Game.Scene.extend({
  init: function() {
    this.font = new me.Font('Verdana', 14, '#c00');
    this.parent([{
      dialogue: [{name: 'Developer', text: 'Thats all for now, thanks for playing', font: this.font}],
      callback: function() {

      }
    }])
  },

  load: function() {
    this.startDialogue = true;
  }
})