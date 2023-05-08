let x=['fereastra1', 'fereastra2', 'fereastra3', 'fereastra4', 'fereastra5', 'fereastra6', 'fereastra7', 'fereastra8', 'fereastra9'];


function verif1()
{
   let x=[], ok=[7, 5, 6, 1, 2, 4, 3], i;
   let text;
   x[0] = document.getElementById("t1").value;
   x[1] = document.getElementById("t2").value;
   x[2] = document.getElementById("t3").value;
   x[3] = document.getElementById("t4").value;
   x[4] = document.getElementById("t5").value;
   x[5] = document.getElementById("t6").value;
   x[6] = document.getElementById("t7").value;
   for (i=0; i<7; i++)
      if (x[i] != ok[i])
         break;
   if (i<7) text="Greșit!";
      else  text="Corect!";
   document.getElementById("rez1").innerHTML = text;
   return;
}

function apare(id)
{
 let i;
 for (i=0; i<9; i++)
    if (x[i]==id)
       document.getElementById(id).style.visibility="visible";
       else 
       document.getElementById(x[i]).style.visibility="hidden";
}

function verif2()
{
   let text;
   if (document.getElementById('r1').checked == true)
      text="Corect!";
      else
      text="Greșit!"; 
      document.getElementById("rez2").innerHTML = text;
}

function verif3()
{
   let i, j, text;
   let x=[], y=[];
   let ok1=[2, 1, 3, 0, 0];
   let ok2=[2, 4, 3, 0, 0];
   x[0] = document.getElementById("n1").value;
   x[1] = document.getElementById("n2").value;
   x[2] = document.getElementById("n3").value;
   x[3] = document.getElementById("n4").value;
   x[4] = document.getElementById("n5").value;

   y[0] = document.getElementById("p1").value;
   y[1] = document.getElementById("p2").value;
   y[2] = document.getElementById("p3").value;
   y[3] = document.getElementById("p4").value;
   y[4] = document.getElementById("p5").value;
   for (i=0; i<5; i++)
       if (x[i] == '0' || x[i]!=ok1[i] && x[i]!=ok2[i]) break;
   if (i<5) 
      {text="Greșit! Cele două drumuri sunt: 2-1-3 si 2-4-3";}
      else
      {
       for (i=0; i<5; i++)
           if (y[i] == '0' || y[i]!=ok1[i] && y[i]!=ok2[i]) break;
       for (j=0; j<5; j++)
           if (x[i] != y[i]) break;
       if (i>=5)
          if (j<5)
             {text="Corect!";}
             else
             {text="Greșit, cele două drumuri nu sunt distincte!";}
         else
         {text="Greșit! Cele două drumuri sunt: 2-1-3 si 2-4-3";}
      }
      document.getElementById("rez3").innerHTML = text;
}

function verif4()
{
   let x=[], ok=[4, 3, 6, 2, 0];
   let i, text;
   
   x[0] = document.getElementById("o1").value;
   x[1] = document.getElementById("o2").value;
   x[2] = document.getElementById("o3").value;
   x[3] = document.getElementById("o4").value;
   x[4] = document.getElementById("o5").value;

   for (i=0; i<5; i++)
       if (x[i] != ok[i]) break;
   if (i<5) text="Greșit! dmin={4, 3, 6, 2, 0}"
      else  text="Corect!"
      document.getElementById("rez4").innerHTML = text;
}