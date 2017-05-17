class Player extends ex.Actor {

  public level = 1;
  public pals = [];
  public gymBadges = [];

  constructor() {
    //super invokes the ex.Actor class that Player extends
    super(Config.playerSpawnX, Config.playerSpawnY, Config.playerHeight, Config.playerWidth);
  }
  public onInitialize(engine: ex.Engine) {
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
  }

  public update(game, delta) {
    //updating the base update logic
    super.update(game, delta);
    // declare keys for movement
    var leftKey = ex.Input.Keys.Left;
    var rightKey = ex.Input.Keys.Right;
    var upKey = ex.Input.Keys.Up;
    var downKey = ex.Input.Keys.Down;
    //custom update logic
    // first check if key was released

    if (game.input.keyboard.wasReleased(leftKey) ) {  // left key obviously
      // set drawing to still frame looking left
      this.setDrawing("left-still");
    }
    else if (game.input.keyboard.wasReleased(rightKey) ) {
      this.setDrawing("right-still");
    }
    else if (game.input.keyboard.wasReleased(upKey) ) {
      this.setDrawing("up-still");
    }
    else if (game.input.keyboard.wasReleased(downKey) ) {
      this.setDrawing("down-still");
    }
    //press or hold the left arrow to move left 
    else if (game.input.keyboard.isHeld(leftKey) ) {
      this.pos.x -= 2;
      this.setDrawing("walk-left-animate");
    }
    else if (game.input.keyboard.isHeld(rightKey) ) {
      this.pos.x += 2;
      this.setDrawing("walk-right-animate");
    }
    else if (game.input.keyboard.isHeld(upKey) ) {
      this.pos.y -= 2;
      this.setDrawing("walk-up-animate");
    }
    //press or hold the right arrow to move right
    else if (game.input.keyboard.isHeld(downKey) ) {
      this.pos.y += 2;
      this.setDrawing("walk-down-animate");
    }
  }
}
