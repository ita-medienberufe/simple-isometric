/* 2D Spielfeld als Matrix 
	0: freie Kachel
	1: Hindernis
	2: Spielfigur
*/ 
var feld = [[0,1,0,1],
			[1,0,0,0],
			[0,0,1,0],
			[0,1,0,0]];

/* Spielfigur initialisieren */
var figurX = 1;
var figurY = 3;
feld[figurY][figurX] = 2;			
			
/* Bilddateien laden */  
var kachel = new Image();
var stein = new Image();
var figur = new Image();
kachel.src = "kachel.gif";
stein.src = "stein.gif";
figur.src = "figur.gif";

/* Canvas-Zeichenfläche deklarieren */
var offsetX = 200;
var offsetY = 100;
var canvas, context;

function init() {
  canvas = document.getElementById("spielfeld");
  context = canvas.getContext("2d");
}

function zeichneFeld() 
{
 context.clearRect(0,0,canvas.width,canvas.height);
 for (let i=0;i<feld.length;i++)
  for (let j=0;j<feld[i].length;j++) 
  {
	/* Isometrische Canvas-Koordinaten berechnen:
		x,y werden auf die Diagonalen x-y und x+y
		mit dem Seitenverhältnis 2:1 transformiert
	*/
	let x = j*kachel.width/2;
	let y = i*kachel.height;
	let isoX = x-y;
	let isoY = (x+y)/2;
	isoX += offsetX;
	isoY += offsetY;
	if (feld[i][j] == 0)	/* freie Kachel zeichnen */
	{
	  context.drawImage(kachel,isoX,isoY,kachel.width,kachel.height);
	}
	if (feld[i][j] == 1) /* Hindernis zeichnen */
	{
	  isoY -= stein.height-kachel.height;
	  context.drawImage(stein,isoX,isoY,stein.width,stein.height);
	}
	if (feld[i][j] == 2) /* Spielfigur zeichnen */
	{
	  isoY -= figur.height-kachel.height;
	  context.drawImage(figur,isoX,isoY,figur.width,figur.height);
	}
  }
} 

function moveUp() {
  if (figurY>0 && feld[figurY-1][figurX]==0)
  {
    feld[figurY][figurX] = 0;
	figurY--;
	feld[figurY][figurX] = 2;
	zeichneFeld();
  }
}