const harta2=document.getElementById('harta_canvas');
const ctx1=harta2.getContext('2d');
 
 
 
const ceru=new Image();
const avion=new Image();
const avion_rosu=new Image();
const cerc_numar=new Image();
ceru.src="../../imagini/ceru.png";
avion.src="../../imagini/avion.png";
avion_rosu.src="../../imagini/avion_rosu.png";
 
var h=harta2.height;
var hp=harta2.height/8;
var isGraf=0, ruel, stoop=0; 
var tip_harta=0;
var culoare=0; //0 - negru, 1 - rosu, verde - 2
var i, j, k, minim, c, muchie_actuala, inceput;
var G=[[]], C=[[]], X1=[[]], Y1=[[]], X2=[[]], Y2=[[]], XCost=[[]], YCost=[[]];
var M=[], dmin=[], tata=[], inf=1000000, varf;
var cn=[[]], pcn=[], muchii=[], nrmuchie, v1=[], v2=[], Pm=[[]];
 
function dreptunghi_info(id)
{
 if (document.getElementById(id).style.visibility=="hidden") 
    {document.getElementById(id).style.visibility="visible";}
 else 
    {document.getElementById(id).style.visibility="hidden";}
}
 
function modificare_grafAsociat()
{
 isGraf=1-isGraf;
 grafAsociat();
}
 
function grafAsociat()
{   if (tip_harta == 0) patrate();
       else
    if (tip_harta == 1) dijkstra_normal();
       else             
    if (tip_harta == 2) roy_floyd_normal();
       else
    if (tip_harta == 3) atomic();
       else
    if (tip_harta == 4) adn();
       else
    if (tip_harta == 5) roza();
       else
    if (tip_harta == 6) litera_antica();
       else
    if (tip_harta == 7) windows();
       else
    if (tip_harta == 8) rute();
}

function grafAsociat2()
{   if (tip_harta == 0) patrate();
       else
    if (tip_harta == 1) dijkstra();
       else             
    if (tip_harta == 2) roy_floyd();
       else
    if (tip_harta == 3) atomicc();
       else
    if (tip_harta == 4) adnn();
       else
    if (tip_harta == 5) rozaa();
       else
    if (tip_harta == 6) litera_anticaa();
       else
    if (tip_harta == 7) windowss();
       else
    if (tip_harta == 8) rutee();
}

 
function redimensionare(ID)
{
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    //mereu width>height-+
    const raport1=1350/1024*100; 
    const raport2=1024/1350*100;
    if(raport1*vh>100*vw)
    {   
        document.getElementById(ID).style.width=100+'vw';
        document.getElementById(ID).style.height=raport2+'vw';
    }
    else
    {
        document.getElementById(ID).style.height=100+'vh';
        document.getElementById(ID).style.width=raport1+'vh';
    }
}
 
function patrate()
{var i, j;
    tip_harta=0;
    if (isGraf) {ctx1.fillStyle='#d2dbe2'; ctx1.fillRect(0, 0, harta2.width, harta2.height);} 
    else
    {
    ctx1.drawImage(ceru, 0, 0, h, h);
    redimensionare('ID');
    ctx1.strokeStyle="rgb(0, 0, 0)";
    ctx1.lineWidth = 0.15;
    ctx1.strokeStyle = "#000000";
    for (i=0; i<8; i++)
        for (j=0; j<8; j++)
        ctx1.strokeRect(i*hp, j*hp, hp, hp);
    }
    
}
 
function dijkstra_normal()
{
   inceput=0; stoop=1;
   dijkstra();
   requestAnimationFrame(dijkstra);
}
 
function dijkstra()
{
    //ctx1.clearRect(0, 0, h, h);
    patrate();
    tip_harta=1;
    culoare=0;
    if (isGraf == 0)
       {
        ctx1.drawImage(avion, 4*hp, 1*hp, hp, hp);
        ctx1.drawImage(avion, 7*hp, 1*hp, hp, hp);
        ctx1.drawImage(avion, 3*hp, 5*hp, hp, hp);
        ctx1.drawImage(avion, 6*hp, 5*hp, hp, hp);
        ctx1.drawImage(avion_rosu, 1*hp, 6*hp, hp, hp);
        ctx1.drawImage(avion, 3*hp, 7*hp, hp, hp);
        ctx1.drawImage(avion, 6*hp, 7*hp, hp, hp);
       }
       else
       {
        cerc(4, 1, 0);
        cerc(7, 1, 0);
        cerc(3, 5, 0);
        cerc(6, 5, 0);
        cerc(1, 6, 1);
        cerc(3, 7, 0);
        cerc(6, 7, 0);
        ctx1.textAlign = "center";
        ctx1.font = "5pt Verdana";
        ctx1.fillStyle='rgb(0, 51, 102)';
        numar(1, 4, 1);
        numar(2, 7, 1);
        numar(3, 3, 5);
        numar(4, 6, 5);
        numar(5, 1, 6);
        numar(6, 3, 7);
        numar(7, 6, 7);
       }
    canvas_arrow(2*hp, 6*hp, 4*hp, 2*hp);
    canvas_arrow(4.5*hp, 2*hp, 3.5*hp, 5*hp);
    canvas_arrow(3.5*hp, 6*hp, 3.5*hp, 7*hp);
    canvas_arrow(4*hp, 5*hp, 7*hp, 2*hp);
    canvas_arrow(4.5*hp, 2*hp, 6.5*hp, 5*hp);
    canvas_arrow(4*hp, 7.5*hp, 6*hp, 7.5*hp);
    canvas_arrow(6.5*hp, 6*hp, 6.5*hp, 7*hp);
    canvas_arrow(6.5*hp, 5*hp, 7.5*hp, 2*hp);
    canvas_arrow(6*hp, 6*hp, 4*hp, 7*hp);
    dreptunghiCost(30, 6*hp,   3*hp);
    dreptunghiCost(5, 5*hp, 6.5*hp);
    dreptunghiCost(12, 7*hp, 3.5*hp);
    dreptunghiCost(15, 6.5*hp, 6.5*hp);
    dreptunghiCost(10, 3*hp, 4*hp);
    dreptunghiCost(15, 4*hp, 3.5*hp);
    dreptunghiCost(15, 3.5*hp, 6.5*hp);
    dreptunghiCost(20, 6*hp, 4*hp);
    dreptunghiCost(20, 5*hp, 7.5*hp);
    
}
 
function roy_floyd_normal()
{
   inceput=0; stoop=1;
   roy_floyd();
   requestAnimationFrame(roy_floyd);
}
 
function roy_floyd()
{   
    ctx1.clearRect(0, 0, h, h);
    patrate();
    tip_harta=2;
    culoare=0;
    if (isGraf == 0)
       {
        ctx1.drawImage(avion, 3*hp, 3*hp, hp, hp);
        ctx1.drawImage(avion_rosu, 1*hp, 6*hp, hp, hp);
        ctx1.drawImage(avion, 6*hp, 6*hp, hp, hp);
       }
       else
       {
        cerc(3, 3, 0);
        cerc(1, 6, 1);
        cerc(6, 6, 0);
        ctx1.textAlign = "center";
        ctx1.font = "5pt Verdana";
        ctx1.fillStyle='rgb(0, 51, 102)';   
        numar(1, 3, 3);
        numar(2, 1, 6);
        numar(3, 6, 6);
       }
    canvas_arrow(2*hp, 6*hp, 3*hp, 4*hp);
    canvas_arrow(4*hp, 4*hp, 6*hp, 6*hp);
    canvas_arrow(2*hp, 6.5*hp, 6*hp, 6.5*hp);
    dreptunghiCost(15, 2.5*hp,   5*hp);
    dreptunghiCost(10,   5*hp,   5*hp);
    dreptunghiCost(40,   4*hp, 6.5*hp);
}
 
function atomic()
{
   inceput=0; stoop=1;
   atomicc();
   requestAnimationFrame(atomicc);
}
 
function atomicc()
{   
    ctx1.clearRect(0, 0, h, h);
    patrate();
    tip_harta=3;
    culoare=0;
    if (isGraf == 0)
       {
        ctx1.drawImage(avion, 3*hp, 0*hp, hp, hp);
        ctx1.drawImage(avion_rosu, 0*hp, 3*hp, hp, hp);
        ctx1.drawImage(avion, 6*hp, 3*hp, hp, hp);
        ctx1.drawImage(avion, 3*hp, 5*hp, hp, hp);
        ctx1.drawImage(avion, 0*hp, 7*hp, hp, hp);
        ctx1.drawImage(avion, 6*hp, 7*hp, hp, hp);
       }
       else
       {
        cerc(3, 0, 0);
        cerc(0, 3, 1);
        cerc(6, 3, 0);
        cerc(3, 5, 0);
        cerc(0, 7, 0);
        cerc(6, 7, 0);
        ctx1.textAlign = "center";
        ctx1.font = "5pt Verdana";
        ctx1.fillStyle='rgb(0, 51, 102)';   
        numar(1, 3, 0);
        numar(2, 0, 3);
        numar(3, 6, 3);
        numar(4, 3, 5);
        numar(5, 0, 7);
        numar(6, 6, 7);
       }
    canvas_arrow(3*hp, 1*hp, 1*hp, 3*hp);
    canvas_arrow(3.37*hp, 1*hp, 3.37*hp, 5*hp);
    canvas_arrow(3.63*hp, 5*hp, 3.63*hp, 1*hp);
    canvas_arrow(4*hp, 1*hp, 6*hp, 3*hp);
    canvas_arrow(1*hp, 7*hp, 3*hp, 6*hp);
    canvas_arrow(6*hp, 7*hp, 4*hp, 6*hp);
    canvas_arrow(1*hp, 4*hp, 6.5*hp, 7*hp);
    canvas_arrow(6*hp, 4*hp, 0.5*hp, 7*hp);
    dreptunghiCost(20, 1.1875*hp, 6.625*hp);
    dreptunghiCost(10, 5.8125*hp, 6.625*hp);
    dreptunghiCost(11, 2.5*hp, 6.25*hp);
    dreptunghiCost(15, 4.5*hp, 6.25*hp);
    dreptunghiCost(10, 5*hp, 2*hp);
    dreptunghiCost(10, 2*hp, 2*hp);
    dreptunghiCost(20, 3.63*hp, 2*hp);
    dreptunghiCost(10, 3.37*hp, 4*hp);
}
 
function adn()
{
   inceput=0; stoop=1;
   adnn();
   requestAnimationFrame(adnn);
}
 
function adnn()
{   
    ctx1.clearRect(0, 0, h, h);
    patrate();
    tip_harta=4;
    culoare=0;
    if (isGraf == 0)
       {
        ctx1.drawImage(avion, 0*hp, 0*hp, hp, hp);
        ctx1.drawImage(avion_rosu, 7*hp, 0*hp, hp, hp);
        ctx1.drawImage(avion, 0*hp, 3*hp, hp, hp);
        ctx1.drawImage(avion, 7*hp, 4*hp, hp, hp);
        ctx1.drawImage(avion, 0*hp, 7*hp, hp, hp);
        ctx1.drawImage(avion, 7*hp, 7*hp, hp, hp);
       }
       else
       {
        cerc(0, 0, 0);
        cerc(7, 0, 1);
        cerc(0, 3, 0);
        cerc(7, 4, 0);
        cerc(0, 7, 0);
        cerc(7, 7, 0);
        ctx1.textAlign = "center";
        ctx1.font = "5pt Verdana";
        ctx1.fillStyle='rgb(0, 51, 102)';
        numar(1, 0 ,0);
        numar(2, 7, 0);
        numar(3, 0, 3);
        numar(4, 7, 4);
        numar(5, 0, 7);
        numar(6, 7, 7);
       }
    canvas_arrow(1*hp, 0.38*hp, 7*hp, 0.38*hp);
    canvas_arrow(7*hp, 0.62*hp, 1*hp, 0.62*hp);
    canvas_arrow(1.5*hp, 1*hp, 7*hp, 4*hp);
    canvas_arrow(7*hp, 4.5*hp, 0.5*hp, 1*hp);
    canvas_arrow(6.5*hp, 1*hp, 1*hp, 3*hp);
    canvas_arrow(1*hp, 3.5*hp, 7.5*hp, 1*hp);
    canvas_arrow(1.5*hp, 4*hp, 7*hp, 7*hp);
    canvas_arrow(6*hp, 7*hp, 0.5*hp, 4*hp);
    canvas_arrow(6.5*hp, 5*hp, 1*hp, 7*hp);
    canvas_arrow(2*hp, 7*hp, 7.5*hp, 5*hp);
    canvas_arrow(1*hp, 7.38*hp, 7*hp, 7.38*hp);
    canvas_arrow(7*hp, 7.62*hp, 1*hp, 7.62*hp);
    dreptunghiCost(20, 5.5*hp, 0.38*hp);
    dreptunghiCost(10, 2.5*hp, 0.62*hp);
    dreptunghiCost(20, 5.625*hp, 3.25*hp);
    dreptunghiCost(10, 2.125*hp, 1.875*hp);
    dreptunghiCost(20, 2.375*hp, 2.5*hp);
    dreptunghiCost(60, 5.875*hp, 1.625*hp);
    dreptunghiCost(25, 5.625*hp, 6.25*hp);
    dreptunghiCost(50, 1.825*hp, 4.75*hp);
    dreptunghiCost(30, 2.125*hp, 6.5*hp);
    dreptunghiCost(15, 6.125*hp, 5.5*hp);
    dreptunghiCost(40, 5.5*hp, 7.38*hp);
    dreptunghiCost(20, 2.5*hp, 7.62*hp);
}
 
function roza()
{
   inceput=0; stoop=1;
   rozaa();
   requestAnimationFrame(rozaa);
}
 
function rozaa()
{   
    ctx1.clearRect(0, 0, h, h);
    patrate();
    tip_harta=5;
    culoare=0;
    if (isGraf == 0)
       {
        ctx1.drawImage(avion, 1*hp, 1*hp, hp, hp);
        ctx1.drawImage(avion_rosu, 6*hp, 1*hp, hp, hp);
        ctx1.drawImage(avion, 1*hp, 6*hp, hp, hp);
        ctx1.drawImage(avion, 6*hp, 6*hp, hp, hp);
       }
       else
       {
        cerc(1, 1, 0);
        cerc(6, 1, 1);
        cerc(1, 6, 0);
        cerc(6, 6, 0);
        ctx1.textAlign = "center";
        ctx1.font = "5pt Verdana";
        ctx1.fillStyle='rgb(0, 51, 102)';
        numar(1, 1, 1);
        numar(2, 6, 1);
        numar(3, 1, 6);
        numar(4, 6, 6);
       }
    canvas_arrow(6*hp, 1.5*hp, 2*hp, 1.5*hp);
    canvas_arrow(1.5*hp, 2*hp, 1.5*hp, 6*hp);
    canvas_arrow(2*hp, 6.5*hp, 6*hp, 6.5*hp);
    canvas_arrow(6.5*hp, 6*hp, 6.5*hp, 2*hp);
    canvas_arrow(1.75*hp, 2*hp, 5.87*hp, 6*hp);
    canvas_arrow(6.25*hp, 6*hp, 2.13*hp, 2*hp);
    canvas_arrow(1.75*hp, 6*hp, 5.87*hp, 2*hp);
    canvas_arrow(6.25*hp, 2*hp, 2.13*hp, 6*hp);
    dreptunghiCost(11, 4.84*hp, 3*hp);
    dreptunghiCost(1, 3.16*hp, 3*hp);
    dreptunghiCost(1, 4.84*hp, 5*hp);
    dreptunghiCost(10, 6.5*hp, 4*hp);
    dreptunghiCost(10, 4*hp, 6.5*hp);
    dreptunghiCost(10, 1.5*hp, 4*hp);
    dreptunghiCost(10, 4*hp, 1.5*hp);
    dreptunghiCost(11, 3.16*hp, 5*hp);
}
 
function litera_antica()
{
   inceput=0; stoop=1;
   litera_anticaa();
   requestAnimationFrame(litera_anticaa);
}
 
function litera_anticaa()
{   
    ctx1.clearRect(0, 0, h, h);
    patrate();
    tip_harta=6;
    culoare=0;
    if (isGraf == 0)
       {
        ctx1.drawImage(avion, 1*hp, 1*hp, hp, hp);
        ctx1.drawImage(avion, 6*hp, 1*hp, hp, hp);
        ctx1.drawImage(avion, 3*hp, 3*hp, hp, hp);
        ctx1.drawImage(avion_rosu, 5*hp, 5*hp, hp, hp);
        ctx1.drawImage(avion, 3*hp, 7*hp, hp, hp);
        ctx1.drawImage(avion, 7*hp, 7*hp, hp, hp);
       }
       else
       {
        cerc(1, 1, 0);
        cerc(6, 1, 0);
        cerc(3, 3, 0);
        cerc(5, 5, 1);
        cerc(3, 7, 0);
        cerc(7, 7, 0);
        ctx1.textAlign = "center";
        ctx1.font = "5pt Verdana";
        ctx1.fillStyle='rgb(0, 51, 102)';
        numar(1, 1, 1);
        numar(2, 6, 1);
        numar(3, 3, 3);
        numar(4, 3, 7);
        numar(5, 7, 7);
        numar(6, 5, 5);
       }
    canvas_arrow(2*hp, 1.5*hp,6*hp, 1.5*hp);
    canvas_arrow(3*hp, 3*hp, 2*hp, 2*hp);
    canvas_arrow(3.5*hp, 4*hp, 3.5*hp, 7*hp);
    canvas_arrow(4*hp, 4*hp, 5*hp, 5*hp);
    canvas_arrow(6*hp, 2*hp, 4*hp, 3*hp);
    canvas_arrow(6.75*hp, 2*hp, 7.5*hp, 7*hp);
    canvas_arrow(7*hp, 7.5*hp, 4*hp, 7.5*hp);
    canvas_arrow(5*hp, 6*hp, 4*hp, 7*hp);
    canvas_arrow(5.5*hp, 5*hp, 6.5*hp, 2*hp);
    dreptunghiCost(19, 6*hp, 3.5*hp);
    dreptunghiCost(1, 4.5*hp, 6.5*hp);
    dreptunghiCost(3, 5.5*hp, 7.5*hp);
    dreptunghiCost(2, 7.125*hp, 4.5*hp);
    dreptunghiCost(10, 5*hp, 2.5*hp);
    dreptunghiCost(2, 4.5*hp, 4.5*hp);
    dreptunghiCost(1, 3.5*hp, 5.5*hp);
    dreptunghiCost(1, 2.5*hp, 2.5*hp);
    dreptunghiCost(1, 4*hp, 1.5*hp);
}
 
function windows()
{
   inceput=0; stoop=1;
   windowss();
   requestAnimationFrame(windowss);
}
 
function windowss()
{   
    ctx1.clearRect(0, 0, h, h);
    patrate();
    tip_harta=7;
    culoare=0;
    if (isGraf == 0)
       {
        ctx1.drawImage(avion, 0*hp, 1*hp, hp, hp);
        ctx1.drawImage(avion, 3*hp, 1*hp, hp, hp);
        ctx1.drawImage(avion_rosu, 6*hp, 1*hp, hp, hp);
        ctx1.drawImage(avion, 0*hp, 4*hp, hp, hp);
        ctx1.drawImage(avion, 3*hp, 4*hp, hp, hp);
        ctx1.drawImage(avion, 6*hp, 4*hp, hp, hp);
        ctx1.drawImage(avion, 1*hp, 7*hp, hp, hp);
        ctx1.drawImage(avion, 4*hp, 7*hp, hp, hp);
        ctx1.drawImage(avion, 7*hp, 7*hp, hp, hp);
       }
       else
       {
        cerc(0, 1, 0);
        cerc(3, 1, 0);
        cerc(6, 1, 1);
        cerc(0, 4, 0);
        cerc(3, 4, 0);
        cerc(6, 4, 0);
        cerc(1, 7, 0);
        cerc(4, 7, 0);
        cerc(7, 7, 0);
        ctx1.textAlign = "center";
        ctx1.font = "5pt Verdana";
        ctx1.fillStyle='rgb(0, 51, 102)';   
        numar(1, 0, 1);
        numar(2, 3, 1);
        numar(3, 0, 4);
        numar(4, 3, 4);
        numar(5, 6, 4);
        numar(6, 1, 7);
        numar(7, 4, 7);
        numar(8, 6, 1);
        numar(9, 7, 7);
       }
    canvas_arrow(3*hp, 1.5*hp, 1*hp, 1.5*hp);
    canvas_arrow(6*hp, 1.5*hp, 4*hp, 1.5*hp);
    canvas_arrow(3*hp, 4.5*hp, 1*hp, 4.5*hp);
    canvas_arrow(4*hp, 4.5*hp, 6*hp, 4.5*hp);
    canvas_arrow(2*hp, 7.5*hp, 4*hp, 7.5*hp);
    canvas_arrow(5*hp, 7.5*hp, 7*hp, 7.5*hp);
    canvas_arrow(0.5*hp, 2*hp, 0.5*hp, 4*hp);
    canvas_arrow(3.5*hp, 4*hp, 3.5*hp, 2*hp);
    canvas_arrow(6.5*hp, 4*hp, 6.5*hp, 2*hp);
    canvas_arrow(0.5*hp, 5*hp, 1.5*hp, 7*hp);
    canvas_arrow(4.5*hp, 7*hp, 3.5*hp, 5*hp);
    canvas_arrow(7.5*hp, 7*hp, 6.5*hp, 5*hp);
    dreptunghiCost(1, 7*hp, 6*hp);
    dreptunghiCost(2, 4*hp, 6*hp);
    dreptunghiCost(2, 1*hp, 6*hp);
    dreptunghiCost(2, 6.5*hp, 3*hp);
    dreptunghiCost(1, 3.5*hp, 3*hp);
    dreptunghiCost(1, 0.5*hp, 3*hp);
    dreptunghiCost(2, 6*hp, 7.5*hp);
    dreptunghiCost(1, 3*hp, 7.5*hp);
    dreptunghiCost(2, 5*hp, 4.5*hp);
    dreptunghiCost(1, 2*hp, 4.5*hp);
    dreptunghiCost(1, 5*hp, 1.5*hp);
    dreptunghiCost(2, 2*hp, 1.5*hp);
}
 
function rute()
{
   inceput=0; stoop=1;
   rutee();
   requestAnimationFrame(rutee);
}
 
function rutee()
{   
    ctx1.clearRect(0, 0, h, h);
    patrate();
    tip_harta=8;
    culoare=0;
    if (isGraf == 0)
       {
        ctx1.drawImage(avion, 4*hp, 1*hp, hp, hp);
        ctx1.drawImage(avion, 1*hp, 3*hp, hp, hp);
        ctx1.drawImage(avion, 7*hp, 3*hp, hp, hp);
        ctx1.drawImage(avion, 1*hp, 7*hp, hp, hp);
        ctx1.drawImage(avion_rosu, 7*hp, 7*hp, hp, hp);
       }
       else
       {
        cerc(4, 1, 0);
        cerc(1, 3, 0);
        cerc(7, 3, 0);
        cerc(1, 7, 0);
        cerc(7, 7, 1);
        ctx1.textAlign = "center";
        ctx1.font = "5pt Verdana";
        ctx1.fillStyle='rgb(0, 51, 102)';   
        numar(1, 4, 1);
        numar(2, 1, 3);
        numar(3, 7, 3);
        numar(4, 1, 7);
        numar(5, 7, 7);
       }
    canvas_arrow(2*hp, 3*hp, 4*hp, 2*hp);
    canvas_arrow(7*hp, 3*hp, 5*hp, 2*hp);
    canvas_arrow(4.37*hp, 2*hp, 2*hp, 7*hp);
    canvas_arrow(4.63*hp, 2*hp, 7*hp, 7*hp);
    canvas_arrow(2*hp, 7.38*hp, 7*hp, 7.38*hp);
    canvas_arrow(7*hp, 7.67*hp, 2*hp, 7.67*hp);
    canvas_arrow(1.38*hp, 4*hp, 1.38*hp, 7*hp);
    canvas_arrow(1.67*hp, 7*hp, 1.67*hp, 4*hp);
    canvas_arrow(7.38*hp, 4*hp, 7.38*hp, 7*hp);
    canvas_arrow(7.67*hp, 7*hp, 7.67*hp, 4*hp);
    dreptunghiCost(1, 3*hp, 2.5*hp);
    dreptunghiCost(1, 6*hp, 2.5*hp);
    dreptunghiCost(1, 3.185*hp, 4.5*hp);
    dreptunghiCost(1, 5.815*hp, 4.5*hp);
    dreptunghiCost(4, 5.75*hp, 7.38*hp);
    dreptunghiCost(3, 3.25*hp, 7.67*hp);
    dreptunghiCost(2, 1.38*hp, 6.25*hp);
    dreptunghiCost(5, 1.67*hp, 4.75*hp);
    dreptunghiCost(2, 7.38*hp, 6.25*hp);
    dreptunghiCost(5, 7.67*hp, 4.75*hp);
}
 
function sterge_harta()
{
 ctx1.clearRect(0, 0, h, h);
 patrate();
 stoop=1;
 tip_harta=0;
}
 
function canvas_arrow(fromx, fromy, tox, toy) {
    var headlen = 5; // length of head in pixels
    ctx1.beginPath();
    if (culoare == 0)
       ctx1.strokeStyle= "#000000"; 
       else
       if (culoare == 1)
          ctx1.strokeStyle= "#FF0000";
          else
          ctx1.strokeStyle= "#00FF00";
    var dx = tox - fromx;
    var dy = toy - fromy;
    var angle = Math.atan2(dy, dx);
    ctx1.lineWidth = 1;
    ctx1.moveTo(fromx, fromy);
    ctx1.lineTo(tox, toy);
    ctx1.lineTo(tox - headlen * Math.cos(Math.PI / 6 - angle), toy - headlen * Math.sin(angle - Math.PI / 6));
    ctx1.moveTo(tox, toy);
    ctx1.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
    ctx1.stroke();
  }
 
  ///functia pune mijlocul patratului pe coordonatele specificate
  ///diy function :) ne-a luat cateva seri si vreo 5 zile de la batraneti
  ///nu umbla la coordonate decat daca vrei sa pierzi cateva ore bune
  ///in caz de ceva dubleaza inaltimea
function dreptunghiCost(cost, x, y)
{    
     ctx1.strokeStyle='rgb(0, 51, 102)';
     ctx1.fillStyle='rgb(195, 212, 228)';
 
     x-=hp/3; y-=hp/5;
     ctx1.strokeRect(x, y, hp/1.5, hp/2.5);
     ctx1.fillRect(x, y, hp/1.5, hp/2.5);
 
     ctx1.textAlign = "center";
     ctx1.font = "5pt Verdana";
     ctx1.fillStyle='rgb(0, 51, 102)';
 
     ctx1.fillText(cost, x+hp/3, y+hp/3);
     requestAnimationFrame(dreptunghiCost);
}
 
function cerc(x, y, r)
{
    if (r) ctx1.fillStyle='#db452b';
       else
       ctx1.fillStyle='#1e7cda';
       ctx1.beginPath();
       ctx1.arc(x*hp+0.5*hp, y*hp+0.5*hp, hp/2, 0, 2*Math.PI);
       ctx1.fill();
}
 
function numar(nr, x, y)
{
    ctx1.fillText(nr , x*hp+hp/2, y*hp+2*hp/3);
}
 
function pune_valori()
{var i, j, k;
 nrmuchie=0;  
 muchie_actuala=0; 
 stoop=0;
 if (tip_harta == 1)
    {
     start=5;
     Pm=[[7], [2, 1, 2], [0], [2, 3, 4], [3, 5, 6, 7], [1, 8], [1, 9], [0]];
      G=[[7], [2, 3, 4], [0], [2, 2, 6], [3, 2, 6, 7], [1, 1], [1, 7], [0]];
 
     k=0; 
     for (i=1; i<=G[0][0]; i++)
         for (j=1; j<=G[i][0]; j++)
             {v1[++k]=i; v2[k]=j;}
 
     C=[[7], [2, 15, 20], [0], [2, 30, 15], [3, 12, 5, 15], [1, 10], [1, 20], [0]];
     X1=[[7], [2, 4.5, 4.5], [0], [2, 4, 3.5], [3, 6.5, 6, 6.5], [1, 2], [1, 4], [0]];
     Y1=[[7], [2, 2, 2], [0], [2, 5, 6], [3, 5, 6, 6], [1, 6], [1, 7.5], [0]];
     X2=[[7], [2, 3.5, 6.5], [0], [2, 7, 3.5], [3, 7.5, 4, 6.5], [1, 4], [1, 6], [0]];
     Y2=[[7], [2, 5, 5], [0], [2, 2, 7], [3, 2, 7, 7], [1, 2], [1, 7.5], [0]];
     XCost=[[7], [2, 4, 6], [0], [2, 6, 3.5], [3, 7, 5, 6.5], [1, 3], [1, 5], [0]];
     YCost=[[7], [2, 3.5, 4], [0], [2, 3, 6.5], [3, 3.5, 6.5, 6.5], [1, 4], [1, 7.5], [0]];
     cn=[[9], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];
     tata=[0, 0, 0, 0, 0, 0, 0, 0, 0];
     pcn=[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
   }     
 else 
 if (tip_harta == 2)
    {
      start=2;
      Pm=[[3], [1, 1], [2, 2, 3], [0]];
       G=[[3], [1, 3], [2, 1, 3], [0]];
 
      k=0; 
      for (i=1; i<=G[0][0]; i++)
          for (j=1; j<=G[i][0]; j++)
              {v1[++k]=i; v2[k]=j;}
 
      C=[[3], [1, 10], [2, 15, 40], [0]];
      X1=[[3], [1, 4], [2, 2, 2], [0]];
      Y1=[[3], [1, 4], [2, 6, 6.5], [0]];
      X2=[[3], [1, 6], [2, 3, 6], [0]];
      Y2=[[3], [1, 6], [2, 4, 6.5], [0]];
      XCost=[[3], [1, 5], [2, 2.5, 4], [0]];
      YCost=[[3], [1, 5], [2, 5, 6.5], [0]];
      cn=[[9], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];
      tata=[0, 0, 0, 0, 0, 0, 0, 0, 0];
      pcn=[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    }
 else 
 if (tip_harta == 3)
    {start=2;
     Pm=[[6], [3, 1 ,2, 3], [1, 4], [1, 5], [1, 6], [1, 7], [1, 8]];
      G=[[6], [3, 2, 3, 4], [1, 6], [1, 5], [1, 1], [1, 4], [1, 4]];
      C=[[6], [3, 10, 10, 10], [1, 10], [1, 20], [1, 20], [1, 11], [1, 15]];
     k=0; 
     for (i=1; i<=G[0][0]; i++)
         for (j=1; j<=G[i][0]; j++)
             {v1[++k]=i; v2[k]=j;}
 
      X1=[[6], [3, 3, 4, 3.37], [1, 1],   [1, 6],   [1, 3.63], [1, 1], [1, 6]];
      Y1=[[6], [3, 1, 1, 1],    [1, 4],   [1, 4],   [1, 5],    [1, 7], [1, 7]];
      X2=[[6], [3, 1, 6, 3.37], [1, 6.5], [1, 0.5], [1, 3.63], [1, 3], [1, 4]];
      Y2=[[6], [3, 3, 3, 5],    [1, 7],   [1, 7],   [1, 1],    [1, 6], [1, 6]];
      XCost=[[6], [3, 2, 5, 3.37], [1, 5.8125], [1, 1.1875], [1, 3.63], [1, 2.5],  [1, 4.5]];
      YCost=[[6], [3, 2, 2, 4],    [1, 6.625],  [1, 6.625],  [1, 2],    [1, 6.25], [1, 6.25]];
 
     cn=[[9], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];
     tata=[0, 0, 0, 0, 0, 0, 0, 0, 0];
     pcn=[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    }
 else 
 if (tip_harta == 4)
    {
     start=2;
     Pm=[[6], [2, 1, 2], [2, 3, 4], [2, 5, 6], [2, 7, 8], [2, 9, 10], [2, 11, 12]];
      G=[[6], [2, 2, 4], [2, 1, 3], [2, 2, 6], [2, 1, 5], [2, 4, 6], [2, 3, 5]];
      C=[[6], [2, 20, 20], [2, 10, 20], [2, 60, 25], [2, 10, 30], [2, 15, 40], [2, 50, 20]];
     k=0; 
     for (i=1; i<=G[0][0]; i++)
         for (j=1; j<=G[i][0]; j++)
             {v1[++k]=i; v2[k]=j;}
 
      X1=[[6], [2, 1, 1.5],  [2, 7, 6.5],  [2, 1, 1.5], [2, 7, 6.5], [2, 2, 1],    [2, 6, 7]];
      Y1=[[6], [2, 0.38, 1], [2, 0.62, 1], [2, 3.5, 4], [2, 4.5, 5], [2, 7, 7.38], [2, 7, 7.62]];
      X2=[[6], [2, 7, 7],    [2, 1, 1],    [2, 7.5, 7], [2, 0.5, 1], [2, 7.5, 7],  [2, 0.5, 1]];
      Y2=[[6], [2, 0.38, 4], [2, 0.62, 3], [2, 1, 7],   [2, 1, 7],   [2, 5, 7.38], [2, 4, 7.62]];
 
      XCost=[[6], [2, 5.5, 5.625], [2, 2.5, 2.375], [2, 5.875, 5.625], [2, 2.125, 2.125], [2, 6.125, 5.5],  [2, 1.825, 2.5]];
      YCost=[[6], [2, 0.38, 3.25], [2, 0.62, 2.5],  [2, 1.625, 6.25],  [2, 1.875, 6.5],   [2, 5.5, 7.38],   [2, 4.75, 7.62]];
 
     cn=[[9], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];
     tata=[0, 0, 0, 0, 0, 0, 0, 0, 0];
     pcn=[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    }
 else
 if (tip_harta == 5)
    {
     start=2;
     Pm=[[4], [2, 1, 2], [2, 3, 4], [2, 5, 6], [2, 7, 8]];
      G=[[4], [2, 3, 4], [2, 1, 3], [2, 2, 4], [2, 1, 2]];
      C=[[4], [2, 10, 1], [2, 10, 11], [2, 11, 10], [2, 1, 10]]; 

      k=0; 
      for (i=1; i<=G[0][0]; i++)
          for (j=1; j<=G[i][0]; j++)
              {v1[++k]=i; v2[k]=j;} 

     X1=[[4], [2, 1.5, 1.75], [2, 6, 6.25], [2, 1.75, 2], [2, 6.25, 6.5]];
     Y1=[[4], [2, 2, 2],      [2, 1.5, 2],  [2, 6, 6.5],  [2, 6, 6]];
     X2=[[4], [2, 1.5, 5.75], [2, 2, 2.25], [2, 5.75, 6], [2, 2.25, 6.5]];
     Y2=[[4], [2, 6, 6],      [2, 1.5, 6],  [2, 2, 6.5],  [2, 2, 2]];

     XCost=[[4], [2, 1.5, 4.84], [2, 4, 3.16], [2, 4.84, 4], [2, 3.16, 6.5]];
     YCost=[[4], [2, 4, 5],      [2, 1.5, 5],  [2, 3, 6.5],  [2, 3, 4]];

     cn=[[9], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];
     tata=[0, 0, 0, 0, 0, 0, 0, 0, 0];
     pcn=[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
     
    }  
 else
 if (tip_harta == 6)
    {
     start=4;
     Pm=[[6], [1, 1], [2, 2, 3], [3, 4, 5, 6], [2, 7, 8], [0], [1, 9]];  
      G=[[6], [1, 2], [2, 3, 6], [3, 1, 4, 5], [2, 2, 5], [0], [1, 5]];  
      C=[[6], [1, 1], [2, 10, 2], [3, 1, 2, 1], [2, 19, 1], [0], [1, 3]];
      
      k=0; 
      for (i=1; i<=G[0][0]; i++)
          for (j=1; j<=G[i][0]; j++)
              {v1[++k]=i; v2[k]=j;} 

     X1=[[6], [1, 2],   [2, 6, 6.75], [3, 3, 4, 3.5], [2, 5.5, 5], [0], [1, 7]];  
     Y1=[[6], [1, 1.5], [2, 2, 2],    [3, 3, 4, 4],   [2, 5, 6],   [0], [1, 7.5]];  
     X2=[[6], [1, 6],   [2, 4, 7.5],  [3, 2, 5, 3.5], [2, 6.5, 4], [0], [1, 7]];  
     Y2=[[6], [1, 1.5], [2, 3, 7],    [3, 2, 5, 7],   [2, 2, 7],   [0], [1, 7.5]];  

     XCost=[[6], [1, 4],   [2, 5, 7.125], [3, 2.5, 4.5, 3.5], [2, 6, 4.5],   [0], [1, 5.5]];  
     YCost=[[6], [1, 1.5], [2, 2.5, 4.5], [3, 2.5, 4.5, 5.5], [2, 3.5, 6.5], [0], [1, 7.5]];  

     cn=[[9], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];
     tata=[0, 0, 0, 0, 0, 0, 0, 0, 0];
     pcn=[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    }    
 else
 if (tip_harta == 7)
    {
     start=8;
     //console.log(69);
     Pm=[[9], [1, 1], [1, 2], [1, 3], [3, 4, 5, 6], [1, 7], [1, 8], [2, 9, 10], [1, 11], [1, 12]]; 
      G=[[9], [1, 3], [1, 1], [1, 6], [3, 2, 3, 5], [1, 8], [1, 7], [2, 4, 9], [1, 2], [1, 5]]; 
      C=[[9], [1, 1], [1, 2], [1, 2], [3, 1, 1, 2], [1, 2], [1, 1], [2, 2, 2], [1, 1], [1, 1]]; 

     k=0; 
     for (i=1; i<=G[0][0]; i++)
         for (j=1; j<=G[i][0]; j++)
             {v1[++k]=i; v2[k]=j;} 

     X1=[[9], [1, 0.5], [1, 3],   [1, 0.5], [3, 3.5, 3, 4],   [1, 6.5], [1, 2],   [2, 4.5, 5], [1, 6],   [1, 7.5]]; 
     Y1=[[9], [1, 2],   [1, 1.5], [1, 5],   [3, 4, 4.5, 4.5], [1, 4],   [1, 7.5], [2, 7, 7.5], [1, 1.5], [1, 7]]; 
     X2=[[9], [1, 0.5], [1, 1],   [1, 1.5], [3, 3.5, 1, 6],   [1, 6.5], [1, 4],   [2, 3.5, 7], [1, 4],   [1, 6.5]]; 
     Y2=[[9], [1, 4],   [1, 1.5], [1, 7],   [3, 2, 4.5, 4.5], [1, 2],   [1, 7.5], [2, 5, 7.5], [1, 1.5], [1, 5]]; 

     XCost=[[9], [1, 0.5], [1, 2],   [1, 1], [3, 3.5, 2, 5],   [1, 6.5], [1, 3],   [2, 4, 6],   [1, 5],   [1, 7]]; 
     YCost=[[9], [1, 3],   [1, 1.5], [1, 6], [3, 3, 4.5, 4.5], [1, 3],   [1, 7.5], [2, 6, 7.5], [1, 1.5], [1, 6]]; 

     cn=[[13], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0]];
     tata=[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
     pcn=[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    }
 else
 if (tip_harta == 8)
    {
     start=5; 
     Pm=[[5], [2, 1, 2], [2, 3, 4], [2, 5, 6], [2, 7, 8], [2, 9, 10]]; 
      G=[[5], [2, 4, 5], [2, 1, 4], [2, 1, 5], [2, 2, 5], [2, 3, 4]];
      C=[[5], [2, 1, 1], [2, 1, 2], [2, 1, 2], [2, 5, 4], [2, 5, 3]];

     k=0; 
     for (i=1; i<=G[0][0]; i++)
         for (j=1; j<=G[i][0]; j++)
             {v1[++k]=i; v2[k]=j;}  
      
     X1=[[5], [2, 4.37, 4.63], [2, 2, 1.38], [2, 7, 7.38], [2, 1.67, 2], [2, 7.67, 7]];
     Y1=[[5], [2, 2, 2],       [2, 3, 4],    [2, 3, 4],    [2, 7, 7.38], [2, 7, 7.67]];
     X2=[[5], [2, 2, 7],       [2, 4, 1.38], [2, 5, 7.38], [2, 1.67, 7], [2, 7.67, 2]];
     Y2=[[5], [2, 7, 7],       [2, 2, 7],    [2, 2, 7],    [2, 4, 7.38], [2, 4, 7.67]]; 

     XCost=[[5], [2, 3.185, 5.815], [2, 3, 1.38],   [2, 6, 7.38],   [2, 1.67, 5.75], [2, 7.67, 3.25]];;
     YCost=[[5], [2, 4.5, 4.5],     [2, 2.5, 6.25], [2, 2.5, 6.25], [2, 4.75, 7.38], [2, 4.75, 7.67]];;

     cn=[[13], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0]];
     tata=[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
     pcn=[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; 
    }
}
 
function dij()
{
 pune_valori();  
 tata[start]=0;
 for (i=1; i<=G[0][0]; i++)
    {M[i]=0; dmin[i]=inf;} 
 culoare=2;   
 for (i=1, nrmuchie=0; i<=G[start][0]; i++)
     {
      dmin[G[start][i]]=C[start][i]; tata[G[start][i]]=start;
      muchii[++nrmuchie]=Pm[start][i];
      //console.log(cn[muchii[nrmuchie]][0]);
      v1[nrmuchie]=start;
      v2[nrmuchie]=i;
      //muchie(start, i);
      cn[muchii[nrmuchie]][++cn[muchii[nrmuchie]][0]]=culoare;
     }
 M[start]=1; dmin[start]=0;
 for (i=1; i<G[0][0]; i++)
    {
     minim=inf;
     for (j=1; j<=G[0][0]; j++)  
        if (!M[j] && dmin[j] < minim) 
           {
            varf=j;
            minim=dmin[j];
           }
    if (minim==inf) break;
    M[varf]=1;
    culoare=1;
    for (j=1; j<=G[tata[varf]][0]; j++) if (G[tata[varf]][j]==varf) break; 
    //setTimeout(() => {muchie(tata[varf], j);}, 2000);
    //muchie(tata[varf], j);
    muchii[++nrmuchie]=Pm[tata[varf]][j];
    v1[nrmuchie]=tata[varf];
    v2[nrmuchie]=j;
    cn[muchii[nrmuchie]][++cn[muchii[nrmuchie]][0]]=culoare;    
     for (j=1; j<=G[varf][0]; j++)
         if (!M[G[varf][j]] && dmin[G[varf][j]] > C[varf][j] + minim)
            {
               culoare=2;
               muchii[++nrmuchie]=Pm[varf][j];
               v1[nrmuchie]=varf;
               v2[nrmuchie]=j;    
               cn[muchii[nrmuchie]][++cn[muchii[nrmuchie]][0]]=culoare;  
             if (dmin[G[varf][j]]!=inf) 
                {
                 culoare=0;
                 for (k=1; k<=G[tata[G[varf][j]]][0]; k++)
                      if (G[tata[G[varf][j]]][k]==G[varf][j]) break;  
                      //setTimeout(() => {muchie(tata[G[varf][j]], k);}, 2000);
                      //muchie(tata[G[varf][j]], k);
                      muchii[++nrmuchie]=Pm[tata[G[varf][j]]][k];
                      v1[nrmuchie]=tata[G[varf][j]];
                      v2[nrmuchie]=k;
                      cn[muchii[nrmuchie]][++cn[muchii[nrmuchie]][0]]=culoare;
                }
             dmin[G[varf][j]] = minim + C[varf][j];
             tata[G[varf][j]] = varf;
             //setTimeout(() => {muchie(varf, j);}, 2000);
             //muchie(varf, j);
            }
    }
}
 
function muchie(x1, x2)
{
    canvas_arrow(X1[x1][x2]*hp, Y1[x1][x2]*hp, X2[x1][x2]*hp, Y2[x1][x2]*hp);
    dreptunghiCost(C[x1][x2], XCost[x1][x2]*hp, YCost[x1][x2]*hp);
    requestAnimationFrame(muchie(x1, x2));
}
 
 
function muchie3()
{
 /*if ((stoop || muchie_actuala > nrmuchie) && !ruel) 
    {
     grafAsociat();
     return;
    }*/
 if (stoop) {grafAsociat(); return;}
 if (ruel)
    {muchie_actuala++; pcn[muchii[muchie_actuala]]++;}
 can();
 requestAnimationFrame(can);
 if (ruel) setTimeout(muchie3, 1337);
}
 
function can()
{
   var i;
   if (stoop) 
    {ruel=0;
     grafAsociat();  
     return;
    }
   if (muchie_actuala > nrmuchie)
      {
       inceput=muchie_actuala=ruel=0;
       grafAsociat();
       return;  
      } 
   for (i=1; i<=muchie_actuala; i++)
       {
        culoare=cn[muchii[i]][pcn[muchii[i]]];
        canvas_arrow(X1[v1[i]][v2[i]]*hp, Y1[v1[i]][v2[i]]*hp, X2[v1[i]][v2[i]]*hp, Y2[v1[i]][v2[i]]*hp);
        dreptunghiCost(C[v1[i]][v2[i]], XCost[v1[i]][v2[i]]*hp, YCost[v1[i]][v2[i]]*hp);
       }
}
 
function pauza()
{
 ruel=0;
}
 
function ruleaza()
{
 ruel=1;
 if (muchie_actuala > nrmuchie)
    {
     muchie_actuala=0; return;
    }
 if (!inceput) 
    {
     dij();
     inceput=1;
     stoop=0;
    }
 muchie3();
}
 
function inainte()
{
 ruel=0;
 if (inceput)
    {
     muchie_actuala++; pcn[muchii[muchie_actuala]]++;
     /*console.log(muchii[muchie_actuala]);
     console.log(cn[muchii[muchie_actuala]][pcn[muchii[muchie_actuala]]]); */
    }
    else
    {
     inceput=1; stoop=0;   
     dij();
     muchie_actuala=1; pcn[muchii[muchie_actuala]]=1; 
     /*console.log(muchii[muchie_actuala]);
     console.log(cn[muchii[muchie_actuala]][pcn[muchii[muchie_actuala]]]); */
    }
    if (stoop || muchie_actuala > nrmuchie) 
      {
       grafAsociat();
       return;
      }
    muchie3();
}
 
function inapoi()
{
 if (muchie_actuala-1 < 0) return;  
 console.log(cn[muchii[muchie_actuala]]);
 console.log(pcn[muchii[muchie_actuala]]);
 pcn[muchii[muchie_actuala]]--; muchie_actuala--; 
 ruel=0;
 grafAsociat2();
 muchie3();
}
 
function stop()
{
 stoop=1;
 grafAsociat();  
}
 
document.addEventListener('DOMContentLoaded', function () {
   //ctx1.width  = window.innerWidth;
   //ctx1.height = window.innerHeight;
   ctx1.setTransform(2, 0, 0, 1, 0, 0);
   patrate();
   requestAnimationFrame(patrate);
 }, false); 

