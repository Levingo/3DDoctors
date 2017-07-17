FontTable = [
{font: 'Arial', 		file: 'arial.js' ,		lang: ['Latin','Hebrew','Arabic'] },
{font: 'A Nefel Botan', 	file: 'A_Nefel_Botan.js' , 	lang: ['Arabic'] },
{font: 'Aharoni', 		file: 'Aharoni.js' , 		lang: ['Hebrew'] },
{font: 'Alef', 			file: 'Alef.js' , 		lang: ['Latin','Hebrew'] },
{font: 'Aller Bold', 		file: 'Aller_Bold.js' , 	lang: ['Latin'] },
{font: 'Aller Display', 	file: 'Aller_Display.js' , 	lang: ['Latin'] },
{font: 'Arab Type', 		file: 'Arab_Type.js' , 		lang: ['Arabic'] },
{font: 'Calibri', 		file: 'calibri.js' , 		lang: ['Latin'] },
{font: 'Comic Sans MS', 	file: 'Comic.js' , 		lang: ['Latin'] },
{font: 'Courrier bold', 	file: 'Courrier_bold.js' , 	lang: ['Latin','Hebrew','Arabic']},
{font: 'David Bold', 		file: 'David_Bold.js' , 	lang: ['Hebrew'] },
{font: 'Euro Caps', 		file: 'Euro_Caps.js' , 		lang: ['Latin'] },
{font: 'Frankruhl', 		file: 'Frankruhl.js' , 		lang: ['Hebrew'] },
{font: 'Georgia', 		file: 'georgia.js' , 		lang: ['Latin'] },
{font: 'HVD Comic Serif Pro', 	file: 'HVD_Comic_Serif_Pro.js' ,lang: ['Latin'] },
{font: 'Jack Input', 		file: 'JackInput.js' , 		lang: ['Latin'] },
{font: 'Komika Axis', 		file: 'Komika_Axis.js' , 	lang: ['Latin'] },
{font: 'LMRomanDemi10', 	file: 'LMRomanDemi10-Regular.js' , lang: ['Latin'] },
{font: 'Narkisim', 		file: 'narkisim.js' , 		lang: ['Hebrew'] },
{font: 'Old Sans Black', 	file: 'OldSansBlack.js' , 	lang: ['Latin'] },
{font: 'Boston Traffic', 	file: 'Boston_Traffic.js' , 	lang: ['Latin'] },
{font: 'Know Your Product', 	file: 'Know_Your_Product.js' , 	lang: ['Latin'] },


];

var isRTL = false; //is Right To Left

function UpdateLangList(SelectID) {
	document.getElementById(SelectID).options[0]= new Option('Latin', 'Latin', true, true);
	document.getElementById(SelectID).options[1]= new Option('Arabic', 'Arabic', false, false);
	document.getElementById(SelectID).options[2]= new Option('Hebrew', 'Hebrew', false, false);
}


function UpdateFontList(SelectID, lang) {
	if ((lang=='Hebrew')||(lang=='Arabic')) {isRTL=true;} else {isRTL=false;}

	document.getElementById(SelectID).length=0;
        var hasthelang;
        var cou=0;
        var j=0;
        for(var i=0;i<FontTable.length;i++) {
		hasthelang=false;
                for(j=0;j<FontTable[i].lang.length;j++) { if (FontTable[i].lang[j]==lang) {hasthelang=true;}}
		if (hasthelang==true) {
			document.getElementById(SelectID).options[cou]= new Option(FontTable[i].font, FontTable[i].file, i==0, i==0);
			cou++;
		}
	}
	return 0;
}


function addFont(jsFile) {
       	var js = document.createElement("script");
	js.type = "text/javascript";
	js.src = "../../openJScad/fonts/"+jsFile;
	document.body.appendChild(js);
}

function includeFont(jsFile) {
    $('head').append($('<script>').attr('type', 'text/javascript').attr('src', "../../openJScad/fonts/"+jsFile));
}

function LoadFontFile(filename){
  var fileref=document.createElement('script');
  fileref.setAttribute("type","text/javascript");
  fileref.setAttribute("src", "../../openJScad/fonts/"+filename);
  document.getElementsByTagName("head")[0].appendChild(fileref);
}


function TextCSG(txt, size, height) {

  var mul = size/Char.UPM;
  var T = new CSG();
  var A = new CAG();
  var i = 0; 
  var prevous =0; /// the ascii
  if (isRTL==true) {sign=-1;}

  var curx = 0;
  var fn = " ";
  for(var iii=0;iii<txt.length;iii++) {
	if (isRTL==true) {i=txt.length-iii-1;} else {i=iii;}  
        if(Char.hasOwnProperty("u"+txt.charCodeAt(i)) == true) {
          
          fn = "Char.u"+txt.charCodeAt(i)+"()";
          A=eval(fn);
          if((Char.hasOwnProperty("u"+txt.charCodeAt(i)+"kern") == true)&&(prevous!=0)) { 
                fn="Char.u"+txt.charCodeAt(i)+"kern";
                if (eval(fn).hasOwnProperty(prevous) == true) {
			curx-=mul*eval(fn)[prevous];
		}
	  }
          A=A.scale(mul).translate([curx,0,0]);
  	  if(Char.hasOwnProperty("u"+txt.charCodeAt(i)+"width") == false) {alert('no width');}
	  curx+=mul*eval("Char.u"+txt.charCodeAt(i)+"width");
    

          T=T.union(A.extrude({offset: [0, 0, height]}));
	  prevous=txt.charCodeAt(i);
        }
	
  }
  return T;
}  

function TextMiddleY(size) {
  return (Char.Ascent+Char.Descent)/2*size/(Char.Ascent-Char.Descent);
}