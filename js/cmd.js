var handCardCmd = function(mode){
    //1：带卡牌拖动，0：不带卡牌拖动
    //在图层2显示
    var f = [307, 391, 476, 561, 646, 731, 815, 900, 985];
    var td = $('.handcard td');
    var rect = main.canvas2.getBoundingClientRect(); 
    td.off();
    /*td.mouseenter(function(){
        var tot = $(this);
        var i = tot.index();
        //tot.css('width','77px');
        //tot.css('height','120px');
        main.context.drawImage(CardDeck.image2[game.p[game.now].hand[i]], f[i] - rect.left - 36, 585 - 120 - rect.top - 120);
        //main.context.drawImage(CardDeck.image2[1], 600, 0);
    });
    td.mouseleave(function(){
        var tot = $(this);
        var i = tot.index();
        //tot.css('width','77px');
        //tot.css('height','120px');
        main.context.clearRect(f[i] - rect.left - 36, 585 - 120 - rect.top - 120, 155, 240);
        //tot.html('<img src="image/paibei.jpg" width="77px" height="120px"/>')
    });*/
    var mEnter = function(){
        var tot = $(this);
        var i = tot.index();
        var img;
        if (game.p[game.now].handState[i] === 0)
            img = CardDeck.image2[0];
        else if (game.p[game.now].handState[i] === 1)
            img = CardDeck.image2[game.p[game.now].hand[i]];
        else
            return;
        //读取该位置的卡片图片
        main.context2.drawImage(img, f[i] - rect.left - 36, 585 - 120 - rect.top - 120);
        //main.context.drawImage(CardDeck.image2[1], 600, 0);
    };
    var mLeave = function(){
        var tot = $(this);
        var i = tot.index();
        main.context2.clearRect(f[i] - rect.left - 36, 585 - 120 - rect.top - 120, 155, 240);
    };
    td.mouseenter(mEnter);
    td.mouseleave(mLeave);
    
    if (mode === 1)
    {
        td.mousedown(function(e){
            var sx = e.clientX - rect.left -36, sy = e.clientY - rect.top - 60, flag = false;
            var mx = sx, my = sy;
            var tot = $(this), html;
            var i = tot.index();
            var img;
            if (game.p[game.now].handState[i] === 0)
                img = CardDeck.image2[0];
            else if (game.p[game.now].handState[i] === 1)
                img = CardDeck.image2[game.p[game.now].hand[i]];
            else
                return;

            var mMove = function(e){
                if (!flag)
                {
                    var x = e.clientX - rect.left - 36;
                    var y = e.clientY - rect.top - 60;
                    if (Math.abs(x - sx) >= 4 || Math.abs(y - sy) >= 4)
                    {
                        flag = true;
                        main.context2.clearRect(f[i] - rect.left - 36, 585 - 120 - rect.top - 120, 155, 240);
                        html = tot.html();
                        tot.html('');
                        td.off('mouseleave');
                        td.off('mouseenter');
                    }
                }
                else
                {
                    main.context2.clearRect(mx - 1, my - 1, 79, 122);
                    mx = e.clientX - rect.left - 36;
                    my = e.clientY - rect.top - 60;
                    console.log(mx + ' ' + my);
                    main.context2.drawImage(img, mx, my, 77, 120);
                }
            };    
            var mUp = function(e){
                if (!flag)
                {
                    //console.log(game.p[game.now].handState[i]);
                    if (game.p[game.now].handState[i] === 1)
                    {
                        //console.log('Error 1');
                        game.p[game.now].handState[i] = 0;
                        tot.html('<img src="image/paibei2.png" width="77px" height="120px" ondragstart="return false;"/>');
                    }
                    else if (game.p[game.now].handState[i] === 0)
                    {
                        console.log('Error 1');
                        game.p[game.now].handState[i] = 1;
                        tot.html('<img src="image/'+ CardDeck.nameList[game.p[game.now].hand[i]] +'2.png" width="77px" height="120px" ondragstart="return false;"/>');
                    }
                }
                else
                {
                    //console.log('Error 2');
                    main.context2.clearRect(mx - 1, my - 1, 79, 122);
                    if (Math.abs(e.clientY - rect.top) <= 600 && Math.abs(e.clientX - rect.left))
                    {
                        //console.log('OK');
                        if (game.p[game.now].handState[i] === 0)
                        {
                            //生成动物
                            game.p[game.now].initAnimal(e.clientX - rect.left - 45, e.clientY - rect.top - 45);
                            //使用了默认大小
                            game.p[game.now].useCard(i);
                            game.switch();
                        }
                        else if (game.p[game.now].handState[i] === 1)
                        {
                            //进化能力
                            //console.log(1);
                            var x = game.p[game.now].inAnimal(e.clientX - rect.left, e.clientY - rect.top);
                            if (x > -1)
                            {
                                game.p[game.now].evovleAbility(x, CardDeck.nameList[game.p[game.now].hand[i]]);
                                game.p[game.now].useCard(i);
                                game.switch();
                            }
                            else
                            {
                                tot.html(html);
                            }
                        }
                        //game.p[game.now].useCard(i);
                        //game.switch();
                    }
                    else
                    {
                        tot.html(html);
                        //console.log('JB');
                    }
                    td.mouseenter(mEnter);
                    td.mouseleave(mLeave);
                }
                main.gameDiv.off('mousemove');
                main.handDiv.off('mousemove');
                //main.gameDiv.off('mouseup');
                //main.handDiv.off('mouseup');
                $('body').off('mouseup');
                //td.off('mousedown');
            };
            main.gameDiv.mousemove(mMove);
            main.handDiv.mousemove(mMove);
            //main.gameDiv.mouseup(mUp);
            //main.handDiv.mouseup(mUp);
            $('body').mouseup(mUp);
        });
    }
};

var drag = {
    mx: 0, my: 0,
    width: 77, height: 120,
    draw: function(){
        main.context2.beginPath();
        main.context2.drawImage(cardImage[0], drag.mx, drag.my, drag.width, drag.height);
        main.context2.closePath();
    },
    animate: function(){
        var rect = main.canvas.getBoundingClientRect(); 
        console.log(drag.mx + ' ' + drag.my);

        $('.game-div').mousedown(function(e){
            drag.mx = e.clientX - rect.left -36;
            drag.my = e.clientY - rect.top - 60;
            //console.log(drag.mx + ' ' + drag.my);
            main.context2.beginPath();
            main.context2.drawImage(cardImage[0], drag.mx, drag.my, drag.width, drag.height);
            main.context2.closePath();

            $('.game-div').mousemove(function(e){
                main.context2.clearRect(drag.mx, drag.my, drag.width, drag.height);
                drag.mx = e.clientX - rect.left -36;
                drag.my = e.clientY - rect.top - 60;
                //console.log(drag.mx + ' ' + drag.my);
                drag.draw();
            });

            $('.game-div').mouseup(function(){
                main.context2.clearRect(drag.mx, drag.my, drag.width, drag.height);
                $('.game-div').off('mousemove');
                $('.game-div').off('mouseup');
            });  
        });
    }
};