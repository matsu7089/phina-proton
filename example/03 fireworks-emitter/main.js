var SCREEN_W = 320;
var SCREEN_H = 320;

phina.globalize();

phina.define('FireworksEmitter', {
  superClass: 'ProtonEmitter',
  init: function() {
    this.superInit({
      rate: new Proton.Rate(Proton.getSpan(20, 30)),
      initialize: [
        new Proton.Radius(10, 15),
        new Proton.Life(2, 4),
      ],
      behaviour: [
        new Proton.Gravity(1.5),
        new Proton.Scale(1, 0)
      ]
    });

    this.colors = [
      '1abc9c', '2ecc71', '3498db', '9b59b6',
      'f1c40f', 'e67e22', 'e74c3c'
    ];

    this.velocity = new Proton.Velocity();
    this.color = new Proton.Color();
    this.addInitialize(this.velocity).addBehaviour(this.color);

    this.tweener
      .call(function() { this._emit(); }, this).wait(100)
      .call(function() { this._emit(); }, this).wait(100)
      .call(function() { this._emit(); }, this).wait(1300)
      .setLoop(true);
  },

  _emit: function() {
    this.velocity.reset(Math.random()+0.5, Proton.getSpan(0, 360), 'p');
    this.color.reset(this.colors.pickup());
    this.setPosition(Math.random()*SCREEN_W, Math.random()*SCREEN_H/2);
    this.emit('once');
  }
});

phina.define('MainScene', {
  superClass: 'DisplayScene',
  init: function(options) {
    this.superInit(options);
    this.backgroundColor = '#f0f0f0';

    var protonLayer = ProtonLayer({
      width: SCREEN_W,
      height: SCREEN_H
    }).setPosition(SCREEN_W/2, SCREEN_H/2).addChildTo(this);

    var emitter = FireworksEmitter().addChildTo(protonLayer);
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
