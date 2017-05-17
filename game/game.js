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
    texturePlayerWalkUp: new ex.Texture("sprites/walking-up.png"),
    texturePlayerWalkDown: new ex.Texture("sprites/walking-down.png"),
    texturePlayerWalkLeft: new ex.Texture("sprites/walking-left.png"),
    texturePlayerWalkRight: new ex.Texture("sprites/walking-right.png"),
};
var Config = {
    playerWidth: 96,
    playerHeight: 96,
    playerSpawnX: 302,
    playerSpawnY: 252,
    playerWalkFrameSpeed: 6
};
/// <reference path="../bower_components/excalibur/dist/excalibur.d.ts" />
/// <reference path="resources.ts" />
/// <reference path="config.ts" />
var game = new ex.Engine({
    width: 800,
    height: 600,
});
var Player = (function (_super) {
    __extends(Player, _super);
    function Player() {
        var _this = 
        //super invokes the ex.Actor class that Player extends
        _super.call(this, Config.playerSpawnX, Config.playerSpawnY, Config.playerHeight, Config.playerWidth) || this;
        _this.level = 1;
        _this.pals = [];
        _this.gymBadges = [];
        return _this;
    }
    Player.prototype.onInitialize = function (engine) {
        // set default sprite for when still and facing down
        var spritePlayerDown = new ex.Sprite(Resources.texturePlayerWalkDown, 0, 0, 96, 96);
        this.addDrawing("down-still", spritePlayerDown);
        // set sprite sheet for walking down - 8 col, 1 row, 96x96
        var playerWalkDownSheet = new ex.SpriteSheet(Resources.texturePlayerWalkDown, 8, 1, 96, 96);
        // create animation for walking down - 250ms frame speed
        var playerWalkDownAnimation = playerWalkDownSheet.getAnimationForAll(engine, 250);
        // make animation loop
        playerWalkDownAnimation.loop = true;
        // add animation to player
        this.addDrawing("walk-down-animate", playerWalkDownAnimation);
        var spritePlayerUp = new ex.Sprite(Resources.texturePlayerWalkUp, 0, 0, 96, 96);
        this.addDrawing("up-still", spritePlayerUp);
        var playerWalkUpSheet = new ex.SpriteSheet(Resources.texturePlayerWalkUp, 4, 1, 96, 96);
        var playerWalkUpAnimation = playerWalkUpSheet.getAnimationForAll(engine, 250);
        playerWalkUpAnimation.loop = true;
        this.addDrawing("walk-up-animate", playerWalkUpAnimation);
        var spritePlayerLeft = new ex.Sprite(Resources.texturePlayerWalkLeft, 0, 0, 96, 96);
        this.addDrawing("left-still", spritePlayerLeft);
        var playerWalkLeftSheet = new ex.SpriteSheet(Resources.texturePlayerWalkLeft, 6, 1, 96, 96);
        var playerWalkLeftAnimation = playerWalkLeftSheet.getAnimationForAll(engine, 250);
        playerWalkLeftAnimation.loop = true;
        this.addDrawing("walk-left-animate", playerWalkLeftAnimation);
        var spritePlayerRight = new ex.Sprite(Resources.texturePlayerWalkRight, 0, 0, 96, 96);
        this.addDrawing("right-still", spritePlayerRight);
        var playerWalkRightSheet = new ex.SpriteSheet(Resources.texturePlayerWalkRight, 6, 1, 96, 96);
        var playerWalkRightAnimation = playerWalkRightSheet.getAnimationForAll(engine, 250);
        playerWalkRightAnimation.loop = true;
        this.addDrawing("walk-right-animate", playerWalkRightAnimation);
    };
    Player.prototype.update = function (game, delta) {
        //updating the base update logic
        _super.prototype.update.call(this, game, delta);
        var leftKey = ex.Input.Keys.Left;
        var rightKey = ex.Input.Keys.Right;
        var upKey = ex.Input.Keys.Up;
        var downKey = ex.Input.Keys.Down;
        //custom update logic
        //press or hold the left arrow to move left
        if (game.input.keyboard.wasReleased(leftKey)) {
            this.setDrawing("left-still");
        }
        else if (game.input.keyboard.wasReleased(rightKey)) {
            this.setDrawing("right-still");
        }
        else if (game.input.keyboard.wasReleased(upKey)) {
            this.setDrawing("up-still");
        }
        else if (game.input.keyboard.wasReleased(downKey)) {
            this.setDrawing("down-still");
        }
        else if (game.input.keyboard.isHeld(leftKey)) {
            this.pos.x -= 2;
            this.setDrawing("walk-left-animate");
        }
        else if (game.input.keyboard.isHeld(rightKey)) {
            this.pos.x += 2;
            this.setDrawing("walk-right-animate");
        }
        else if (game.input.keyboard.isHeld(upKey)) {
            this.pos.y -= 2;
            this.setDrawing("walk-up-animate");
        }
        else if (game.input.keyboard.isHeld(downKey)) {
            this.pos.y += 2;
            this.setDrawing("walk-down-animate");
        }
    };
    return Player;
}(ex.Actor));
// create an asset loader
var resources = {
    texturePlayerDown: Resources.texturePlayerWalkDown,
    texturePlayerUp: Resources.texturePlayerWalkUp,
    texturePlayerLeft: Resources.texturePlayerWalkLeft,
    texturePlayerRight: Resources.texturePlayerWalkRight
};
// queue resources for loading
var loader = new ex.Loader();
var player = new Player();
for (var r in resources) {
    loader.addResource(resources[r]);
}
game.start(loader).then(function () {
    // spritePlayer.scale = new ex.Vector(2, 2);
    game.add(player);
});
