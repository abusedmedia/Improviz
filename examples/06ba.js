var t = new Track(0);
p.add(t);

var s = new Sequence();
t.add(s);

for(var i=0; i<12; ++i){
	var n = new Note( 60+i, 100, 127);
    s.add(n);
}


