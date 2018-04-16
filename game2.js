function main()
{
    var totShow = $('#totalPlayer font');
    var point = $('.point');
    var map = [[0,0,0],[0,0,0],[0,0,0]];
    var tot = 1;
    var totF = [2, 1];
    var totF2 = ['Red', 'Blue'];
    var rest = 9;

    point.click(function(){ 
        var row = $(this).parent("tr").index();
        var col = $(this).index(); 
        if (!map[row][col])
        {
            rest--;
            map[row][col] = tot;
            if (tot == 1)
                $(this).css('background-color', 'red'); 
            else
                $(this).css('background-color', 'blue'); 
        }
        else
        {
            alert('ERROR!');
            return;
        }

        if (check())
        {
            alert(totF2[tot - 1] + ' WIN!');
            gameSet();
        }
        else
        {
            tot = totF[tot - 1];
            totShow.text(totF2[tot - 1]);
            totShow.css('color',totF2[tot - 1]);
        }

        if (!rest)
        {
            alert('Draw!');
            gameSet();
        }
    });

    var check = function (){
        for (var i = 0; i < 3; i++)
        {
            var sum1 = 0;
            var sum2 = 0;
            for (var j = 0; j < 3; j++)
            {
                if (map[i][j] == tot)
                    sum1++;
                if (map[j][i] == tot)
                    sum2++;
            }
            if (sum1 === 3 || sum2 === 3)
                return true;
        }
        var s1 = 0;
        var s2 = 0;
        for (var i = 0; i < 3; i++)
        {
            if (map[i][i] == tot)
                s1++;
            if (map[i][2 - i] == tot)
                s2++;
        }
        if (s1 == 3 || s2 == 3)
            return true;
        return false;
    };
    var gameSet = function(){
        $('.point').css('background-color','');
        tot = 1;
        rest = 9;
        map = [[0,0,0],[0,0,0],[0,0,0]];
        totShow.text('Red');
        totShow.css('color','red');
    };
}

