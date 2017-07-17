var ExamplesLinks=[
  'file:///C:/Users/ofer/Google%20Drive/Jonathan-Ofer/3ddoctors/Website/templates/connectors/angle_bracket2.html?thick=3&width=40&rad=4&Alen=30&Blen=20&AholeD=3&BholeD=3&Aholeh=24&Bholeh=16&Aholed=20&Bholed=30&AholeN=2&BholeN=2&withribs=true&ribsequal=true&ribThick=2&ribN=2&ribsize=70'
  ,
  'file:///C:/Users/ofer/Google%20Drive/Jonathan-Ofer/3ddoctors/Website/templates/connectors/angle_bracket2.html?thick=4&width=40&rad=0&Alen=30&Blen=20&AholeD=3&BholeD=8&Aholeh=18&Bholeh=12&Aholed=20&Bholed=30&AholeN=2&BholeN=1&withribs=true&ribsequal=false&ribThick=2&ribN=2&ribsize=100'
  ,
  'file:///C:/Users/ofer/Google%20Drive/Jonathan-Ofer/3ddoctors/Website/templates/connectors/angle_bracket2.html?thick=3&width=60&rad=5&Alen=30&Blen=20&AholeD=3&BholeD=3&Aholeh=26&Bholeh=16&Aholed=30&Bholed=10&AholeN=2&BholeN=6&withribs=true&ribsequal=false&ribThick=2&ribN=7&ribsize=80'
  ,
  'file:///C:/Users/ofer/Google%20Drive/Jonathan-Ofer/3ddoctors/Website/templates/connectors/angle_bracket2.html?thick=3&width=8&rad=4&Alen=30&Blen=30&AholeD=3&BholeD=3&Aholeh=26&Bholeh=26&Aholed=20&Bholed=30&AholeN=1&BholeN=1&withribs=true&ribsequal=true&ribThick=8&ribN=1&ribsize=80'
  ]


  
function main()
{  
  var thick = Number(document.getElementById('thick').value);
  var width = Number(document.getElementById('width').value);
  var Alen = Number(document.getElementById('Alen').value);
  var Blen = Number(document.getElementById('Blen').value);
  var AholeD = Number(document.getElementById('AholeD').value);
  var BholeD = Number(document.getElementById('BholeD').value);
  var Aholeh = Number(document.getElementById('Aholeh').value);
  var Bholeh = Number(document.getElementById('Bholeh').value);
  var AholeN = Number(document.getElementById('AholeN').value);
  var BholeN = Number(document.getElementById('BholeN').value);
  var Aholed = Number(document.getElementById('Aholed').value) * (AholeN-1);
  var Bholed = Number(document.getElementById('Bholed').value) * (BholeN-1);

  var withribs = document.getElementById('withribs').checked;
  var ribsequal = document.getElementById('ribsequal').checked;
  var ribsize = 0.01*Number(document.getElementById('ribsize').value);
  
  var ribN=Number(document.getElementById('ribN').value);
  var ribThick=Number(document.getElementById('ribThick').value);
  
  var rad=Number(document.getElementById('rad').value);
 
  
  
  return [
    
     { name: "Angle_Bracket", caption: "Angle Bracket", data: result } 
   	];
}

