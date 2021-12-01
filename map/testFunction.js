class Example extends Phaser.Scene
{
    constructor ()
    {
        super();
    }

    preload () 
    {
        this.load.image('star', 'assets/demoscene/star2.png');
        this.load.image('bigStar', 'assets/demoscene/star3.png');
        this.load.image('ship', 'assets/sprites/shmup-ship2.png');
        this.load.image('back1', 'map_png/궁정리.png');
        this.load.spritesheet('sami', '주인공걸음마확대_frame1.png', { frameWidth: 463, frameHeight: 500 });
    }

    create () 
    {
        //  The world is 3200 x 600 in size
        this.matter.world.setBounds(0, 0, 2800, 1981);
        this.cameras.main.setBounds(0, 0, 2800, 1981).setName('main');
        this.add.image(700*2,495.25*2,'back1');

        //  The miniCam is 400px wide, so can display the whole world at a zoom of 0.2
        this.minimap = this.cameras.add(200, 10, 400, 100).setZoom(0.2).setName('mini');
        this.minimap.setBackgroundColor(0x002244);
        this.minimap.scrollX = 1600;
        this.minimap.scrollY = 300;

        this.createStarfield();
        this.createLandscape();
        this.createAliens();

        //  Add a player ship and camera follow
        this.player = this.matter.add.sprite(100, 450, 'sami').setScale(0.16)
            .setFixedRotation()
            .setFrictionAir(0.05)
            .setMass(30);
        this.cameras.main.startFollow(this.player, false, 0.2, 0.2);
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update () 
    {
        const prevVelocity = player.body.velocity.clone();                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
    //키 입력 처리
         player.body.setVelocity(0);
        if (cursors.left.isDown)
        { 
            player.body.setVelocityX(-160);
        }
        else if (cursors.right.isDown)
        {
            player.body.setVelocityX(160);
        }

        if(cursors.up.isDown)
        {
            player.body.setVelocityY(-160);
        }
        else if(cursors.down.isDown){
            player.body.setVelocityY(160);
        }
    
        if (cursors.left.isDown) {
            player.anims.play('left', true);
        }else if (cursors.right.isDown) {
            player.anims.play('right', true);
        } else if (cursors.up.isDown) {
            player.anims.play('back', true);
        } else if (cursors.down.isDown) {
            player.anims.play('front', true);
        } else {
            player.anims.stop();
        }
    }

    createStarfield ()
    {
        //  Starfield background

        //  Note the scrollFactor values which give them their 'parallax' effect

        var group = this.add.group({ key: 'star', frameQuantity: 256 });

        group.createMultiple({ key: 'bigStar', frameQuantity: 32 });

        var rect = new Phaser.Geom.Rectangle(0, 0, 3200, 550);

        Phaser.Actions.RandomRectangle(group.getChildren(), rect);

        group.children.iterate(function (child, index) {

            var sf = Math.max(0.3, Math.random());

            if (child.texture.key === 'bigStar')
            {
                sf = 0.2;
            }

            child.setScrollFactor(sf);

            this.minimap.ignore(child);

        }, this);
    }

    createLandscape ()
    {
        //  Draw a random 'landscape'

        var landscape = this.add.graphics();

        landscape.fillStyle(0x008800, 1);
        landscape.lineStyle(2, 0x00ff00, 1);

        landscape.beginPath();

        var maxY = 550;
        var minY = 400;

        var x = 0;
        var y = maxY;
        var range = 0;

        var up = true;

        landscape.moveTo(0, 600);
        landscape.lineTo(0, 550);

        do
        {
            //  How large is this 'side' of the mountain?
            range = Phaser.Math.Between(20, 100);

            if (up)
            {
                y = Phaser.Math.Between(y, minY);
                up = false;
            }
            else
            {
                y = Phaser.Math.Between(y, maxY);
                up = true;
            }

            landscape.lineTo(x + range, y);

            x += range;

        } while (x < 3100);

        landscape.lineTo(3200, maxY);
        landscape.lineTo(3200, 600);
        landscape.closePath();

        landscape.strokePath();
        landscape.fillPath();
    }

    createAliens ()
    {
        //  Create some random aliens
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('sami', { start: 1, end: 4 }),
            frameRate: 10,
            repeat: -1
        });
    
        this.anims.create({
            key: 'back',
            frames: this.anims.generateFrameNumbers('sami', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'front',
            frames: this.anims.generateFrameNumbers('sami', { start: 9, end: 12 }),
            frameRate: 10,
            repeat: -1
        });
    
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('sami', { start: 13, end: 16  }),
            frameRate: 10,
            repeat: -1
        });
    }


}

const config = {
    type: Phaser.WEBGL,
    width: 800,
    height: 600,
    parent: 'phaser-example',
    pixelArt: true,
    physics: {
        default: 'matter',
        matter: {
            gravity: {
                x: 0,
                y: 0
            },
            enableSleeping: true
        }
    },
    scene: [ Example ]
};

const game = new Phaser.Game(config);


