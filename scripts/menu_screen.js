Game.MenuScreen = me.ScreenObject.extend({
  init: function() {
    this.z = 0;
    this.parent(true);
  },

  draw: function(ctx) {
    me.video.clearSurface(ctx, '#000');
    this.parent(ctx);
    var x = me.video.getSystemCanvas().width / 2;
    switch(this.state) {
      case 0:
        this.drawIntro(ctx);
        break;
      case 1:
        this.font.draw(ctx, 'Aaron is a friend of Kevin.', x, 30);
        this.font.draw(ctx, 'Kevin invited him on this trip, a few months before', x, 55);
        this.font.draw(ctx, 'planning begun. Not the most athletic, but quick witted.', x, 80);
        break;
      case 2:
        break;
      case 3:
        break;
      case 4:
        break;
      case 5:
        this.drawChapterSelection(ctx);
        break;

    };
  },

  drawChapterSelection: function(ctx) {
    this.font.draw(ctx, 'Click on a chapter', me.video.getSystemCanvas().width / 2, 30);
  },

  drawIntro: function(ctx) {
    var x = me.video.getSystemCanvas().width / 2;
    this.font.draw(ctx, "Revolution in Europe", x, 30);
    this.font.draw(ctx, "A fun story about how I, Aaron", x, 80);
    this.font.draw(ctx, "and three friends traveled to Europe.", x, 105);
    this.font.draw(ctx, "Now I want to share how my experiences", x, 130);
    this.font.draw(ctx, "had a positive effect on my life.", x, 155);
    this.font.draw(ctx, "Click to continue", x, 200);
  },

  loadPlayScreen: function(chapterNumber) {
    me.state.set(me.state.PLAY, new Game.PlayScreen(chapterNumber));
    me.state.change(me.state.PLAY);
  },

  onDestroyEvent: function() {
    me.input.unbindTouch();
    me.input.unbindKey(me.input.KEY.ENTER);
    me.game.removeAll();
  },

  onResetEvent: function() {
    this.font = new me.Font('Xolonium', '14px', '#fff', 'center');
    this.showChapters = false;

    me.input.bindKey(me.input.KEY.ENTER, 'next', true);
    me.input.bindTouch(me.input.KEY.ENTER, true);
    this.state = 0;
    this.chapters = [
      new Game.ChapterButton(50, 70, 200, 25, 'Chapter 1', 'Arial', '13px', 'white', this, 0)
    ];

    this.setupPlayerSprites();
  },

  setupPlayerSprites: function() {
    this.players = [ //me.SpriteObject(200, 235, Game.atlas.texture, 64, 128)
      new Game.Character(200, 235, 0),
      new Game.Character(200, 235, 1),
      new Game.Character(200, 235, 2),
      new Game.Character(200, 235, 3)
    ];
  },

  update: function() {
    if(me.input.isKeyPressed('next') && this.state < 5) {
      this.state++;
      switch(this.state) {
        case 1:
          me.game.add(this.players[0], 100);
          me.game.sort();
          break;
        case 2:
          me.game.remove(this.players[0]);
          me.game.add(this.players[1], 100);
          me.game.sort();
          break;
        case 3:
          me.game.remove(this.players[1]);
          me.game.add(this.players[2], 100);
          me.game.sort();
          break;
        case 4:
          me.game.remove(this.players[2]);
          me.game.add(this.players[3], 100);
          me.game.sort();
          break;
        case 5:
          me.game.remove(this.players[3]);
          me.game.add(this.chapters[0]);
          me.game.sort();
          break;
      };
    }
    return true;
  }
});

Game.ChapterButton = me.GUI_Object.extend({
  draw: function(ctx) {
    this.image = this.ctx.canvas;
    this.parent(ctx);
  },
  init: function(x, y, w, h, text, font, size, color, screen, index) {
    this.z = 1000;
    this.GUID = me.utils.createGUID();
    font = new me.Font(font, size, color, 'left');

    this.ctx = me.video.createCanvasSurface(w, h);
    this.ctx.fillStyle = 'white';
    font.draw(this.ctx, text, 0, 0);

    this.parent(x, y, {
      image: this.ctx.canvas,
      spritewidth: this.ctx.canvas.width,
      spriteheight: this.ctx.canvas.height
    });
    this.screen = screen;
    this.index = index;
  },
  onClick: function() {
    this.screen.loadPlayScreen(this.index);
    return true;
  },
  update: function() {
    return true;
  }
});