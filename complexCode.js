// filename: complexCode.js

/**
 * This complex code demonstrates an implementation of a genetic algorithm.
 * The algorithm evolves a population of strings to match a target string through generations.
 * Each string in the population is a series of lowercase alphabetical characters.
 * The fitness of each string is calculated based on the number of characters that match the target string.
 * The algorithm produces new generations by selecting parents based on fitness and applying genetic operators like crossover and mutation.
 * It also uses elitism, where the best-performing individuals from the previous generation are preserved in the new generation.
 */

// Utility function to generate a random lowercase alphabetical character
function getRandomChar() {
  const characters = 'abcdefghijklmnopqrstuvwxyz';
  return characters[Math.floor(Math.random() * characters.length)];
}

// Class representing an individual in the population
class Individual {
  constructor(targetString, chromosomeLength) {
    this.targetString = targetString;
    this.chromosome = '';
    this.fitness = 0;

    for (let i = 0; i < chromosomeLength; i++) {
      this.chromosome += getRandomChar();
    }

    this.calculateFitness();
  }

  calculateFitness() {
    let matches = 0;
    for (let i = 0; i < this.chromosome.length; i++) {
      if (this.chromosome[i] === this.targetString[i]) {
        matches++;
      }
    }
    this.fitness = matches / this.targetString.length;
  }
}

// Class representing the population
class Population {
  constructor(populationSize, targetString) {
    this.populationSize = populationSize;
    this.targetString = targetString;
    this.population = [];

    for (let i = 0; i < populationSize; i++) {
      const individual = new Individual(targetString, targetString.length);
      this.population.push(individual);
    }
  }

  // Selects parents for reproduction using tournament selection
  tournamentSelection() {
    const tournamentSize = Math.floor(this.populationSize / 10); // Selects 10% of the population for a tournament
    let tournament = [];

    for (let i = 0; i < tournamentSize; i++) {
      const randomIndex = Math.floor(Math.random() * this.populationSize);
      tournament.push(this.population[randomIndex]);
    }

    return tournament.reduce((a, b) => (a.fitness > b.fitness ? a : b));
  }

  // Applies crossover to generate a new individual
  crossover(parent1, parent2) {
    const child = new Individual(this.targetString, this.targetString.length);
    const crossoverPoint = Math.floor(Math.random() * this.targetString.length);

    for (let i = 0; i < this.targetString.length; i++) {
      if (i < crossoverPoint) {
        child.chromosome += parent1.chromosome[i];
      } else {
        child.chromosome += parent2.chromosome[i];
      }
    }

    return child;
  }

  // Applies mutation to an individual
  mutation(individual, mutationRate) {
    let mutatedChromosome = '';

    for (let i = 0; i < this.targetString.length; i++) {
      if (Math.random() < mutationRate) {
        mutatedChromosome += getRandomChar();
      } else {
        mutatedChromosome += individual.chromosome[i];
      }
    }

    individual.chromosome = mutatedChromosome;
    individual.calculateFitness();
  }

  // Evolves the population to the next generation
  evolve(mutationRate) {
    const elitismSize = Math.floor(this.populationSize / 10); // Preserves 10% of the best individuals
    const newGeneration = [];

    // Elitism: Preserve the best individuals
    for (let i = 0; i < elitismSize; i++) {
      const bestIndividual = this.population
        .sort((a, b) => b.fitness - a.fitness)
        [i];
      newGeneration.push(bestIndividual);
    }

    // Rest of the new generation: Perform tournament selection, crossover, and mutation
    for (let i = elitismSize; i < this.populationSize; i++) {
      const parent1 = this.tournamentSelection();
      const parent2 = this.tournamentSelection();
      const child = this.crossover(parent1, parent2);
      this.mutation(child, mutationRate);
      newGeneration.push(child);
    }

    this.population = newGeneration;
  }

  // Prints the best individual in the population
  printBestIndividual() {
    const bestIndividual = this.population.sort(
      (a, b) => b.fitness - a.fitness
    )[0];
    console.log('Best Individual:', bestIndividual.chromosome);
    console.log('Fitness:', bestIndividual.fitness);
  }
}

// Example usage
const target = 'hello world';
const populationSize = 100;
const mutationRate = 0.05;
const maxGenerations = 1000;

const population = new Population(populationSize, target);

for (let i = 0; i < maxGenerations; i++) {
  population.evolve(mutationRate);
  population.printBestIndividual();

  if (population.population[0].fitness === 1) {
    console.log('Target string reached!');
    break;
  }
}