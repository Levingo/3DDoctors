function main()
{  
	var thickness=3;
	var phi	=    [0,45,90,45];    // angle from the previous circle - the first angle is useless
	var diameter=[20,40,25,50]; // inner diameter
	
	var x=[0] ;
	var y=[0] ;  // coordinates of circle centers - the first circle is at (0,0)
	
	// calculate circles center coordinates

	for(var i=1;i<diameter.length;i++) {    // do for each circle from the 2nd.
		distance=diameter[i-1]/2 + diameter[i]/2 + thickness;
		x[i]=x[i-1]+distance*Math.cos( phi[i]*3.1415/180 ) ;
		y[i]=y[i-1]+distance*Math.sin( phi[i]*3.1415/180 );

		
	}

	// union rings

	var output=new CAG();

	for(i=0;i<diameter.length;i++) { 
		output=output.union(new CAG.circle({center: [x[i],y[i]], radius: diameter[i]/2+thickness}).subtract(new CAG.circle({center: [x[i],y[i]], radius: diameter[i]/2})));
	}

	return output.extrude({offset: [0,0,thickness]});

}
