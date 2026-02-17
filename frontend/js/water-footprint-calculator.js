// Water Footprint Calculator JS
const waterFactors = {
  shower: 9, // liters per minute
  toilet: 6, // liters per flush
  laundry: 70, // liters per load
  dishwasher: 15, // liters per run
  drinking: 1, // direct
  meatMeal: 600, // liters per meal
  dairyServing: 120, // liters per serving
  plantMeal: 100, // liters per meal
  clothes: 2500, // liters per item
  electronics: 12000 // liters per item
};

document.getElementById('waterFootprintForm').onsubmit = function(e) {
  e.preventDefault();
  // Daily
  const shower = +document.getElementById('showerMin').value * waterFactors.shower;
  const toilet = +document.getElementById('toiletFlush').value * waterFactors.toilet;
  const laundry = (+document.getElementById('laundryLoads').value * waterFactors.laundry) / 7;
  const dishwasher = (+document.getElementById('dishwasherRuns').value * waterFactors.dishwasher) / 7;
  const drinking = +document.getElementById('drinkingWater').value * waterFactors.drinking;
  // Diet (weekly -> daily)
  const meat = (+document.getElementById('meatMeals').value * waterFactors.meatMeal) / 7;
  const dairy = (+document.getElementById('dairyServings').value * waterFactors.dairyServing) / 7;
  const plant = (+document.getElementById('plantMeals').value * waterFactors.plantMeal) / 7;
  // Purchases (monthly/yearly -> daily)
  const clothes = ((+document.getElementById('clothesItems').value * waterFactors.clothes) / 30.4);
  const electronics = ((+document.getElementById('electronicsItems').value * waterFactors.electronics) / 365);

  const total = shower + toilet + laundry + dishwasher + drinking + meat + dairy + plant + clothes + electronics;

  document.getElementById('waterResults').style.display = 'flex';
  document.getElementById('waterResults').innerHTML = `
    <h2>Your Daily Water Footprint</h2>
    <div style='font-size:2.2rem; color:#43cea2; font-weight:700;'>${Math.round(total)} liters</div>
    <div class='water-breakdown'>
      <b>Breakdown:</b><br>
      Showers: ${Math.round(shower)} L<br>
      Toilet: ${Math.round(toilet)} L<br>
      Laundry: ${Math.round(laundry)} L<br>
      Dishwasher: ${Math.round(dishwasher)} L<br>
      Drinking: ${Math.round(drinking)} L<br>
      Meat Meals: ${Math.round(meat)} L<br>
      Dairy: ${Math.round(dairy)} L<br>
      Plant Meals: ${Math.round(plant)} L<br>
      Clothes: ${Math.round(clothes)} L<br>
      Electronics: ${Math.round(electronics)} L
    </div>
    <div style='font-size:1.05rem; color:#185a9d; margin-top:1.2em;'>
      <i class='fa fa-tint'></i> <b>Tip:</b> Reducing meat, dairy, and new purchases can greatly lower your water footprint!
    </div>
  `;
};
