/* If the start position of any token a1,a2,b1 or b2 is set at a value of -1, it
   indicates that the token is yet to start from its locker                   */


var tokenA = [
    {                  
        "pos" : -1,
        "finish" : false,
        "stepLeft": 27,
    },
    {                        
        "pos" : -1,
        "finish" : false,
        "stepLeft": 27,
    }
];

var tokenB = [
    {                        
        "pos" : -1,
        "finish" : false,
        "stepLeft": 27,
    },
    {                     
        "pos" : -1,
        "finish" : false,
        "stepLeft": 27,
    }
];


var moveOf=1;
var activeA=0, activeB=0;
var finishA=0, finishB=0;
/* moveOf = 1 => turn of Player A
   moveOf = 0 => turn of Player B 
   active variables refer to number of tokens active */ 

var dice; //To denote the outcome of the roll

var acount,bcount,sqName; //To count the number of tockens in the locker
var next,next1;

/*
    Function CheckcutA passes the index of the tokenA which just moved
    this in turn checks if any other B token was present there at that position 
    or not, 
*/

function checkcutA(token)
{
    if(tokenA[token].pos==(tokenB[0].pos+14)%28)
    {
        tokenB[0].pos=-1;
        activeB--;
    }
    if(tokenA[token].pos==(tokenB[1].pos+14)%28)
    {
        tokenB[1].pos=-1;
        activeB--;
    }

    token++;
    token%=2;

    if(tokenA[token].pos==(tokenB[0].pos+14)%28)
    {
        tokenB[0].pos=-1;
        activeB--;
    }
    if(tokenA[token].pos==(tokenB[1].pos+14)%28)
    {
        tokenB[1].pos=-1;
        activeB--;
    }
    updatelocker();
}

function checkcutB(token)
{
    if(tokenA[0].pos==(tokenB[token].pos+14)%28)
    {
        tokenA[0].pos=-1;
        activeA--;
    }
    if(tokenA[1].pos==(tokenB[token].pos+14)%28)
    {
        tokenA[1].pos=-1;
        activeA--;
    }

    token++;
    token%=2;

    if(tokenA[0].pos==(tokenB[token].pos+14)%28)
    {
        tokenA[0].pos=-1;
        activeA--;
    }
    if(tokenA[1].pos==(tokenB[token].pos+14)%28)
    {
        tokenA[1].pos=-1;
        activeA--;
    }
    updatelocker();
}

function setnext()
{
    if(moveOf)
    {
        if(tokenA[0].finish==false && tokenA[1].finish==false)
        {
            if(tokenA[0].pos==-1)
             next=0;
            else
            next=1;

            next1=(next+1)%2;
        }
        else
        {
            if(tokenA[0].finish==false)
            next=0;
            else
            next=1;
        }
    }
    else
    {
        if(tokenB[0].finish==false && tokenB[1].finish==false)
        {
            if(tokenB[0].pos==-1)
             next=0;
            else
            next=1;

            next1=(next+1)%2;
        }
        else
        {
            if(tokenB[0].finish==false)
            next=0;
            else
            next=1;
        }
    }
}



function rolldisable()
{
    $("#roll").css("display","none");
    $("#rolldisable").css("display","block");
}

function rollenable()
{
    $("#roll").css("display","block");
    $("#rolldisable").css("display","none");
}

$(document).ready(function(){

    if(moveOf)
    {
        $("#turnOf").html("<h3>TURN OF PLAYER A</h3>");
    }
    else
    {
        $("#turnOf").html("<h3>TURN OF PLAYER B</h3>");
    }

    //////////////////ROLL START///////////////////////////////////

    $("#roll").click(function(){
        dice=Math.ceil(Math.random()*6);
        $("#rollResult").html("<h3 align=\"center\">"+dice+"<\/h3><br>");

        $("#roll").addClass("btn-disabled");

        if(dice == 6)
        {
            // 6 is the starting conndition
            // Check if the token of the corresponding move is in the locker or not

            if(moveOf)
            {
                if(activeA == 0)
                {
                    setnext();

                    tokenA[next].pos=1;
                    $("#sq"+tokenA[next].pos).html("<p> 1 A </p>");
                    checkcutA(next);
                    activeA++;
                    updatemove();
                    updatelocker();                    
                }
                else if(activeA == 1)
                {
                   // $("#roll").unbind("click");

                    setnext();

                    if(tokenA[0].finish==false && tokenA[1].finish==false)
                    {
                        rolldisable();

                        $("#leftlocker").click(function(){
                            tokenA[next].pos=1;
                            $("#sq"+tokenA[next].pos).html("<p> 1 A </p>");
                            checkcutA(next);
                            activeA++;
                            updatelocker();
                            updatemove();
                            rollenable();
                            checkfinish();
                            checkwin(moveOf);
                            $("#leftlocker").unbind("click");
                            $("#sq"+tokenA[next1].pos).unbind("click");
                        });

                    

                        $("#sq"+tokenA[next1].pos).click(function(){
                            $("#sq"+tokenA[next1].pos).html("<p></p>");
                            tokenA[next1].pos+=6;
                            $("#sq"+tokenA[next1].pos).html("<p> 1 A </p>");
                            checkcutA(next1);
                            updatelocker();
                            updatemove();
                            rollenable();
                            checkfinish();
                            checkwin(moveOf);
                            $("#leftlocker").unbind("click");
                            $("#sq"+(tokenA[next1].pos-6)).unbind("click");
                        });
                    }
                    else
                    {
                        $("#sq"+tokenA[next].pos).html("<p></p>");
                        tokenA[next].pos+=dice;
                        $("#sq"+tokenA[next].pos).html("<p> 1 A </p>");
                        checkcutA(next);
                        updatemove();
                        checkfinish();
                        checkwin(moveOf);
                    }
    
                }
                else                  //when both of the pieces are active
                {
                    if(tokenA[0].pos!=tokenA[1].pos)
                    {
                        rolldisable();

                        $("#sq"+tokenA[0].pos).click(function(){
                            $("#sq"+tokenA[0].pos).html("<p></p>");
                            tokenA[0].pos+=dice;
                            checkcutA[0];
                            $("#sq"+tokenA[0].pos).html("<p> 1 A </p>");
                            $("#sq"+tokenA[1].pos).unbind("click");
                            $("#sq"+(tokenA[0].pos-dice)).unbind("click");
                            updatemove();
                            rollenable();
                            checkfinish();
                            checkwin(moveOf);
                        });

                        $("#sq"+tokenA[1].pos).click(function(){
                            $("#sq"+tokenA[1].pos).html("<p></p>");
                            tokenA[1].pos+=dice;
                            checkcutA[1];
                            $("#sq"+tokenA[1].pos).html("<p> 1 A </p>");
                            updatemove();
                            rollenable();
                            checkfinish();
                            checkwin(moveOf);
                        });
                    }
                    else
                    {
                        tokenA[0].pos+=dice;
                        $("#sq"+tokenA[0].pos).html("<p> 1 A </p>");
                        checkcutA[0];
                        updatemove();
                    }
                }
            }
            else
            {
                //move B/////////////////////////////////////////////////////////////////////////////////
                if(activeB == 0)
                {
                    setnext();

                    tokenB[next].pos=1;
                    $("#sq"+((tokenB[next].pos + 14)%28)).html("<p> 1 B </p>");
                    activeB++;
                    checkcutB(next);
                    updatemove();
                    updatelocker();                    
                }
                else if(activeB == 1)
                {
                    setnext();

                    if(tokenB[0].finish==false && tokenB[1].finish==false)
                    {
                        rolldisable();

                        $("#rightlocker").click(function(){
                            tokenB[next].pos=1;
                            $("#sq"+((tokenB[next].pos + 14)%28)).html("<p> 1 B </p>");
                            checkcutB(next);
                            activeB++;
                            updatelocker();
                            updatemove();
                            rollenable();
                            checkfinish();
                            checkwin(moveOf);
                            $("#rightlocker").unbind("click");
                            $("#sq"+((tokenB[next1].pos + 14)%28)).unbind("click");
                        });

                    

                        $("#sq"+((tokenB[next1].pos + 14)%28)).click(function(){
                            $("#sq"+((tokenB[next1].pos + 14)%28)).html("<p></p>");
                            tokenB[next1].pos+=6;
                            $("#sq"+((tokenB[next1].pos + 14)%28)).html("<p> 1 B </p>");
                            checkcutB(next1);
                            updatelocker();
                            updatemove();
                            rollenable();
                            checkfinish();
                            checkwin(moveOf);
                            $("#rightlocker").unbind("click");
                            $("#sq"+((tokenB[next1].pos + 14)%28-6)).unbind("click");
                        });
                    }
                    else
                    {
                        $("#sq"+((tokenB[next].pos + 14)%28)).html("<p></p>");
                        tokenB[next].pos+=dice;
                        $("#sq"+((tokenB[next].pos + 14)%28)).html("<p> 1 B </p>");
                        checkcutB(next);
                        updatemove();
                        checkfinish();
                        checkwin(moveOf);
                    }
    
                }
                else                  //when both of the pieces are active
                {
                    if(tokenB[0].pos!=tokenB[1].pos)
                    {
                        rolldisable();

                        $("#sq"+((tokenB[0].pos + 14)%28)).click(function(){
                            $("#sq"+((tokenB[0].pos + 14)%28)).html("<p></p>");
                            tokenB[0].pos+=dice;
                            checkcutB(0);
                            $("#sq"+((tokenB[0].pos + 14)%28)).html("<p> 1 B </p>");
                            $("#sq"+((tokenB[1].pos + 14)%28)).unbind("click");
                            $("#sq"+((tokenB[0].pos + 14)%28-dice)).unbind("click");
                            updatemove();
                            rollenable();
                            checkfinish();
                            checkwin(moveOf);
                        });

                        $("#sq"+((tokenB[1].pos + 14)%28)).click(function(){
                            $("#sq"+((tokenB[1].pos + 14)%28)).html("<p></p>");
                            tokenB[1].pos+=dice;
                            $("#sq"+((tokenB[1].pos + 14)%28)).html("<p> 1 B </p>");
                            checkcutB(1);
                            updatemove();
                            rollenable();
                            checkfinish();
                            checkwin(moveOf);
                        });
                    }
                    else
                    {
                        tokenB[0].pos+=dice;
                        $("#sq"+((tokenB[0].pos + 14)%28)).html("<p> 1 B </p>");
                        checkcutB(0);
                        updatemove();
                    }
                }
                ////////////////////////////////////////////////////////////////////////////////////////
            }
        }
        else        //die doesnt show 6
        {
            if(moveOf)              // move of A, when the die rolled doesnt display 6
            {
                if(activeA==0)
                {
                    //skip to next move
                    updatemove();
                }
                else if(activeA==1)
                {
                    setnext();
                    if(tokenA[0].finish==false && tokenA[1].finish==false)
                    {
                        $("#sq"+tokenA[next1].pos).html("<p></p>");
                        tokenA[next1].pos+=dice;
                        $("#sq"+tokenA[next1].pos).html("<p> 1 A </p>");
                        checkcutA(next1);
                        updatemove();
                        checkfinish();
                        checkwin(moveOf);
                    }
                    else
                    {
                        $("#sq"+tokenA[next].pos).html("<p></p>");
                        tokenA[next].pos+=dice;
                        $("#sq"+tokenA[next].pos).html("<p> 1 A </p>");
                        checkcutA(next);
                        updatemove();
                        checkfinish();
                        checkwin(moveOf);
                    }
                }
                else
                {
                    if(tokenA[0].pos!=tokenA[1].pos)
                    {
                        rolldisable();

                        $("#sq"+tokenA[0].pos).click(function(){
                            $("#sq"+tokenA[0].pos).html("<p></p>");
                            tokenA[0].pos+=dice;
                            $("#sq"+tokenA[0].pos).html("<p> 1 A </p>");
                            checkcutA(0);
                            $("#sq"+tokenA[1].pos).unbind("click");
                            $("#sq"+(tokenA[0].pos-dice)).unbind("click");
                            updatemove();
                            rollenable();
                            checkfinish();
                            checkwin(moveOf);
                        });

                        $("#sq"+tokenA[1].pos).click(function(){
                            $("#sq"+tokenA[1].pos).html("<p></p>");
                            tokenA[1].pos+=dice;
                            $("#sq"+tokenA[1].pos).html("<p> 1 A </p>");
                            checkcutA(1);
                            $("#sq"+tokenA[0].pos).unbind("click");
                            $("#sq"+(tokenA[1].pos-dice)).unbind("click");
                            updatemove();
                            rollenable();
                            checkfinish();
                            checkwin(moveOf);
                        });
                    }
                    else
                    {
                        tokenA[0].pos+=dice;
                        $("#sq"+tokenA[0].pos).html("<p> 1 A </p>");
                        checkcutA(0);
                        updatemove();
                    }
                }
            }
            else
            {
                //move B ////////////////////////////////////////////////
                if(activeB==0)
                {
                    //skip to next move
                    updatemove();
                }
                else if(activeB==1)
                {
                    setnext();
                    if(tokenB[0].finish==false && tokenB[1].finish==false)
                    {
                        $("#sq"+((tokenB[next1].pos + 14)%28)).html("<p></p>");
                        tokenB[next1].pos+=dice;
                        $("#sq"+((tokenB[next1].pos + 14)%28)).html("<p> 1 B </p>");
                        checkcutB(next1);
                        updatemove();
                        checkfinish();
                        checkwin(moveOf);
                    }
                    else
                    {
                        $("#sq"+((tokenB[next].pos + 14)%28)).html("<p></p>");
                        tokenB[next].pos+=dice;
                        $("#sq"+((tokenB[next].pos + 14)%28)).html("<p> 1 B </p>");
                        checkcutB(next);
                        updatemove();
                        checkfinish();
                        checkwin(moveOf);
                    }
                }
                else
                {
                    if(tokenB[0].pos!=tokenB[1].pos)
                    {
                        rolldisable();

                        $("#sq"+((tokenB[0].pos + 14)%28)).click(function(){
                            $("#sq"+((tokenB[0].pos + 14)%28)).html("<p></p>");
                            tokenB[0].pos+=dice;
                            $("#sq"+((tokenB[0].pos + 14)%28)).html("<p> 1 B </p>");
                            checkcutB(0);
                            $("#sq"+((tokenB[1].pos + 14)%28)).unbind("click");
                            $("#sq"+((tokenB[0].pos + 14)%28-dice)).unbind("click");
                            updatemove();
                            rollenable();
                            checkfinish();
                            checkwin(moveOf);
                        });

                        $("#sq"+((tokenB[1].pos + 14)%28)).click(function(){
                            $("#sq"+((tokenB[1].pos + 14)%28)).html("<p></p>");
                            tokenB[1].pos+=dice;
                            $("#sq"+((tokenB[1].pos + 14)%28)).html("<p> 1 B </p>");
                            checkcutB(1);
                            $("#sq"+((tokenB[0].pos + 14)%28)).unbind("click");
                            $("#sq"+((tokenB[1].pos + 14)%28-dice)).unbind("click");
                            updatemove();
                            rollenable();
                            checkfinish();
                            checkwin(moveOf);
                        });
                    }
                    else
                    {
                        tokenB[0].pos+=dice;
                        $("#sq"+((tokenB[0].pos + 14)%28)).html("<p> 1 B </p>");
                        checkcutB(0);
                        updatemove();
                    }
                }
///////////////////////////////////////////////////////////////////
            }
        }

        acount=bcount=0;

        updatelocker();

        checkfinish();
        checkwin(moveOf);
    });
});






function checkfinish()
{

    if(tokenA[0].finish==false)
    {
        if(tokenA[0].pos > 27)
        {
            tokenA[0].finish=true;
            activeA--;
            finishA++;
            $("#sq"+tokenA[0].pos).html("<p></p>");
            $("#sq"+tokenA[0].pos).unbind("click");

        }
    }

    if(tokenA[1].finish==false)
    {
        if(tokenA[1].pos > 27)
        {
            tokenA[1].finish=true;
            activeA--;
            finishA++;
            $("#sq"+tokenA[1].pos).html("<p></p>");
            $("#sq"+tokenA[1].pos).unbind("click");
        }
    }

    if(tokenB[0].finish==false)
    {
        if(tokenB[0].pos > 27)
        {
            tokenB[0].finish=true;
            activeB--;
            finishB++;
            $("#sq"+((tokenB[0].pos + 14)%28)).html("<p></p>");
            $("#sq"+((tokenB[0].pos + 14)%28)).unbind("click");
        }
    }

    if(tokenB[1].finish==false)
    {
        if(tokenB[1].pos > 27)
        {
            tokenB[1].finish=true;
            activeB--;
            finishB++;
            $("#sq"+((tokenB[1].pos + 14)%28)).html("<p></p>");
            $("#sq"+((tokenB[1].pos + 14)%28)).unbind("click");
        }
    }

    $("#resultA").html("<h3>"+finishA+" finished");
    $("#resultB").html("<h3>"+finishB+" finished");
}

function checkwin()
{
    if(tokenA[0].finish && tokenA[1].finish)
    {
        $(".container").fadeOut(3000,gameResult(1));
    }
    else if(tokenB[0].finish && tokenB[1].finish)
    {
        $(".container").fadeOut(3000,gameResult(0));
    }
}

function gameResult(result) {
    $("#resultEnd").fadeIn(2000);
    if(result)
    {
        $("#winloss").html("<blockquote>\“PLAYER A WON!\"")
    }
    else
    {
        $("#winloss").html("<blockquote>\“PLAYER B WON\"")
    }

    $("#continue").prepend("Play again!<br>");
}

function updatelocker()
{
        acount=bcount=0;
        if(tokenA[0].pos == -1 )
            acount++;
        if(tokenA[1].pos == -1 )
            acount++;
        if(tokenB[0].pos == -1 )
            bcount++;
        if(tokenB[1].pos == -1 )
            bcount++;

        $("#leftlocker").html(acount + " A");
        $("#rightlocker").html(bcount + " B");
}

function updatemove()
{
    moveOf=(moveOf+1)%2;
    if(moveOf)
    {
        $("#turnOf").html("<h3>TURN OF PLAYER A</h3>");
    }
    else
    {
        $("#turnOf").html("<h3>TURN OF PLAYER B</h3>");
    }
}