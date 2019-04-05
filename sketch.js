var cities = [];
var totalCities = 10;

var order = [];

var population = [];
var fitness = [];

var currentBest;
var recordDistance = Infinity;
var bestEver;

function setup() {
	var device_width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

	var device_height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
	
  createCanvas(device_width / 2, device_height);

  var order = [];
  for (var i = 0; i < totalCities; i++) {
    var v = createVector(random(width), random(height / 2));
    cities[i] = v;
    order[i] = i;
  }

  var total_initial_population = 500;
  for(var i = 0; i < total_initial_population; i++){
  	population[i] = shuffle(order);
  }

  for(var i = 0; i < population.length; i++){
  	var d = calcDistance(cities, population[i]);
  	fitness[i] = d;
  	if(d < recordDistance){
  		recordDistance = d;
  		bestEver = population[i];
  	}
  }
}

function draw() {
  background(0);
  

  // genetic algo
  calculateFitness();
  normalizeFitness();
  nextGeneration();


  fill(255);
  for (var i = 0; i < cities.length; i++) {
    ellipse(cities[i].x, cities[i].y, 8, 8);
  }


  // show the best ever
  stroke(255, 0, 255);
  strokeWeight(4);
  noFill();
  beginShape();
  for (var i = 0; i < bestEver.length; i++) {
    var n = bestEver[i];
    vertex(cities[n].x, cities[n].y);
  }
  endShape();


  // show the current best
  translate(0, height / 2);
  stroke(255);
  strokeWeight(2);
  noFill();
  beginShape();
  for(var i = 0; i< currentBest.length; i++){
  	var n  = currentBest[i];
  	ellipse(cities[n].x, cities[n].y, 16, 16);
  	vertex(cities[n].x, cities[n].y);
  }
  endShape();


  // translate(0, height / 2);
  // stroke(255);
  // strokeWeight(1);
  // noFill();
  // beginShape();
  // for (var i = 0; i < order.length; i++) {
  //   var n = order[i];
  //   vertex(cities[n].x, cities[n].y);
  // }
  // endShape();



  // var d = calcDistance(cities, order);
  // if (d < recordDistance) {
  //   recordDistance = d;
  //   bestEver = order.slice();
  // }

  // textSize(32);
  // // var s = '';
  // // for (var i = 0; i < order.length; i++) {
  // //   s += order[i];
  // // }
  // fill(255);
  // var percent = 100 * (count / totalPermutations);
  // text(nf(percent, 0, 2) + "% completed", 20, height / 2 - 50);

  // nextOrder();


}

function swap(a, i, j) {
  var temp = a[i];
  a[i] = a[j];
  a[j] = temp;
}


function calcDistance(points, order) {
  var sum = 0;
  for (var i = 0; i < order.length - 1; i++) {
    var cityAIndex = order[i];
    var cityA = points[cityAIndex];
    var cityBIndex = order[i + 1];
    var cityB = points[cityBIndex];
    var d = dist(cityA.x, cityA.y, cityB.x, cityB.y);
    sum += d;
  }
  return sum;
}