/// <reference path="../bower_components/excalibur/dist/excalibur.d.ts" />
/// <reference path="resources.ts" />
/// <reference path="config.ts" />
/// <reference path="player.ts" />
var game = new ex.Engine({
    width: undefined,
    height: undefined,
    displayMode: ex.DisplayMode.Container
});
// create an asset loader
var resources = {
  texturePlayerDown: Resources.texturePlayerWalkDown,
  texturePlayerUp: Resources.texturePlayerWalkUp,
  texturePlayerLeft: Resources.texturePlayerWalkLeft,
  texturePlayerRight: Resources.texturePlayerWalkRight
}
// queue resources for loading
var loader = new ex.Loader();
var player = new Player();

for (var r in resources) {
  loader.addResource(resources[r]);
}
game.start(loader).then(function() {
  // spritePlayer.scale = new ex.Vector(2, 2);
  game.add(player);
});
