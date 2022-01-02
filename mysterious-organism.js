// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
}

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
}

// Factory function to create instance of P.Aequor organism
const pAequorFactory = (number, dnaBase) => {
  this.number = number;
  this.dnaBase = dnaBase;

  return {
    specimenNum: number,
    dna: dnaBase,
    mutate() {
      let randomIndex = Math.floor(Math.random() * this.dna.length);
      // console.log(randomIndex);
      let randomSelectedBase = this.dna[randomIndex];
      // console.log('Selected Base: ', randomSelectedBase);
      let randomBase = returnRandBase();

      while (this.dna[randomIndex] === randomBase) {
        let newRandomBase = returnRandBase();
        randomBase = newRandomBase;
      }
      this.dna[randomIndex] = randomBase;
      // console.log('New Base: ', randomBase);
      return this.dna;
    },
    compareDNA(pAequor) {
      const comparePAequor = pAequor.dna;
      let identicalCount = 0;

      for (let i = 0; i < comparePAequor.length; i++) {
          if (comparePAequor[i] === this.dna[i]) {
            identicalCount += 1;
          }
        }
      let identicalRate = (identicalCount / this.dna.length) * 100;
      return `Specimen ${this.specimenNum} and Specimen ${pAequor.specimenNum} has ${identicalRate.toFixed()}% DNA in common.`;
    },
    willLikelySurvive() {
      let cGCount = 0;
      let survivalRate = 0;

      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === 'C' || this.dna[i] === 'G') {
          cGCount += 1;
        }
      }
      survivalRate = (cGCount / this.dna.length) * 100;
      return survivalRate.toFixed() >= 60 ? true : false;
    },
    complementStrand() {
      const pAequorComplement = [];
      let pAequor = this.dna;
      for (let i = 0; i < pAequor.length; i++) {
        switch(pAequor[i]) {
          case 'A':
          pAequorComplement.push('T');
          break;
          case 'T':
          pAequorComplement.push('A');
          break;
          case 'C':
          pAequorComplement.push('G');
          break;
          case 'G':
          pAequorComplement.push('C');
        }
      }
      return pAequorComplement;
    }
  }
}

// Generates 30 pAequor organism(s) that has 60% survival rate
const pAequorThatCanSurvive = () => {
  const survivedPAequor = [];
  let i = 0;
  while (survivedPAequor.length < 30) {
    let pAequor = pAequorFactory(i, mockUpStrand());
    //  console.log(pAequorOrganism.dna);
    if (pAequor.willLikelySurvive()) {
      survivedPAequor.push(pAequor.dna);
    }
    i++;
  }
  return survivedPAequor;
}

// Tests
let pAequor1 = pAequorFactory(1, mockUpStrand());
let pAequor2 = pAequorFactory(2, mockUpStrand());
console.log(`Specimen ${pAequor1.specimenNum}: `, pAequor1.dna);
// console.log(`Mutated Specimen ${pAequor1.specimenNum}: `, pAequor1.mutate());
// console.log(`Specimen ${pAequor2.specimenNum}`, pAequor2.dna);
// console.log(pAequor1.compareDNA(pAequor2));
// console.log(pAequor1.willLikelySurvive());
// console.log(pAequorThatCanSurvive());
// console.log('Complementary DNA: ', pAequor1.complementStrand());
