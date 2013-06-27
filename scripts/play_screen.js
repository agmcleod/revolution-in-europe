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
    this.train = Game.atlas.createSpriteFromName('subway.png');
    this.train.pos = new me.Vector2d(-500, 72);
  },
  loadRace: function() {
    me.game.remove(this.columns[0]);
    me.game.remove(this.columns[1]);
    this.race = new Game.Race();
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
    this.background = Game.atlas.createSpriteFromName('tube.png');
    this.background.pos = new me.Vector2d(0, 0);
    me.game.add(this.background, 0);
  },

  setupColumns: function() {
    var colOne = Game.atlas.createSpriteFromName('column.png');
    colOne.pos = new me.Vector2d(90, 64);
    var colTwo = Game.atlas.createSpriteFromName('column.png');
    colTwo.pos = new me.Vector2d(370, 64);
    this.columns = [colOne, colTwo];
    me.game.add(colOne, 20);
    me.game.add(colTwo, 20);
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
      var _this = this;
      Game.dialog(this.startDialog, function() {
        _this.loadRace();
      });
      me.game.sort();
    }

    return true;
  }
});