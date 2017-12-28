'use strict';

describe('myApp.player module', function() {

  beforeEach(module('myApp.player'));

  describe('player controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var playerCtrl = $controller('PlayerCtrl');
      expect(playerCtrl).toBeDefined();
    }));

  });
});