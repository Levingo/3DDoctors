function main()
{
    var whiteWidth=22
    var whiteHeight=50
    var blackWidth=20
    var blackHeight=20
    var keyLength=550
    var whiteDistance=60

    var whiteN=18 ;// cdefgab cdefgab cdef =18

    var whiteKey=CAG.fromPoints([[-whiteWidth/2.0,0], [whiteWidth/2.0,0], [-whiteWidth/2.0,-keyLength], [whiteWidth/2.0,-keyLength]]);
    whiteKey=whiteKey.extrude({offset: [0,0,keyLength]})

    //var sub2=new CAG.circle({center: [0, 0], radius: 20, resolution: 60});
    return whiteKey
}
