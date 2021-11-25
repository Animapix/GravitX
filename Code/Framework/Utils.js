function rnd(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function degrees_to_radians(degrees)
{
  return degrees * (Math.PI/180);
}

function radians_to_degrees(radians)
{
  return radians * (180/Math.PI);
}

// https://codepen.io/KryptoniteDove/post/load-json-file-locally-using-pure-javascript
function loadJSON(path,callback) {   
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', path , true);
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
      callback(xobj.responseText);
    }
  };
  xobj.send(null);  
}