function calculateFitness(){
	var currentRecord = Infinity;
	for(var i = 0; i < population.length; i++){
  	var d = calcDistance(cities, population[i]);
  	if(d < recordDistance){
  		recordDistance = d;
  		bestEver = population[i];
  		console.log("Best ever distance : " + recordDistance);
  	}
  	if(d < currentRecord){
  		currentRecord = d;
  		currentBest = population[i];
  	}
  	// lower the distance, higher the fitness and vice-versa, also 
  	// ( + 1) in denominator is just to make sure we don't divide by zero
  	fitness[i] = 1 / (d + 1);
  }
}

function normalizeFitness(){
	var sum = 0;
	for(var i = 0; i < fitness.length; i++){
		sum += fitness[i];
	}
	for(var i = 0; i < fitness.length; i++){
		fitness[i] = fitness[i] / sum;
	}
}

function nextGeneration(){
	var newPopulation = [];
	for(var i = 0; i < population.length; i++){
		var order1 = pickOne(population, fitness);
		var order2 = pickOne(population, fitness);
		var order = crossOver(order1, order2);
		mutate(order, 0.01);
		newPopulation[i] = order;
	}
	population = newPopulation;
}

function crossOver(order1, order2){
	// basic logic --  first select a random part from order1 and then add it to newOrder
	// then loop through order2 and add the remaining left orders.

	var start = floor(random(order1.length));
	var end = floor(random(start + 1, order2.length));

	var newOrder = order1.slice(start, end);

	for(var i = 0; i < order2.length; i++){
		if(!newOrder.includes(order2[i])){
			newOrder.push(order2[i]);
		}
	}

	return newOrder;
}

function mutate(order, mutationRate){
	// shuffle 2 neighbours

	for(var i = 0; i < totalCities; i++){
		if(random(1) < mutationRate){
			var indexA = floor(random(order.length));
			var indexB = (indexA + 1) % totalCities;
			swap(order, indexA, indexB);
		}
	}
}

function pickOne(list, prob){
	var index = 0;
	var r = random(1);

	while(r > 0){
		r = r - prob[index];
		index++;	
	}
	index--;
	return list[index].slice();
}