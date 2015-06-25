(function () {
  if (typeof TTT === "undefined") {
    window.TTT = {};
  }

  var View = TTT.View = function (game, $el) {
    this.game = game;
    this.$el = $el;
    this.setupBoard();
    this.bindEvents();
  };

  View.prototype.bindEvents = function () {
    var view = this;
    $('.square').on("click", function (event) {
      var $currentTarget = $(event.currentTarget);
      view.makeMove($currentTarget);
    });
  };

  View.prototype.makeMove = function ($square) {
    $square.addClass('selected');
    this.game.playMove($square.data('position'));
    $square.text(this.game.currentPlayer);
    if (this.game.isOver()) {
      var $message = $('<div>').addClass('winning-message').appendTo(this.$el);
      if (this.game.winner()) {$message.text(this.game.currentPlayer + " Has Won!");}
      else {$message.text("DRAW");}
      $('.square').off();
    }
  };

  View.prototype.setupBoard = function () {
    for (var i = 0; i < 9; i++) {
      $('<div>').addClass('square').data('position',[Math.floor(i/3), i%3]).appendTo(this.$el);
    }
  };
})();
