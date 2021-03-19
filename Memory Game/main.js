window.onload=tailGeneration;
			
var click = new Audio("sound/click.mp3"); //sound when u click on a card
var done= new Audio("sound/done.mp3"); //sound when u guess
var win= new Audio("sound/win2.mp3"); //sound when u win 

//function to generate the cards
function tailGeneration()
{
    var divs = "";
    for(i=1;i<=20;i++)
    {
        divs = divs +'<div class="tail" id="tail'+i+'" ><img src="img/locked.png" onclick="openTail('+i+')" /></div>';
        
        if (i%5==0) divs = divs +'<div style="clear:both" ></div>';
        
    }
        
    document.getElementById("card").innerHTML=divs;
    
    generate();
    
}




var openId = new Array(3); //holds the id of the first opened elements
var openPict = new Array(3); //holds the pics of the first opened elements



var pictures =new Array(20); //array that holds the pictures (20 pics in total)


//function that generate the pictures for the cards
function generate()
{
    //get the 10 pics
    for (i=0;i<10;i++)
    {
        pictures[i]=i+1;
    }
    //get the 10 pics in another order
    for (i=10;i<20;i++)
    {
        pictures[i]=i-9;
    }
    
    var step =20; //number of steps
    var images =new Array(20); //array of pics
    //generate randomly the pics
    for (i=0;i<20;i++)
    {
        var num = Math.floor(Math.random() * step);
        
        images[i]=pictures[num];
        pictures[num]=pictures[step-1];
        step=step-1;
        
    }
    pictures=images;
    
}

var quantityOpen = 0;

//responsible of adding the pics into the divs and fliping the cards
function openTail(n)
{
    
    var pictureNr = pictures[n-1];
    document.getElementById("tail"+n).innerHTML='<img height="200px" width="200px" src="img/im'+pictureNr+'.png" />'
    quantityOpen++;
    
    if (quantityOpen==1) {
        openPict[0]=pictures[n-1];                
        openId[0]=n;
    }
    else if (quantityOpen==2) {
        openPict[1]=openPict[0];
        openPict[0]=pictures[n-1];
        openId[1]=openId[0];
        openId[0]=n;    
    }
    else if (quantityOpen==3) {
        openPict[2]=openPict[1];
        openPict[1]=openPict[0];
        openPict[0]=pictures[n-1];
        openId[2]=openId[1];
        openId[1]=openId[0];
        openId[0]=n;				
    }
               
    //flip the first chosen card
    if (quantityOpen>2) {
        closeTail(openId[2]);
        quantityOpen=quantityOpen-1;    
    }	
    
    //if two pics are matching remove them
    if(openPict[0]==openPict[1]) {
        finish(openId[0],openId[1]);
        quantityOpen=quantityOpen-2;
    }
    else click.play(); //play the sound of clicking
}

//flip the card to be locked 
function closeTail(numerTail) {
    document.getElementById("tail"+numerTail).innerHTML='<img src="img/locked.png" onclick="openTail('+numerTail+')" />';
}

//function finished 
var counter=0;
function finish(firstTail,secondTail)
{
    
    done.play(); //play sound
    //remove pic 1
    document.getElementById("tail"+firstTail).innerHTML=null;
    document.getElementById("tail"+firstTail).style.boxShadow="none";
    document.getElementById("tail"+firstTail).style.background="none";
    document.getElementById("tail"+firstTail).style.border="none";
    document.getElementById("tail"+firstTail).style.width="202px";
    document.getElementById("tail"+firstTail).style.height="202px";
    //remove pic 2
    document.getElementById("tail"+secondTail).innerHTML=null;
    document.getElementById("tail"+secondTail).style.boxShadow="none";
    document.getElementById("tail"+secondTail).style.background="none";
    document.getElementById("tail"+secondTail).style.border="none";
    document.getElementById("tail"+secondTail).style.width="202px";
    document.getElementById("tail"+secondTail).style.height="202px";
    
    counter++ 
    //when counter hits 10 it game win
    if(counter==10)
    {
        win.play(); //play winner sound
        //change the title to congrats and add a button to play again
        document.getElementById("title").innerHTML='<span id="bravo">CONGRATULATIONS</span><br /> <input type="button" value="Once again!" onclick="location.reload()">';
        //style the new changes
        document.getElementById("title").style.paddingTop="100px";
        document.getElementById("bravo").style.fontSize="68px";
        
                    
    }
}