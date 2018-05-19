var SCREEN_W = 320;
var SCREEN_H = 320;

phina.globalize();

phina.define('MainScene', {
  superClass: 'DisplayScene',
  init: function(options) {
    this.superInit(options);
    this.backgroundColor = 'black';

    var protonLayer = ProtonLayer({
      width: SCREEN_W,
      height: SCREEN_H
    }).setPosition(SCREEN_W/2, SCREEN_H/2).addChildTo(this);

    var emitter = ProtonEmitter({
      rate: new Proton.Rate(Proton.getSpan(10, 20), 0.1),
      initialize: [
        new Proton.Radius(1, 22),
        new Proton.Life(2, 4),
        new Proton.Velocity(2, Proton.getSpan(0, 360), 'polar')
      ],
      behaviour: [
        new Proton.Color('ff0000', 'random'),
        new Proton.Alpha(1, 0)
      ]
    }).setPosition(SCREEN_W/2, SCREEN_H/2);

    emitter.addChildTo(protonLayer).emit();
  }
});

phina.main(function() {
  var app = GameApp({
    startLabel: 'main',
    width: SCREEN_W,
    height: SCREEN_H,
    fps: 60
  });
  app.run();
});
