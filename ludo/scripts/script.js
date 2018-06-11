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


function setnext()
{
    if(tokenA[0].pos==-1)
      next=0;
    else
      next=1;

      next1=(next+1)%2;
}


var moveOf=1;
var activeA=0, activeB=0;
/* moveOf = 1 => turn of Player A
   moveOf = 0 => turn of Player B */ 

var dice; //To denote the outcome of the roll

var acount,bcount,sqName; //To count the number of tockens in the locker
var next,next1;

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
                    tokenA[0].pos=1;
                    $("#sq"+tokenA[0].pos).html("<p> 1 A </p>");
                    activeA++;

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

                    $("#leftlocker").click(function(){
                        tokenA[next].pos=1;
                        $("#sq"+tokenA[next].pos).html("<p> 1 A </p>");
                        activeA++;
                        $("#leftlocker").unbind("click");
                        $("#sq"+tokenA[next1].pos).unbind("click");
                       // $("#roll").bind("click");

                       acount=bcount=0;

                        if(tokenA[0].pos== -1 )
                            acount++;
                        if(tokenA[1].pos== -1 )
                            acount++;
                        if(tokenB[0].pos== -1 )
                            bcount++;
                        if(tokenB[1].pos== -1 )
                            bcount++;
                        
                        console.log(acount);
                        $("#leftlocker").html(acount + " A");
                        $("#rightlocker").html(bcount + " B");
                    });

                    

                    $("#sq"+tokenA[next1].pos).click(function(){
                        $("#sq"+tokenA[next1].pos).html("<p></p>");
                        tokenA[next1].pos+=6;
                        $("#sq"+tokenA[next1].pos).html("<p> 1 A </p>");
                        $("#leftlocker").unbind("click");
                        $("#sq"+(tokenA[next1].pos-6)).unbind("click");
                       // $("#roll").bind("click");
                    });
    
                }
                else
                {
                    $("#sq"+tokenA[0].pos).click(function(){
                        $("#sq"+tokenA[0].pos).html("<p></p>");
                        tokenA[0].pos+=dice;
                        $("#sq"+tokenA[0].pos).html("<p> 1 A </p>");
                        $("#sq"+tokenA[1].pos).unbind("click");
                        $("#sq"+(tokenA[0].pos-dice)).unbind("click");
                       // $("#roll").bind("click");
                    });

                    $("#sq"+tokenA[1].pos).click(function(){
                        $("#sq"+tokenA[1].pos).html("<p></p>");
                        tokenA[1].pos+=dice;
                        $("#sq"+tokenA[1].pos).html("<p> 1 A </p>");
                        $("#sq"+tokenA[0].pos).unbind("click");
                        $("#sq"+(tokenA[1].pos-dice)).unbind("click");
                       // $("#roll").bind("click");
                    });
                }
            }
            else
            {
                //move B
            }
        }
        else
        {
            if(moveOf)
            {
                if(activeA==0)
                {
                    //skip to next move
                }
                else if(activeA==1)
                {
                    setnext();
                    $("#sq"+tokenA[next1].pos).html("<p></p>");
                    tokenA[next1].pos+=dice;
                    $("#sq"+tokenA[next1].pos).html("<p> 1 A </p>");
                }
                else
                {
                    $("#sq"+tokenA[0].pos).click(function(){
                        $("#sq"+tokenA[0].pos).html("<p></p>");
                        tokenA[0].pos+=dice;
                        $("#sq"+tokenA[0].pos).html("<p> 1 A </p>");
                        $("#sq"+tokenA[1].pos).unbind("click");
                        $("#sq"+(tokenA[0].pos-dice)).unbind("click");
                       // $("#roll").bind("click");
                    });

                    $("#sq"+tokenA[1].pos).click(function(){
                        $("#sq"+tokenA[1].pos).html("<p></p>");
                        tokenA[1].pos+=dice;
                        $("#sq"+tokenA[1].pos).html("<p> 1 A </p>");
                        $("#sq"+tokenA[0].pos).unbind("click");
                        $("#sq"+(tokenA[1].pos-dice)).unbind("click");
                       // $("#roll").bind("click");
                    });
                }
            }
        }

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
    });
});
