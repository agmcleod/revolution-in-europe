Game.MenuScreen = me.ScreenObject.extend({
  draw: function(ctx) {
    this.parent(ctx);
    me.video.clearSurface(ctx, '#000');
    if(this.showChapters) {
      this.drawChapterSelection(ctx);
    }
    else {
      this.drawIntro(ctx);
    }
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

  init: function() {
    this.parent(true);
  },

  loadPlayScreen: function(chapterNumber) {
    me.state.set(me.state.PLAY, new Game.PlayScreen(chapterNumber));
    me.state.change(me.state.PLAY);
  },

  onDestroyEvent: function() {
    for(var i = 0; i < this.chapters.length; i++) {
      var btn = this.chapters[i];
      me.game.remove(btn);
    }
  },

  onResetEvent: function() {
    this.font = new me.Font('Xolonium', '15px', '#fff', 'center');
    this.showChapters = false;

    me.input.bindKey(me.input.KEY.ENTER, 'next');
    me.input.bindMouse(0, me.input.KEY.ENTER);
    me.input.bindTouch(me.input.KEY.ENTER);

    this.showChapters = false;
    this.chapters = [
      new Game.ChapterButton(50, 70, 200, 25, 'Chapter 1', 'Xolonium', '13px', 'white', this, 0)
    ];
  },

  update: function() {
    if(me.input.isKeyPressed('next')) {
      me.input.unbindMouse(0);
      me.input.unbindTouch();
      me.input.unbindKey(me.input.KEY.ENTER);
      var _this = this;
      this.showChapters = true;
      me.game.add(this.chapters[0]);
      me.game.sort();
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
    console.log('clicked');
    return true;
  },
  update: function() {
    return true;
  }
});