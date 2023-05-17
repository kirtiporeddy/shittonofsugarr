const calculateButton = document.querySelector('#calculateButton');
calculateButton.addEventListener('click', () => {
  fetch('https://data.cityofnewyork.us/resource/qgc5-ecnb.json')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      const sugarData = data.filter(item => item.restaurant && item.restaurant.toLowerCase().includes("baskin robbins") && item.sugar !== undefined);

      console.log('Items with defined restaurant attribute:', data.filter(item => item.restaurant));
      if (sugarData.length === 0) {
        console.log('No data found for the Sugar category or Baskin Robbins restaurant.');
        return;
      }

      // Calculate the average amount of sugar
      const sugarAmounts = sugarData.map(item => {
        const value = parseFloat(item.sugar);
        return isNaN(value) ? 0 : value;
      });
      console.log('Sugar amounts:', sugarAmounts);
      const sugarAverage = (sugarAmounts.reduce((acc, cur) => acc + cur, 0) / sugarAmounts.length).toFixed(2);

      // Find the highest amount of sugar
      const finiteSugarAmounts = sugarAmounts.filter(amount => isFinite(amount));
      console.log('Finite sugar amounts:', finiteSugarAmounts);
      const sugarHighest = finiteSugarAmounts.length > 0 ? Math.max(...finiteSugarAmounts).toFixed(2) : 'N/A';

      // Find the lowest amount of sugar
      const sugarLowest = finiteSugarAmounts.length > 0 ? Math.min(...finiteSugarAmounts).toFixed(2) : 'N/A';

      // Display the results on the HTML page
      const averageElement = document.querySelector('#result p:nth-of-type(1)');
      const highestElement = document.querySelector('#result p:nth-of-type(2)');
      const lowestElement = document.querySelector('#result p:nth-of-type(3)');
      averageElement.textContent = `Average amount of sugar: ${sugarAverage} grams`;
      highestElement.textContent = `Highest amount of sugar: ${sugarHighest} grams`;
      lowestElement.textContent = `Lowest amount of sugar: ${sugarLowest} grams`;
    })
    .catch(error => console.error(error));
});

