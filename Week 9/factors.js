function factorsOf(n) {
   if (Number.isNaN(Number(n))) {
      throw new RangeError('Value must be an integer');
   }
   if (n < 0) {
      throw new RangeError('Nubmer must be positive');
   }
   if (!Number.isInteger(n)) {
      throw new RangeError('Number must be an integer');
   }
   const factors = [];
   
   for (let i = 1; i <= Math.sqrt(n); i++) {
      if (n%i === 0) {
         factors.push(i, n/i);
      }
   }
   return factors.sort((a, b) => a - b);
}

self.addEventListener('message', (e) => {
   const factors = String(factorsOf(Number(e.data)));
   self.postMessage(factors);
   self.close();
});