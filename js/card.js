var CardDeck = function(){
    CardDeck.nameList = new Array('paibei', 'hide', 'eye', 'water', 'run');
    //CardDeck.nameList2 = new Array('paibei2', 'shuisheng2');
    CardDeck.image = new Array(20);  //原图
    CardDeck.image2 = new Array(20);  //缩略图，154 * 240
    CardDeck.srcDeck = new Array(1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3);

    //for (var i = 0; i < CardDeck.srcDeck.length; i++)
    //    console.log(CardDeck.srcDeck[i]);

    CardDeck.shuffle = function(){
        var size = CardDeck.srcDeck.length;
        var shuffled = new Array(size);
        for (var i = 0, rand; i < size; i++)
        {
            rand = random(0, i);
            if (rand !== i)
                shuffled[i] = shuffled[rand];
            shuffled[rand] = CardDeck.srcDeck[i];
        }

        //for (var i  = 0; i < shuffled.length; i++)
        //    console.log(shuffled[i]);

        return shuffled;
    };
};

var card = function(){
    
};

