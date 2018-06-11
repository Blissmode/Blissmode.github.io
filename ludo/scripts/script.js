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
/* moveOf = 1 => turn of Player A
   moveOf = 0 => turn of Player B 
   active variables refer to number of tokens active */ 

var dice; //To denote the outcome of the roll

var acount,bcount,sqName; //To count the number of tockens in the locker
var next,next1;


function setnext()
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
                    activeA++;
                    updatelocker();

               /*     $(sqName).click(function(){
                        $(sqName).html("<p></p>");
                        tokenA[0].pos=(tokenA[0].pos + dice)%27;
                        $(sqName).unbind("click");
                        sqName="#sq"+tokenA[0].pos;
                        $(sqName).html("<p> 1 A </p>");
                    });                                  */
                    
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
                            activeA++;
                            updatelocker();
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
                            updatelocker();
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
                            $("#sq"+tokenA[0].pos).html("<p> 1 A </p>");
                            $("#sq"+tokenA[1].pos).unbind("click");
                            $("#sq"+(tokenA[0].pos-dice)).unbind("click");
                            rollenable();
                            checkfinish();
                            checkwin(moveOf);
                        });

                        $("#sq"+tokenA[1].pos).click(function(){
                            $("#sq"+tokenA[1].pos).html("<p></p>");
                            tokenA[1].pos+=dice;
                            $("#sq"+tokenA[1].pos).html("<p> 1 A </p>");
                            rollenable();
                            checkfinish();
                            checkwin(moveOf);
                        });
                    }
                    else
                    {
                        tokenA[0].pos+=dice;
                        $("#sq"+tokenA[0].pos).html("<p> 1 A </p>");
                    }
                }
            }
            else
            {
                //move B
            }
        }
        else        //die doesnt show 6
        {
            if(moveOf)              // move of A, when the die rolled doesnt display 6
            {
                if(activeA==0)
                {
                    //skip to next move
                }
                else if(activeA==1)
                {
                    setnext();
                    if(tokenA[0].finish==false && tokenA[1].finish==false)
                    {
                        $("#sq"+tokenA[next1].pos).html("<p></p>");
                        tokenA[next1].pos+=dice;
                        $("#sq"+tokenA[next1].pos).html("<p> 1 A </p>");
                        checkfinish();
                        checkwin(moveOf);
                    }
                    else
                    {
                        $("#sq"+tokenA[next].pos).html("<p></p>");
                        tokenA[next].pos+=dice;
                        $("#sq"+tokenA[next].pos).html("<p> 1 A </p>");
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
                            $("#sq"+tokenA[1].pos).unbind("click");
                            $("#sq"+(tokenA[0].pos-dice)).unbind("click");
                            rollenable();
                            checkfinish();
                            checkwin(moveOf);
                        });

                        $("#sq"+tokenA[1].pos).click(function(){
                            $("#sq"+tokenA[1].pos).html("<p></p>");
                            tokenA[1].pos+=dice;
                            $("#sq"+tokenA[1].pos).html("<p> 1 A </p>");
                            $("#sq"+tokenA[0].pos).unbind("click");
                            $("#sq"+(tokenA[1].pos-dice)).unbind("click");
                            rollenable();
                            checkfinish();
                            checkwin(moveOf);
                        });
                    }
                    else
                    {
                        tokenA[0].pos+=dice;
                        $("#sq"+tokenA[0].pos).html("<p> 1 A </p>");
                    }
                }
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
        }
    }

    if(tokenA[1].finish==false)
    {
        if(tokenA[1].pos > 27)
        {
            tokenA[1].finish=true;
            activeA--;
        }
    }

    if(tokenB[0].finish==false)
    {
        if(tokenB[0].pos > 27)
        {
            tokenB[0].finish=true;
            activeB--;
        }
    }

    if(tokenB[1].finish==false)
    {
        if(tokenB[1].pos > 27)
        {
            tokenB[1].finish=true;
            activeB--;
        }
    }
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
        $("#winloss").html("<blockquote>\“PLAYER A WON!")
    }
    else
    {
        $("#winloss").html("<blockquote>\“PLAYER B WON")
    }

    $("#continue").prepend("Play again!<br>");
}

function updatelocker()
{
        acount=bcount=0;
        if(tokenA[0].pos== -1 )
            acount++;
        if(tokenA[1].pos== -1 )
            acount++;
        if(tokenB[0].pos== -1 )
            bcount++;
        if(tokenB[1].pos== -1 )
            bcount++;

        $("#leftlocker").html(acount + " A");
        $("#rightlocker").html(bcount + " B");
}