var game = function(){
    var curText, topText;
    var playerNum = 2;
    var cnt = 0;
    game.now = 0;
    game.first = 0;
    game.deck;
    game.check = new Array(4);
    game.rest = playerNum;
    game.p;
    
    for (var i = 0; i < playerNum; i++)
        game.check[i] = false;

    game.step = new Array(function(){
        //  button
        $('.next-turn').click(function(){
            game.check[game.now] = true;
            game.rest--;
            if (!game.rest)
            {
                alert(game.rest);
                cnt++;
                textEnter(curText, 500, 530, 2000, 30, 4, main.textContext);
                var button = $('.next-turn');
                button.attr('disabled', true);  //设置按钮无法点击
                button.off();
                game.step[cnt]();
            }
            else
            {
                game.switch();
            }
        });
        //  button
        game.p[game.now].showHand();
        curText = '玩家 ' + game.now + ' 正在进行回合...';
        textEnter(curText, 500, 530, 2000, 30, 3, main.textContext);
        handCardCmd(1);
    }, 
    function(){
        topText = '食物阶段...';
        textEnter(topText, 500, 100, 2000, 30, 3, main.textContext);
        handCardCmd(0);
    }, 
    function(){

    });

    game.switch = function(){
        var p = game.now + 1;
        while (game.check[p % playerNum])
            p++;
        game.now = p % playerNum;
        game.p[game.now].showHand();
        textEnter(curText, 500, 530, 2000, 30, 4, main.textContext);
        curText = '玩家 ' + game.now + ' 正在进行回合...';
        textEnter(curText, 500, 530, 2000, 30, 3, main.textContext);
    };

    game.set = function(){
        var color = new Array([255, 30, 30], [131, 111, 255], [0, 238, 0], [238, 238, 238]);
        game.deck = CardDeck.shuffle();
        game.p = new Array(playerNum);
        for (var i = 0; i < playerNum; i++)
        {
            game.p[i] = new Player();
            game.p[i].hand.size = 0;
            game.p[i].ownAnimal.size = 0;
            game.p[i].color = color[i];
        }
        for (var i = 0; i < playerNum * 6; i++)
        {
            game.p[i % playerNum].hand.push(game.deck.pop());
            game.p[i % playerNum].hand.size++;
            game.p[i % playerNum].handState[Math.floor(i / playerNum)] = 1;
            //console.log(Math.floor(i / playerNum));
        }
        
        game.step[0]();
    };
};

function Player(){
    this.hand = new Array(0);
    this.handState = [-1, -1, -1, -1, -1, -1, -1, -1, -1];
    this.score = 0;
    this.ownAnimal = new Array(0);
    this.color = new Array(3);

    this.showHand = function(){
        var td = $('.handcard td');
        td.html('');
        td = td.first();
        for (var i = 0; i < this.hand.size; i++)
        {
            if (this.handState[i] === 0)
                this.handState[i] = 1;
            td.html('<img src="image/'+ CardDeck.nameList[this.hand[i]] +'2.png" width="77px" height="120px" ondragstart="return false;"/>');
            td = td.next();
        }

        /*for (var i = 0; i < this.hand.size; i++)
        {
            //console.log(this.hand[i]);
            //console.log(this.handState[i]);
            //alert(p[0].hand[i]);
        }*/
    };

    this.useCard = function(n){
        for (var i = n + 1; i < this.hand.size; i++)
        {
            this.hand[i - 1] = this.hand[i];
            this.handState[i - 1] = this.handState[i];
        }
        this.hand.size--;
        this.handState[this.hand.size] = -1;
    };

    this.initAnimal = function(x, y){
        //动物绘制在图层1,x,y为绘制时的坐标
        var newAnimal = new Animal(game.now, x, y);
        newAnimal.ability.size = 0;
        this.score += 2;
        this.ownAnimal.size++;
        this.ownAnimal[this.ownAnimal.size - 1] = newAnimal;
        //main.context.drawImage(AnimalList.image[newAnimal.type], x, y);
        DrawAnimal(x, y);
        console.log('玩家 ' + game.now + ' 繁殖出了一个新的生命...')
    };
};

