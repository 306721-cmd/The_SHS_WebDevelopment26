
function texasTech() {
  
alert("Texas Tech Red Raiders")
}

function oregon() {
alert("Oregon Ducks")
}

function indiana() {
alert("Indiana Hoosiers")
}

function fsu() {
alert("Florida State Seminoles")
}

function clemson() {
alert("Clemson Tigers")
}

function miami() {
alert("Miami Hurricanes")
}

function kansasState() {
alert("Kansas State Wildcats")
}

function bigImg(x) {
  x.style.height = "40px";
  x.style.width = "45px";
}

function normalImg(x) {
  x.style.height = "35px";
  x.style.width = "35px";
}

function favoriteTeam(){
 const userIn = document.getElementById("teamType").value;
 if (userIn == "Jets"){
  alert("Approved (Best Team)")
 }

 if (userIn == "Cowboys"){
  alert("Approved")
 }

 if (userIn == "Eagles"){
  alert("Approved")
 }

 if (userIn == "Giants"){
  alert("Not the best NY team")

 }

if (userIn == "Commanders"){
  alert("Approved")
 }

 if (userIn == "Bills"){
 window.location = 'https://www.google.com';
 }

  if (userIn == "Dolphins"){
 window.location = 'https://www.google.com';
 }
 
  if (userIn == "Patriots"){
 window.location = 'https://www.google.com';
 }
}