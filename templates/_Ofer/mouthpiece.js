function main()
{
	var Rout 	=Number(document.getElementById('rOut').value)/2;
	var Rin 	=Number(document.getElementById('rIn').value)/2;
	var t 	=Number(document.getElementById('T').value);
	var w 	=Number(document.getElementById('W').value);
	var bottom 	=Number(document.getElementById('Bottom').value);
	var h 	=Number(document.getElementById('H').value);
	var b 	=Number(document.getElementById('B').value);
	var L 	=Number(document.getElementById('L').value);
	var L2 	=Number(document.getElementById('L2').value);
	var L3 	=Number(document.getElementById('L3').value);
	var Ax 	=Number(document.getElementById('A').value);
		

	var Hexten 	=Number(document.getElementById('Hexten').value);
	var Hcon 	=Number(document.getElementById('Hcon').value);
	var Cin 	=Number(document.getElementById('Cin').value)/2;
	var Cout 	=Number(document.getElementById('Cout').value)/2;
	
	var Mir		=document.getElementById('Mir').checked;
	
	var Ay=h/2+t;
	var Bx=Ax+L2;
	var By=Ay-t-b/2;
	var Cx=Bx+L;
	var Cy=Ay;
	var Dx=Cx+L3;
	var Dy=Cy;
	var Ex=Dx;
	var Ey=Dy-2*t-b;
	var Fx=Cx;
	var Fy=-Cy;
	var Gx=Rout;
	var Gy=Ay-t;
	
	var Floor=new CAG.circle({center: [0, 0], radius: Rout, resolution: 60});
	Floor=Floor.union(CAG.rectangle({corner1: [0, Ay], corner2: [Ex, Fy]}));
	Floor=Floor.subtract(CAG.fromPoints([[Fx,Fy], [Ex,Fy], [Ex,Ey]]));
	
	var sub1=new CAG.fromPoints([[0,Gy], [Gx,Gy], [Bx,By], [Ax,Ay], [Cx,Cy], [Cx,Gy], [Dx,Gy], [Dx,Gy-b], [Cx,Gy-b], [Fx,Fy+2*t], [Fx-2,Fy+t], [0,-Gy]]);
	var sub2=new CAG.circle({center: [0, 0], radius: Rin, resolution: 60});
	
	Floor=Floor.extrude({offset: [0,0,bottom*2+w]});
	sub1=sub1.extrude({offset: [0,0,w]}).translate([0,0,bottom]);
	sub2=sub2.extrude({offset: [0,0,w+bottom]}).translate([0,0,bottom]);
	Floor=Floor.subtract(sub1);
	Floor=Floor.union(new CAG.fromPoints([[0,0], [(h-b-0.5)/2,0], [0,(h-b-0.5)/2]]).extrude({offset: [0,0,Cx]}).rotateY(90).translate([0,-h/2,bottom+w]));
	Floor=Floor.subtract(sub2);
	
	var Exten=new CAG.circle({center: [0, 0], radius: Rout, resolution: 60}).subtract(new CAG.circle({center: [0, 0], radius: Rin, resolution: 60}));
	var Con=  new CAG.circle({center: [0, 0], radius: Cout, resolution: 60}).subtract(new CAG.circle({center: [0, 0], radius: Cin, resolution: 60}));
	
	Exten=Exten.extrude({offset: [0,0,Hexten]});
	Con=Con.extrude({offset: [0,0,Hcon]}).translate([0,0,Hexten]);
	CON=Exten.union(Con);
	Floor=Floor.union(CON.translate([0,0,bottom*2+w]));
	
	if (Mir==true) Floor=Floor.mirroredY();
    return [
    { name: "Mouthpiece", caption: "Mouthpiece", data: Floor},
    { name: "Connector", caption: "Connector", data: CON}
    ];
}

function threadZ(Cag, resolution,pitch, degrees)
	{
		
		var DegStep=360/resolution;
		var DegStepR=2*Math.PI/resolution;
	    var lines = [];
	    Cag.sides.map(function(side) {lines.push([side.vertex0.pos.x,side.vertex0.pos.y,side.vertex1.pos.x,side.vertex1.pos.y]);});
	    var cx=0;
	    var cy=0;
	    var Zstep=pitch/resolution;
		var CurZ=0;
	    var polygons = [];
	    var DegR=0;
	    
	     //beginning
	    var vert = [];
	    for(var i=0;i<lines.length;i++) {
	       vert.push(new CSG.Vertex(new CSG.Vector3D(lines[i][0],0,lines[i][1])));
			}
		var poly2 = new CSG.Polygon(vert);
		polygons.push(poly2);
		
		//going up
	    for(var Deg=0;Deg<degrees;Deg+=DegStep)
			{
				DegR=Deg*Math.PI/180;
				for(var i=0;i<lines.length;i++) {
					var poly = new CSG.Polygon([
					new CSG.Vertex(new CSG.Vector3D(lines[i][0]*Math.cos(DegR+DegStepR),lines[i][0]*Math.sin(DegR+DegStepR),lines[i][1]+CurZ+Zstep)),
					new CSG.Vertex(new CSG.Vector3D(lines[i][2]*Math.cos(DegR+DegStepR),lines[i][2]*Math.sin(DegR+DegStepR),lines[i][3]+CurZ+Zstep)),
                    new CSG.Vertex(new CSG.Vector3D(lines[i][2]*Math.cos(DegR),lines[i][2]*Math.sin(DegR),lines[i][3]+CurZ)),
                    //new CSG.Vertex(new CSG.Vector3D(lines[i][0]*Math.cos(DegR),lines[i][0]*Math.sin(DegR),lines[i][1]+CurZ))
                    
                    ]);                
					polygons.push(poly);	
					
					var poly = new CSG.Polygon([
					new CSG.Vertex(new CSG.Vector3D(lines[i][0]*Math.cos(DegR+DegStepR),lines[i][0]*Math.sin(DegR+DegStepR),lines[i][1]+CurZ+Zstep)),
					//new CSG.Vertex(new CSG.Vector3D(lines[i][2]*Math.cos(DegR+DegStepR),lines[i][2]*Math.sin(DegR+DegStepR),lines[i][3]+CurZ+Zstep)),
                    new CSG.Vertex(new CSG.Vector3D(lines[i][2]*Math.cos(DegR),lines[i][2]*Math.sin(DegR),lines[i][3]+CurZ)),
                    new CSG.Vertex(new CSG.Vector3D(lines[i][0]*Math.cos(DegR),lines[i][0]*Math.sin(DegR),lines[i][1]+CurZ))
                    
                    ]);                
					polygons.push(poly);
								
				}
			CurZ+=Zstep;		
		}    
	
		//end
		var vert = [];
	    for(var i=lines.length-1;i>=0;i--) {
	       vert.push(new CSG.Vertex(new CSG.Vector3D(lines[i][0]*Math.cos(DegR+DegStepR),lines[i][0]*Math.sin(DegR+DegStepR),lines[i][1]+CurZ)));
				}
		var poly2 = new CSG.Polygon(vert);
		polygons.push(poly2);
		
		
	    return new CSG.fromPolygons(polygons).canonicalized();
}

function revolveZ(Cag, resolution)
	{
		var DegStep=360/resolution;
		var DegStepR=2*Math.PI/resolution;
	    var lines = [];
	    Cag.sides.map(function(side) {lines.push([side.vertex0.pos.x,side.vertex0.pos.y,side.vertex1.pos.x,side.vertex1.pos.y]);});
	    
	    var polygons = [];
	    var DegR=0;
	    for(var Deg=0;Deg<360;Deg+=DegStep)
			{
				DegR=Deg*Math.PI/180;
				for(var i=0;i<lines.length;i++) {
		          if ((lines[i][0]!=0)&&(lines[i][2]!=0)) {
					var poly = new CSG.Polygon([
					new CSG.Vertex(new CSG.Vector3D(lines[i][0]*Math.cos(DegR+DegStepR),lines[i][0]*Math.sin(DegR+DegStepR),lines[i][1])),
					new CSG.Vertex(new CSG.Vector3D(lines[i][2]*Math.cos(DegR+DegStepR),lines[i][2]*Math.sin(DegR+DegStepR),lines[i][3])),
                    new CSG.Vertex(new CSG.Vector3D(lines[i][2]*Math.cos(DegR),lines[i][2]*Math.sin(DegR),lines[i][3])),
                    new CSG.Vertex(new CSG.Vector3D(lines[i][0]*Math.cos(DegR),lines[i][0]*Math.sin(DegR),lines[i][1]))
                    
                    ]);                
					polygons.push(poly);				
				  }		
				  else if (lines[i][2]!=0) {
					var poly = new CSG.Polygon([
					//new CSG.Vertex(new CSG.Vector3D(lines[i][0]*Math.cos(DegR+DegStepR),lines[i][0]*Math.sin(DegR+DegStepR),lines[i][1])),
					new CSG.Vertex(new CSG.Vector3D(lines[i][2]*Math.cos(DegR+DegStepR),lines[i][2]*Math.sin(DegR+DegStepR),lines[i][3])),
                    new CSG.Vertex(new CSG.Vector3D(lines[i][2]*Math.cos(DegR),lines[i][2]*Math.sin(DegR),lines[i][3])),
                    new CSG.Vertex(new CSG.Vector3D(lines[i][0]*Math.cos(DegR),lines[i][0]*Math.sin(DegR),lines[i][1]))
                    
                    ]);                
					polygons.push(poly);				
				  }	
				  else if (lines[i][0]!=0) {
					var poly = new CSG.Polygon([
					new CSG.Vertex(new CSG.Vector3D(lines[i][0]*Math.cos(DegR+DegStepR),lines[i][0]*Math.sin(DegR+DegStepR),lines[i][1])),
					//new CSG.Vertex(new CSG.Vector3D(lines[i][2]*Math.cos(DegR+DegStepR),lines[i][2]*Math.sin(DegR+DegStepR),lines[i][3])),
                    new CSG.Vertex(new CSG.Vector3D(lines[i][2]*Math.cos(DegR),lines[i][2]*Math.sin(DegR),lines[i][3])),
                    new CSG.Vertex(new CSG.Vector3D(lines[i][0]*Math.cos(DegR),lines[i][0]*Math.sin(DegR),lines[i][1]))
                    
                    ]);                
					polygons.push(poly);				
				  }	
		       }
		}    
	    return new CSG.fromPolygons(polygons);
}

