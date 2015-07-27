function Equations(){}




Equations.getFragments = function(num, dur, ease){
  var arr = [];
  for(var i=0; i<num; i++){
    var a = ease(i, 0, dur, num);
    arr.push(a);
  }
  return arr;
}


Equations.getDurations = function(num, dur, ease){
  var arr = [];
  var temp = Equations.getFragments(num, dur, ease);
  temp.push(dur);
  for(var i=0; i<num; ++i){
    arr.push( Math.round( temp[i+1]-temp[i] ) );
  }
  return arr;
}



Equations.linear = function(t, b, c, d) {
	return c * t / d + b;
}

Equations.easeOut = function(t, b, c, d){
  t /= d;
	return -c * t*(t-2) + b;
}

Equations.easeIn = function(t, b, c, d){
  t /= d;
  return c*t*t + b;
}

Equations.easeInOut = function(t, b, c, d){
  t /= d/2;
  if (t < 1) return c/2*t*t + b;
  t--;
  return -c/2 * (t*(t-2) - 1) + b;

}


Equations.easeInOutQuint = function (t, b, c, d) {
	t /= d/2;
	if (t < 1) return c/2*t*t*t*t*t + b;
	t -= 2;
	return c/2*(t*t*t*t*t + 2) + b;
};

Equations.easeInOutCirc = function (t, b, c, d) {
	t /= d/2;
	if (t < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
	t -= 2;
	return c/2 * (Math.sqrt(1 - t*t) + 1) + b;
};


module.exports = Equations;