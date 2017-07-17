function main()
{  
  var Rin=14;
  var Rout=16;
  var Hbeka=Rout*0.5+Rout-Rin;
  
  var AirUpThick=1.5
  var AirFlowThick=2;
  var PercentOut=0.5;
  
  // AirFlowThick*PercentOut+AirUpThick should be the tube thickness
  
  
  var Hairup=Hbeka-AirUpThick;
  var Hcut=Hairup-AirFlowThick*PercentOut;
  var Hairdown=Hcut-AirFlowThick*(1-PercentOut);
  
  
  
  var L0=24; //round
  var L1=5;  //flat
  var Lcut=6;  // cut
  var Ltri=15;
  var L9=24;  //round
  
  var Rbeka=Rin*2;
  
  
  var LC=40;
  var RS=3;
  var Ldown=Lcut+Ltri+L9;
    
  var safe=Rout*2;
  
  var A=new CAG();
  A=CAG.rectangle({corner1: [Hairup, 0], corner2: [Rout, L1+Rbeka]});
  A=A.intersect(CAG.circle({center: [Hbeka+Rbeka,L1], radius: Rbeka+Hbeka-Hairup , resolution: 100}));
  A=A.union(CAG.rectangle({corner1: [Hairup, 0], corner2: [Hbeka, L1]}));
  
  var B=CAG.rectangle({corner1: [Hbeka,0], corner2: [Rout+1,L1]});
  B=B.union(CAG.circle({center: [Hbeka+Rbeka, L1], radius: Rbeka, resolution: 100}));
  
  
  A=A.extrude({offset: [0,0,safe]}).translate([0,0,-safe/2]).rotateX(90);
  B=B.extrude({offset: [0,0,safe]}).translate([0,0,-safe/2]).rotateX(90);
  
  C=new CAG.circle({center: [0,0], radius: Rin, resolution: 60}).extrude({offset: [0,0,L1+L0]})
  D=new CAG.circle({center: [0,0], radius: Rout, resolution: 60}).extrude({offset: [0,0,L1+L0]})
  
  E=new CAG.rectangle({corner1: [-Rout,-Rout] , corner2: [Hairdown,Rout]}).extrude({offset: [0,0,5]});
  
  A=D.subtract(C).union(A).subtract(B).union(E).intersect(D);
  F=new CAG.fromPoints([[Rin,L1+L0], [Rout,L1+L0], [RS+Rout-Rin,L1+L0+LC], [RS,L1+L0+LC]]);
  F=revolveZ(F,60);
  A=A.union(F);
  
  C2=new CAG.circle({center: [0,0], radius: Rin, resolution: 60}).extrude({offset: [0,0,-Ldown]})
  D2=new CAG.circle({center: [0,0], radius: Rout, resolution: 60}).extrude({offset: [0,0,-Ldown]})
  
  var A2 = CAG.fromPoints([[Hcut,-Lcut], [Hbeka,-Lcut-Ltri], [Rout,-Lcut-Ltri], [Rout,-Lcut-L9-L0],[Hcut,-Lcut-L9-L0]]);
  A2=A2.intersect(CAG.circle({center: [Hbeka+Rbeka,-Lcut-Ltri], radius: Rbeka+Hbeka-Hcut, resolution: 100}).union(new CAG.rectangle({corner1: [0,0] , corner2: [Rout,-Lcut-Ltri]})));
  
  var Bt = CAG.fromPoints([[Hcut,0], [Hcut,-Lcut], [Hbeka,-Lcut-Ltri], [Rout,-Lcut-Ltri], [Rout,0]]);
  var B2=CAG.rectangle({corner1: [Hbeka,0], corner2: [Rout,-Lcut-Ltri]});
  B2=B2.union(new CAG.circle({center: [Hbeka+Rbeka, -Ltri-Lcut], radius: Rbeka, resolution: 100}));
   
  A2=A2.extrude({offset: [0,0,safe]}).translate([0,0,-safe/2]).rotateX(90);
  B2=B2.extrude({offset: [0,0,safe]}).translate([0,0,-safe/2]).rotateX(90);
  
  var Alpha=Math.acos(Hcut/Rin);
  var W=Math.tan(Alpha)*2*Hcut;
  Bt=Bt.extrude({offset: [0,0,W]}).translate([0,0,-W/2]).rotateX(90);
  
  
  
  A2=D2.subtract(C2).union(A2).subtract(B2).subtract(Bt).intersect(D2);
  
  //A=A.union(A2);
  
  
  return [
    
    { name: "Illustation", caption: "Illustration", data: A.union(A2).translate([0,0,Ldown])},
    { name: "Part1", caption: "Part1", data: A},
    { name: "Part2", caption: "Part2", data: A2.translate([0,0,Ldown])}
    
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

