Game.PlayScreen = me.ScreenObject.extend({
  init: function() {
    this.parent(true);
    this.addedPlayers = false;
    this.aaronFont = new me.Font("Verdana", 14, '#1d8a00');
    this.kevinFont = new me.Font("Verdana", 14, '#00b3e0');
    this.leiFont = new me.Font("Verdana", 14, '#ffd08a');
    this.shannonFont = new me.Font("Verdana", 14, '#fff67e');
  },
  addTrain: function() {
    this.train = new me.SpriteObject(-500, 72, Game.atlas.texture, 480, 192);
    region = Game.atlas.getRegion('subway.png');
    this.train.offset.setV(region.offset)
    this.train._sourceAngle = region.angle;
  },
  onDestroyEvent: function() {
    me.input.unbindTouch();
    me.input.unbindKey(me.input.KEY.ENTER);
    me.input.unbindKey(me.input.KEY.E);
  },
  onResetEvent: function() {
    this.setupBackground();
    this.setupColumns();
    
    this.addTrain();

    this.setupInput();

    this.players = [
      new Game.Character(100, 240, 0),
      new Game.Character(170, 240, 1),
      new Game.Character(240, 235, 2),
      new Game.Character(310, 240, 3)
    ];

    this.players[2].flipX(true);
    this.players[3].flipX(true);

    this.startDialog = [{
      name: "Kevin:",
      text: "I can't believe we're in London!",
      font: this.kevinFont
    }, {
      name: "Aaron:",
      text: "So much nicer than back home.",
      font: this.aaronFont,
    }, {
      name: "Shannon:",
      text: "Well guys, shall we go?",
      font: this.shannonFont
    }, {
      name: "Kevin:",
      text: "Sounds good. Hey Aaron, bet you I can run up all those stairs.",
      font: this.kevinFont
    }, {
      name: "Aaron",
      text: "You always out ran me as a kid. Bring it!",
      font: this.aaronFont
    }];

    me.game.add(this.train, 10);
    me.game.sort();
  },

  setupBackground: function() {
    this.background = new me.SpriteObject(0, 0, Game.atlas.texture, 480, 320);
    var region = Game.atlas.getRegion('tube.png');
    this.background.offset.setV(region.offset);
    this.background._sourceAngle = region.angle;
    me.game.add(this.background, 0);
  },

  setupColumns: function() {
    this.columns = [];
    this.columns.push(new me.SpriteObject(90, 64, Game.atlas.texture, 32, 215));
    this.columns.push(new me.SpriteObject(370, 64, Game.atlas.texture, 32, 215));
    var region = Game.atlas.getRegion('column.png');
    for(var i = 0; i < this.columns.length; i++) {
      var col = this.columns[i];
      col.offset.setV(region.offset);
      col._sourceAngle = region.angle;
      me.game.add(col, 20);
    }
  },

  setupInput: function() {
    me.input.bindKey(me.input.KEY.ENTER, 'action', true);
    me.input.bindKey(me.input.KEY.E, 'action', true);
    me.input.bindTouch(me.input.KEY.E, true);
  },

  update: function() {
    if(this.train.pos.x < -20) {
      this.train.pos.x += 10;
    }
    else if(!this.addedPlayers) {
      this.addedPlayers = true;
      for(var i = 0; i < this.players.length; i++) {
        var player = this.players[i];
        me.game.add(player, 30);
      }
      Game.dialog(this.startDialog, function() {
        me.game.viewport.follow(this.players[0]);
        me.levelDirector.loadLevel("race");
      });
      me.game.sort();
    }

    return true;
  }
});