window.onload = function(){
	var izmersY=window.innerHeight;
	var izmersX=window.innerWidth;
	var teksts;
	var kurs=0;
	console.log(izmersY);
	if (izmersY < 1050)
	{
		izmersY=1050;
	}
	console.log(izmersY);
	////////////////////
	////Ekrāna Izmēri///
	////////////////////
    init(izmersX, izmersY);
	const tekstastils = new PIXI.TextStyle({
    fill: "white"
});
	// Mainigais kas glaba kartes bildi
    var karte=  image2(izmersX/2-375, 100, 'img/karte.jpg', 0.3, 0.3);
    var krasa= COLOR_RED;
    //Noklusejuma taisnstura izmers
    var defsize=32;
    //Offsets pabīda visus taisnstūras pa koordinātām
    var offsetsX=izmersX/2-375-100;
    var offsetsY=0;
    // Glabā kļūdu skaitu
    var kludas=0;
    // Sakuma pilns ar false
    var vaiir= [];
	var cikpilsetas = 14; 
	// Glabā vizuālos tekstus    
	var kludasteksts=text(izmersX/2-375, 10, "Kļūdas: 0", tekstastils);
	var ciknocik=text(izmersX/2-375, 45, "Atminēti: 0/14", tekstastils);
	var cikatmineti=0;
	for (var i = 0; i < cikpilsetas; i++) {
  	vaiir.push(false);
	}
    var pilsetas = [
    	"Brazilja",
    	"Lapasa",
    	"Bogota",
    	"Karakasa",
    	"Džordžtauna",
    	"Paramaribo",
    	"Kajenne",
    	"Asunsjona",
    	"Montevideo",
    	"Buenosairesa",
    	"Santjāgo",
    	"Kito",
    	"Lima",
    	"Stenleja"
    ];
	var aizsegs = [
		rectangle(625 + offsetsX, 455 + offsetsY, defsize+10, defsize+10, krasa), //Brazilija
		rectangle(390 + offsetsX, 460 + offsetsY, defsize, defsize, krasa), //La Paz
		rectangle(321 + offsetsX, 198 + offsetsY, defsize+5, defsize-10, krasa), //Bogota
		rectangle(403 + offsetsX, 131 + offsetsY, defsize+12, defsize-7, krasa), //Caracas
		rectangle(527 + offsetsX, 179 + offsetsY, defsize+19, defsize-19, krasa), //GeorgeTown
		rectangle(561 + offsetsX, 194 + offsetsY, defsize+15, defsize-21, krasa), //Paramaribo
		rectangle(599 + offsetsX, 208 + offsetsY, defsize+15, defsize-21, krasa), // Cayenne
		rectangle(530 + offsetsX, 573 + offsetsY, defsize+15, defsize-21, krasa), // Asuncion
		rectangle(554 + offsetsX, 685 + offsetsY, defsize+15, defsize-7, krasa), // Montevideo
		rectangle(499 + offsetsX, 700 + offsetsY, defsize+20, defsize-21, krasa),// Buenos Aires
		rectangle(350 + offsetsX, 683 + offsetsY, defsize+20, defsize-20, krasa), // Santiago
		rectangle(258 + offsetsX, 262 + offsetsY, defsize+20, defsize-17, krasa), // Quito
		rectangle(270+ offsetsX, 420 + offsetsY, defsize+20, defsize-21, krasa), // Lima
		rectangle(526+ offsetsX, 904 + offsetsY, defsize+20, defsize-21, krasa) // Port Stanley
		
	];
	var clicki =[];
	//Pārbauda kurš ir uzspiests
	function checks(kursClick)
	{
		//console.log(kursClick);
		if (kursClick==kurs)
		{
			vaiir[kurs]=true;
			cikatmineti++;
			remove(ciknocik);
			ciknocik=text(izmersX/2-375, 45, "Atminēti: "+ cikatmineti +"/14", tekstastils);
			remove(aizsegs[kurs]);
			if (cikatmineti<14)
			{
				gameCore();
			}
			else
			{
				victory();
			}
		}
		else
		{
			kludas+=1;
			remove(kludasteksts);
			kludasteksts=text(izmersX/2-375, 10, "Kļūdas: "+ kludas, tekstastils);
		}
	}

	//Spēles kodolfunkcija
		function gameCore()
	{
		if (cikatmineti!=14)
		{
		if (teksts)
			{
				remove(teksts);
			}
		kurs=Math.floor(Math.random() * 14);
		while (vaiir[kurs])
		{
			kurs=Math.floor(Math.random() * 14);
		}
		//console noziimee atkļūdošana
		console.log("Ir");
		var ieliekamaisteksts="Kur atrodas: " + pilsetas[kurs];
		teksts= text(izmersX/2, 10, ieliekamaisteksts, tekstastils);
		move(teksts, izmersX/2-teksts.width/2, 10);
		console.log(teksts.width);
		}
	}
	function victory(){
		remove (karte);
		remove (kludasteksts);
		if (teksts)
			{
				remove (teksts);
			}
		remove (ciknocik);
		var uzvartekstins="Apsveicam, jūs uzminējāt 14 Dienvidamerikas valstis ar: " + kludas + " kļūdām";
		var uzvarteksts= text(izmersX/2, izmersY/2, uzvartekstins , tekstastils);
		move(uzvarteksts, izmersX/2-uzvarteksts.width/2, izmersY/2-uzvarteksts.height/2);
	}

	//victory();
//Izvada consolē kursora kordinātas, kad nospiež W
   function getPosMouse()
   {
   		var mousePosition = renderer.plugins.interaction.mouse.global;
   		console.log(mousePosition);
   }
    onKeyDown(KEY_UP, function(){
        getPosMouse();
    });
    //Funkcija, kas izpildās noteiktas reizes sekundē
    animate(function(){

    });

  
    gameCore();
 	/*for (var i=0;i<cikpilsetas;i++)
	{
		onClick(aizsegs[i], function(){
			checks(i);
		});
	}*/
	onClick(aizsegs[0], function(){
			checks(0);
		});
	onClick(aizsegs[1], function(){
			checks(1);
		});
	onClick(aizsegs[2], function(){
			checks(2);
		});
	onClick(aizsegs[3], function(){
			checks(3);
		});
	onClick(aizsegs[4], function(){
			checks(4);
		});
	onClick(aizsegs[5], function(){
			checks(5);
		});
	onClick(aizsegs[6], function(){
			checks(6);
		});
	onClick(aizsegs[7], function(){
			checks(7);
		});
	onClick(aizsegs[8], function(){
			checks(8);
		});
	onClick(aizsegs[9], function(){
			checks(9);
		});
	onClick(aizsegs[10], function(){
			checks(10);
		});
	onClick(aizsegs[11], function(){
			checks(11);
		});
	onClick(aizsegs[12], function(){
			checks(12);
		});
	onClick(aizsegs[13], function(){
			checks(13);
		});
};
