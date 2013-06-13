var Game = {};

Game.Loader = (function() {
  var Loader = function() {
    this.resources = [{
      name: 'ch1',
      type:'json',
      src: 'assets/images/ch1.json'
    }, {
      name: 'ch1',
      type: 'image',
      src: 'assets/images/ch1.png'
    }];
  }

  Loader.prototype.init = function() {
    if(!me.video.init("app", 480, 320, false, 'auto', true)) {
      alert('please use a browser that supports the canvas');
    }
    else {
      me.loader.onload = this.loaded.bind(this);
      me.loader.preload(this.resources);
      me.state.change(me.state.LOADING);
    }
  }

  Loader.prototype.loaded = function() {
    me.state.set(me.state.PLAY, new Game.PlayScreen());
  }

  return Loader;
})();

window.onReady(function() {
  var loader = new Game.Loader();
  loader.init();
});