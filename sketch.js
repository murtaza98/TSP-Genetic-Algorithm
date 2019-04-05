var cities = [];
var totalCities = 7;

var order = [];

var population = [];
var fitness = [];

var currentBest;
var recordDistance = Infinity;
var bestEver;

var generation_count = 0;
var generation_count_point = [];

function setup() {
	var device_width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

	var device_height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
	
  createCanvas(device_width , device_height);

  var order = [];
  for (var i = 0; i < totalCities; i++) {
    var v = createVector(random(width), random(height / 2));
    cities[i] = v;
    order[i] = i;
  }

  var total_initial_population = 5;

  for(var i = 0; i < total_initial_population; i++){
    var new_pop = [];
    // add start
    new_pop.push(order[0]);

    // shuffle and then add middle part
    new_pop = new_pop.concat(shuffle(order.slice(1, order.length - 1)));

    // add end
    new_pop.push(order[order.length - 1]);

  	population[i] = new_pop.slice();
  }

  for(var i = 0; i < population.length; i++){
  	var d = calcDistance(cities, population[i]);
  	fitness[i] = d;
  	if(d < recordDistance){
  		recordDistance = d;
  		bestEver = population[i];
  	}
  }

  console.log("Initial Population");
  for(var i = 0;i< population.length; i++){
    console.log(population[i]);
  }

  // set generation count
  generation_count_point.push(device_width/2);
  generation_count_point.push(50);
  frameRate(5);
}

function draw() {
  background(0);
  

  // genetic algo
  calculateFitness();
  normalizeFitness();
  nextGeneration();

  textSize(32);
  text('Best Path Found till Now', 10, 50);
  text('Paths being Explored', 10, 310);
  text('Generation ' + generation_count++, generation_count_point[0], generation_count_point[1]);

  if(generation_count > 3){
    noLoop();
  }

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