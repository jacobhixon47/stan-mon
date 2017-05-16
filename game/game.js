var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Resources = {
    // Player walking textures
    texturePlayerWalkUp: new ex.Texture("sprites/walking-forward.png"),
    texturePlayerWalkDown: new ex.Texture("sprites/walking-back.png"),
    texturePlayerWalkLeft: new ex.Texture("sprites/walking-left.png"),
    texturePlayerWalkRight: new ex.Texture("sprites/walking-right.png"),
    texturePlayerDownStill: new ex.Texture("sprites/player-still.png")
};
var Config = {
    playerWidth: 48,
    playerHeight: 48,
    playerSpawnX: 150,
    playerSpawnY: -40,
    playerWalkFrameSpeed: 6
};
/// <reference path="../bower_components/excalibur/dist/excalibur.d.ts" />
/// <reference path="resources.ts" />
/// <reference path="config.ts" />
var game = new ex.Engine({
    width: 800,
    height: 600
});
var Player = (function (_super) {
    __extends(Player, _super);
    function Player() {
        var _this = 
        //super invokes the ex.Actor class that Player extends
        _super.call(this, Config.playerSpawnX, game.getDrawHeight() - Config.playerSpawnY, Config.playerHeight, Config.playerWidth) || this;
        _this.level = 1;
        _this.pals = [];
        _this.gymBadges = [];
        return _this;
        //switching the collision type from the default PreventCollision option
        // to the Fixed option, an actor with the Fixed CollisionType will cause other actors to
        // react when it colides with them, but it will not be altered
        // is considered "immovable/unstoppable"
    }
    Player.prototype.onInitialize = function (engine) {
        this._sprite = Resources.texturePlayerDownStill.asSprite();
        var upSpriteSheet = new ex.SpriteSheet(Resources.texturePlayerWalkUp, 3, 3, 96, 96);
        var rightSpriteSheet = new ex.SpriteSheet(Resources.texturePlayerWalkRight, 3, 3, 96, 96);
        var downSpriteSheet = new ex.SpriteSheet(Resources.texturePlayerWalkDown, 3, 3, 96, 96);
        var leftSpriteSheet = new ex.SpriteSheet(Resources.texturePlayerWalkLeft, 3, 3, 96, 96);
        var walkDownAnim = downSpriteSheet.getAnimationForAll(engine, Config.playerWalkFrameSpeed);
        walkDownAnim.scale.setTo(2, 2);
        walkDownAnim.loop = true;
        var walkupAnim = upSpriteSheet.getAnimationForAll(engine, Config.playerWalkFrameSpeed);
        walkupAnim.scale.setTo(2, 2);
        walkupAnim.loop = true;
        var walkLeftAnim = leftSpriteSheet.getAnimationForAll(engine, Config.playerWalkFrameSpeed);
        walkLeftAnim.scale.setTo(2, 2);
        walkLeftAnim.loop = true;
        var walkRightAnim = rightSpriteSheet.getAnimationForAll(engine, Config.playerWalkFrameSpeed);
        walkRightAnim.scale.setTo(2, 2);
        walkRightAnim.loop = true;
        this.addDrawing(this._sprite);
    };
    return Player;
}(ex.Actor));
// create an asset loader
var loader = new ex.Loader();
var resources = {};
// queue resources for loading
for (var r in Resources) {
    loader.addResource(resources[r]);
}
// uncomment loader after adding resources
var player = new Player();
game.add(player);
game.start();
