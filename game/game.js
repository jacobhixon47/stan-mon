var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Config = {
    playerWidth: 48,
    playerHeight: 48,
    playerSpawnX: 150,
    playerSpawnY: 40,
    playerWalkFrameSpeed: 6
};
var Resources = {
    // Player walking textures
    texturePlayerWalkUp: new ex.Texture("sprites/walking-forward.png"),
    texturePlayerWalkDown: new ex.Texture("sprites/walking-back.png"),
    texturePlayerWalkLeft: new ex.Texture("sprites/walking-left.png"),
    texturePlayerWalkRight: new ex.Texture("sprites/walking-right.png"),
    texturePlayerDownStill: new ex.Texture("sprites/still-player.png")
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
        var upSpriteSheet = new ex.SpriteSheet(Resources.texturePlayerWalkUp, 3, 3, 32, 32);
        var rightSpriteSheet = new ex.SpriteSheet(Resources.texturePlayerWalkRight, 3, 3, 32, 32);
        var downSpriteSheet = new ex.SpriteSheet(Resources.texturePlayerWalkDown, 3, 3, 32, 32);
        var leftSpriteSheet = new ex.SpriteSheet(Resources.texturePlayerWalkLeft, 3, 3, 32, 32);
        var walkDownAnim = downSpriteSheet.getAnimationForAll(engine, Config.playerWalkFrameSpeed);
        walkDownAnim.loop = true;
        var walkupAnim = upSpriteSheet.getAnimationForAll(engine, Config.playerWalkFrameSpeed);
        walkupAnim.loop = true;
        var walkLeftAnim = leftSpriteSheet.getAnimationForAll(engine, Config.playerWalkFrameSpeed);
        walkLeftAnim.loop = true;
        var walkRightAnim = rightSpriteSheet.getAnimationForAll(engine, Config.playerWalkFrameSpeed);
        walkRightAnim.loop = true;
        this.addDrawing(this._sprite);
    };
    Player.prototype.update = function (game, delta) {
        //updating the base update logic
        _super.prototype.update.call(this, game, delta);
        //custom update logic
        //press or hold the left arrow to move left
        if (game.input.keyboard.isHeld(ex.Input.Keys.Left) || game.input.keyboard.wasPressed(ex.Input.Keys.Left)) {
            this.pos.x -= 20;
        }
        //press or hold the right arrow to move right
        if (game.input.keyboard.isHeld(ex.Input.Keys.Right) || game.input.keyboard.wasPressed(ex.Input.Keys.Right)) {
            this.pos.x += 20;
        }
    };
    return Player;
}(ex.Actor));
// create an asset loader
var loader = new ex.Loader();
// queue resources for loading
for (var r in Resources) {
    loader.addResource(Resources[r]);
}
// uncomment loader after adding resources
var player = new Player();
game.add(player);
game.start();
