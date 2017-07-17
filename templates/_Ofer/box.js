
function main()
{  
  // more object-oriented
  // var txt   =document.getElementById('textField').value;
  var d = document.getElementById('sizeD').value;
  var w = document.getElementById('sizeW').value;
  var h = document.getElementById('sizeH').value;
  var t = Number(document.getElementById('sizeT').value); // thickness
  // document.getElementById('debugtxt').innerHTML = "t= " + t
// make lid
  var lidright = new CSG.Path2D([[0,t],[0.1*w,t],[0.1*w,0],[0,0],[0,-2*t],[0.25*w-t,-2*t]]);
  var arc = new CSG.Path2D.arc({center:[0.25*w-t,-t], radius: t, startangle: 270, endangle: 360});
  lidright = lidright.concat(arc);
  lidright = lidright.concat(new CSG.Path2D([[0.25*w,-t],[0.25*w,0],[0.5*w,0],[0.5*w,d-5*t],[0.5*w-t,d-5*t],[0.5*w-t,d-2*t],[0.5*w,d-2*t],[0.5*w,d-t],[0.5*w-t,d-t],[0.5*w-t,d],[0,d]]));
  lidright = lidright.close();  
  var lidleft = lidright.mirroredX();
  lidright = lidright.innerToCAG();
  lidleft = lidleft.innerToCAG();
  var lid = lidleft.union(lidright);
  lid = lid.translate(lid.getBounds()[0].negated());


// make bottom
  var bottomQ = new CSG.Path2D([[0,-0.5*d+t],[-w/6,-0.5*d+t],[-w/6,-0.5*d],[-w/3,-0.5*d],[-w/3,-0.5*d+t],[-w/2+t,-d/2+t],[-w/2+t,-d/3],[-w/2,-d/3],[-w/2,-d/6],[-w/2+t,-d/6],[-w/2+t,0],[0,0]]);
  bottomQ = bottomQ.close();
  bottomQ = bottomQ.innerToCAG();
  bottomH = bottomQ.union(bottomQ.mirroredX());
  bottom = bottomH.union(bottomH.mirroredY());
  document.getElementById('debugtxt').innerHTML = "bounds = " + lid.getBounds()
  bottom = bottom.translate(bottom.getBounds()[0].negated());
// make front
  var frontright = new CSG.Path2D([[0,0],[w/6,0],[w/6,t],[w/3,t],[w/3,0],[w/2-t,0],[w/2-t,h/3],[w/2,h/3],[w/2,h*2/3],[w/2-t,h*2/3],[w/2-t,h],[w/10,h],[w/10,1.0*h+2*t]]);
  var arc = new CSG.Path2D.arc({center:[w/10-t,1.0*h+2*t], radius: t, startangle: 0, endangle: 90});
  frontright = frontright.concat(arc);
  frontright = frontright.concat(new CSG.Path2D([[w/10-t,1.0*h+(3*t)],[0,1.0*h+(3*t)],[0,1.0*h+(2*t)],[t/2,1.0*h+(2*t)],[t/2,1.0*h+t],[0,1.0*h+t]]));
  frontright = frontright.close();
  frontright = frontright.innerToCAG();
  front = frontright.union(frontright.mirroredX());
  front = front.translate(front.getBounds()[0].negated());

// make sides
  var sideleft = new CSG.Path2D([[0,0],[d/6,0],[d/6,t],[d/3,t],[d/3,0],[d/2,0],[d/2,h/3],[d/2-t,h/3],[d/2-t,h*2/3],[d/2,h*2/3],[d/2,h],[-d*3/10,h],[-d*3/10,1.0*h+2*t]]);
  var arc = new CSG.Path2D.arc({center:[-d*3/10-t,1.0*h+2*t], radius: t, startangle: 0, endangle: 90});
  sideleft = sideleft.concat(arc);
  sideleft = sideleft.concat(new CSG.Path2D([[-d*3/10-t,1.0*h+(3*t)],[-d/2+t,1.0*h+(3*t)]]));
  arc = new CSG.Path2D.arc({center:[-d/2+t,1.0*h+2*t], radius: t, startangle: 90, endangle: 180});
  sideleft = sideleft.concat(arc);
  sideleft = sideleft.concat(new CSG.Path2D([[-d/2,1.0*h+(2*t)],[-d/2,h*2/3],[-d/2+t,h*2/3],[-d/2+t,h/3],[-d/2,h/3],[-d/2,0],[-d/3,0],[-d/3,t],[-d/6,t],[-d/6,0],[0,0]]));
  sideleft = sideleft.close();
  sideleft = sideleft.innerToCAG();
  var hole = new CAG.circle({center: [-d*5/12,1*h+t], radius: 1.41*t/2});
  // hole = hole.flipped();
  sideleft = sideleft.subtract(hole);
  sideright = sideleft.mirroredY();
  sideleft = sideleft.translate(sideleft.getBounds()[0].negated());
  sideright = sideright.translate(sideright.getBounds()[0].negated());

// make rear
  var rearH = new CSG.Path2D([[0,0],[w/6,0],[w/6,t],[w/3,t],[w/3,0],[w/2-t,0],[w/2-t,h/3],[w/2,h/3],[w/2,h*2/3],[w/2-t,h*2/3],[w/2-t,h],[0,h],[0,0]]);
  rearH = rearH.close();
  rearH = rearH.innerToCAG();
  rear = rearH.union(rearH.mirroredX());
  rear = rear.translate(rear.getBounds()[0].negated());
   

  var line1 = bottom;
  line1 = line1.union(lid.translate([line1.getBounds()[1].x + t, 0]));
  line1 = line1.union(rear.translate([line1.getBounds()[1].x + t, 0]));
  var line2 = front;
  line2 = line2.union(sideright.translate([line2.getBounds()[1].x + t,0]));
  line2 = line2.union(sideleft.translate([line2.getBounds()[1].x + t, 0]));
  result = line1.union(line2.translate([0,line1.getBounds()[1].y + t]));
  // document.getElementById('debugtxt').innerHTML+="the volume is: "+(sizeX*sizeY*sizeZ).toString();

  return [ { name: "TheBestCubeEver", caption: "The Best Cube Ever", data: result } ];
}







 //  var txt		=document.getElementById('textField').value;
//   var FontSize 		=Number(document.getElementById('FontSize').value);
//   var TextThickness 	=Number(document.getElementById('TextThickness').value);
//   var TextNarrowing 	=Number(document.getElementById('Fnarrowing').value)*0.01;
//   var TextItalic 	=Number(document.getElementById('Fitalic').value)*0.01; 
  //var BGThickness 	=Number(document.getElementById('BGThickness').value);
  //var SelectP 		=document.getElementById('SelectP').value;
  //var PatternSize 	=Number(document.getElementById('PatternSize').value);
  //var PatternThickness 	=Number(document.getElementById('PatternThickness').value);
  //var LeftMargin 	=Number(document.getElementById('LeftMargin').value);
  //var RightMargin 	=Number(document.getElementById('RightMargin').value);
  //var TopBottomMargin 	=Number(document.getElementById('TopBottomMargin').value);
  //var FrameThickness 	=Number(document.getElementById('FrameThickness').value);
//   var FrameWidth 	=Number(document.getElementById('FrameWidth').value);
//   var Fillet		=Number(document.getElementById('Fillet').value);




// var numOfBars = 2; // 1,2,3




//   document.getElementById('debugtxt').innerHTML="hello!!!\n" ;
// 
// var barRatio = 0.2; // slider 0-1
// var barThickness = 2; // don't think the user should control that.
// var barDistance = 0.5; // slider 0-1
// 
// 
// //   if (FrameWidth<0) {FrameWidth=0;}
// //   if (LeftMargin<0) {LeftMargin=0;}
// //   if (RightMargin<0) {RightMargin=0;}
// //   if (TopBottomMargin<0) {TopBottomMargin=0;}
// //   if (PatternSize<0) {PatternSize=0;}
// //   if ((PatternThickness<0)||(PatternThickness>PatternSize)) {PatternThickness=0;}
// 
//   var result = new CSG();
//  
// //   //creating text  
// //   var T = txtCAG(txt,FontSize,TextNarrowing ,TextItalic);
// //   T=T.extrude({offset: [0,0,-TextThickness]});
// //  
// //   
// //   //centering text
// //   T=T.translate([-(T.getBounds()[1].x + T.getBounds()[0].x)/2 ,0,0]).setColor(1, 0.925, 0.7); 
// //   //mirroring
// //   T=T.mirroredX();
// var T = new CSG.cube({ center: [0,0,-1], radius: [50,20,1]});
//   //holder bars and handles
//   var X = T.getBounds()[1].x;
//   var Y = T.getBounds()[1].y;
//   var XY = new CSG.plane([0,0,1],[0,0,barThickness/2-1]);
//   var XZ = new CSG.plane([0,1,0],0);
//   var YZ = new CSG.plane([1,0,0],0);
// 
//   var barWidth = barRatio*Y;  
//   var bars = new CSG.cube({ center : [0, barDistance*(Y-barWidth/2), barThickness/2-1],
//   					radius : [2*X, barWidth, barThickness/2] });
//   bars = bars.union(CSG.cube({ center : [0, -barDistance*(Y-barWidth/2), barThickness/2-1],
//   					radius : [2*X, barWidth, barThickness/2] });
//   var holder = new CSG.cylinder({ start: [X/2, barDistance*(Y-barWidth/2), 0],
//        end: [0, 0, Y], radius: barThickness/2, resolution: 16 });
//   holder = holder.union(holder.mirroredX());
//   holder = holder.union(holder.mirroredY());
// 
// //   holder1 = holder1.union(CSG.cylinder({ start: [X/3, -barDistance*(Y-barWidth/2), barThickness/2-1],
// //        end: [X/3, 0, Y], radius: 1, resolution: 4 }).cutByPlane(XZ.flipped());
// //   holder1 = holder1.cutByPlane(XY.flipped());
// //   var holder2 = new CSG.cylinder({ start: [X/3, barDistance*(Y-barWidth/2), 0],
// //        end: [X/3, 0, Y], radius: 1, resolution: 4 }).cutByPlane(XZ);
// 	result = T;
// 	result = result.union(bars);
//   	result = result.union(holder);
// 
// 
//   return [
//     { name: "TextStamp", caption: "Text Stamp", data: result } 
//    	];
// }
// 
// 
// 
