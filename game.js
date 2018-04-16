var main = function(){
    $('#map .point').css('background-color', 'greenyellow');
    $('.now-select').css('background-color', 'greenyellow');
    //$('#map td').text('1');
    var size = 9, map = new Array(size);
    for (var i = 0; i < size; i++)
        map[i] = new Array(size);
    var nowPlayer = 1, nowColor = 2, score = [0, 0], f = ['greenyellow', 'red', 'dodgerblue', '', '●', '▲', '■', '○', '△', '□', 'red', 'blue'];

    $('#map td').click(function(){
        var tot = $(this);
        var row = tot.parent("tr").index();
        var col = tot.index();
        //alert(row + ' ' + col);
        if (nowColor < 6)
        {
            tot.css('background-color', f[nowColor - 2]);
            if (nowColor == 5)
                tot.text('');
        }
        else if (nowColor < 12)
        {
            var temp = tot.text();
            tot.text(temp + f[nowColor - 2]);
            tot.css('background-color', '');
            if (nowColor < 9)
            {
                tot.css('border-color', 'red');
                score[0]++;
                $('#score-board #player1').text(score[0]);
            }
            else
            {
                tot.css('border-color', 'blue');
                score[1]++;
                $('#score-board #player2').text(score[1]);
            }
        }
        else
        {
            score[nowColor - 12]++;
            $('#score-board #player1').text(score[0]);
            $('#score-board #player2').text(score[1]);
            tot.css('border-color', f[nowColor - 2]);
        }
    });

    $('.color-select td').click(function(){
        nowColor = $(this).index(); 
        if (nowColor > 1)
        {
            if (nowColor < 6)
            {
                $('.now-select').css('background-color', f[nowColor - 2]);
                $('.now-select').css('border-color', 'black');
                $('.now-select').text('');
            }
            else if (nowColor < 12)
            {
                $('.now-select').css('background-color', '');
                $('.now-select').css('border-color', 'black');
                $('.now-select').text(f[nowColor - 2]);
            }
            else
            {
                $('.now-select').css('background-color', '');
                $('.now-select').text('');
                $('.now-select').css('border-color', f[nowColor - 2]);
            }
        }
    });

    $('.switch').click(function(){
        if (nowPlayer == 1)
            nowPlayer = 2;
        else
            nowPlayer = 1;
        $('#total-player span').text(nowPlayer);
    });

    $('.add-p1').click(function(){
        score[0]++;
        $('#score-board #player1').text(score[0]);
    });
    $('.add-p2').click(function(){
        score[1]++;
        $('#score-board #player2').text(score[1]);
    });
    $('.sub-p1').click(function(){
        score[0]--;
        $('#score-board #player1').text(score[0]);
    });
    $('.sub-p2').click(function(){
        score[1]--;
        $('#score-board #player2').text(score[1]);
    });
    $('.reset').click(function(){
        nowPlayer = 1, nowColor = 2, score = [0, 0]
        $('#map .point').css('background-color', 'greenyellow');
        $('#map .point').css('border-color', 'black');
        $('#map .point').text('');
        $('.now-select').css('background-color', 'greenyellow');
        $('#score-board #player1').text(score[0]);
        $('#score-board #player2').text(score[1]);
        $('#total-player span').text(nowPlayer);
    });
}