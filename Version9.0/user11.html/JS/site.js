const featuredTrips = [
  {
    id: 'pacific',
    title: 'Pacific Coast Drive',
    city: 'San Francisco',
    distance: 650,
    nights: 2,
    description: 'Ocean views, coastal towns, and classic sunsets along Highway 1.'
  },
  {
    id: 'sunshine',
    title: 'Sunshine Cities',
    city: 'Miami',
    distance: 480,
    nights: 2,
    description: 'Beach days, art deco streets, and a warm weather weekend getaway.'
  },
  {
    id: 'mountain',
    title: 'Mountain Escape',
    city: 'Denver',
    distance: 750,
    nights: 3,
    description: 'Fresh mountain air, hiking, and a scenic route through the Rockies.'
  }
];

const cityCoordinates = {
  'San Francisco': { latitude: 37.7749, longitude: -122.4194 },
  'Miami': { latitude: 25.7617, longitude: -80.1918 },
  'Denver': { latitude: 39.7392, longitude: -104.9903 },
  'Asheville': { latitude: 35.5951, longitude: -82.5515 }
};

const travelTips = [
  'Pack layers for changing weather on a road trip.',
  'Book lodging early for weekend getaway dates.',
  'Keep a reusable water bottle and snacks on hand.',
  'Use weather data to plan outdoor activities safely.'
];

const resourceTopics = [
  {
    id: 'healthy-travel',
    title: 'Healthy travel habits',
    description: 'Free tips for hydration, movement, restful stops, and mindful pacing during road trips.',
    resources: [
      'Hydration checklist for long drives',
      'Stretching breaks for every 90 miles',
      'Simple comfort packing strategies'
    ],
    tier: 'free',
    ctaLink: 'resources.html#healthy-travel'
  },
  {
    id: 'nutrition-road',
    title: 'Nutrition on the road',
    description: 'Premium nutrition guides for planning snacks, healthy meals, and energy management while traveling.',
    resources: [
      'Balanced snack ideas for travel days',
      'Meal prep checklist for weekend trips',
      'Portable nutrition tips for families'
    ],
    tier: 'premium',
    ctaLink: 'login.html'
  },
  {
    id: 'mindful-wellness',
    title: 'Mindful wellness guides',
    description: 'Free wellness prompts to help travelers stay calm, focused, and energized while on the move.',
    resources: [
      'Mindful breathing exercises',
      'Road trip journaling prompts',
      'Simple recovery routines'
    ],
    tier: 'free',
    ctaLink: 'resources.html#mindful-wellness'
  },
  {
    id: 'planner-subscription',
    title: 'Subscription-level planner guides',
    description: 'Premium planning resources that support a membership model with deeper resources and links.',
    resources: [
      'Premium route review template',
      'In-depth wellness and nutrition workbook',
      'Subscriber-only destination checklist'
    ],
    tier: 'premium',
    ctaLink: 'login.html'
  }
];

function isLoggedIn() {
  return localStorage.getItem('tripHubLoggedIn') === 'true';
}

function createResourceCard(topic) {
  const loggedIn = isLoggedIn();
  const locked = topic.tier === 'premium' && !loggedIn;
  const col = document.createElement('div');
  col.className = 'col-md-6 col-xl-4';
  col.innerHTML = `
    <div class="card h-100 resource-card ${topic.tier === 'premium' ? 'premium-card' : 'free-card'} ${locked ? 'locked' : ''}">
      <div class="card-body position-relative">
        <span class="badge ${topic.tier === 'premium' ? 'bg-warning text-dark' : 'bg-success'} mb-3">${topic.tier === 'premium' ? 'Premium' : 'Free'}</span>
        <h3 class="card-title">${topic.title}</h3>
        <p class="card-text text-muted">${topic.description}</p>
        <ul class="mb-3">
          ${topic.resources.map(item => `<li>${item}</li>`).join('')}
        </ul>
        <a href="${locked ? 'login.html' : topic.ctaLink}" class="btn ${topic.tier === 'premium' ? 'btn-outline-light' : 'btn-primary'} w-100 resource-cta">
          ${locked ? 'Login to unlock' : 'View resources'}
        </a>
        ${locked ? '<div class="premium-note mt-3">Premium content is unlocked when you sign in.</div>' : ''}
      </div>
    </div>
  `;
  return col;
}

function renderResources() {
  const resourcesGrid = document.getElementById('resourcesGrid');
  if (!resourcesGrid) {
    return;
  }
  resourcesGrid.innerHTML = '';
  resourceTopics.forEach((topic) => resourcesGrid.appendChild(createResourceCard(topic)));
}

function setActiveNav() {
  const path = window.location.pathname.split('/').pop();
  document.querySelectorAll('.navbar-nav .nav-link').forEach((link) => {
    link.classList.remove('active');
    if (link.getAttribute('href') === path || (path === '' && link.getAttribute('href') === 'index.html')) {
      link.classList.add('active');
    }
  });
}

function formatCurrency(value) {
  return `$${value.toFixed(2)}`;
}

// estimateRoadTrip needs distance, fuel efficiency, gas price, number of nights,
// and nightly budget. It computes the fuel cost and lodging cost and returns
// the complete travel budget. This function is custom-made for the planner theme.
function estimateRoadTrip(distanceMiles, mpg, gasPrice, nights, nightlyBudget) {
  const fuelCost = calculateFuelCost(distanceMiles, mpg, gasPrice);
  const lodgingCost = nights * nightlyBudget;
  const totalCost = fuelCost + lodgingCost;
  return {
    fuelCost,
    lodgingCost,
    totalCost
  };
}

function calculateFuelCost(distanceMiles, mpg, gasPrice) {
  if (mpg <= 0) {
    return 0;
  }
  return (distanceMiles / mpg) * gasPrice;
}

function createTripCard(trip) {
  const col = document.createElement('div');
  col.className = 'col-md-6 col-xl-4';
  col.innerHTML = `
    <div class="card h-100 shadow-sm">
      <div class="card-body d-flex flex-column">
        <h3 class="card-title">${trip.title}</h3>
        <p class="card-text text-muted">${trip.description}</p>
        <ul class="list-group list-group-flush mb-3">
          <li class="list-group-item"><strong>Destination:</strong> ${trip.city}</li>
          <li class="list-group-item"><strong>Distance:</strong> ${trip.distance} miles</li>
          <li class="list-group-item"><strong>Suggested nights:</strong> ${trip.nights}</li>
        </ul>
        <button class="btn btn-outline-primary mt-auto" data-destination="${trip.city}" type="button">Preview weather</button>
      </div>
    </div>
  `;
  const button = col.querySelector('button');
  button.addEventListener('click', () => fetchWeatherForDestination(trip.city));
  return col;
}

function renderFeaturedTrips() {
  const featured = document.getElementById('featuredTrips');
  const destinationCards = document.getElementById('destinationCards');
  if (featured) {
    featured.innerHTML = '';
    featuredTrips.forEach((trip) => featured.appendChild(createTripCard(trip)));
  }
  if (destinationCards) {
    destinationCards.innerHTML = '';
    featuredTrips.forEach((trip) => destinationCards.appendChild(createTripCard(trip)));
  }
}

function updateWeatherCard(data, city) {
  const weatherBody = document.getElementById('weatherBody');
  if (!weatherBody) {
    return;
  }
  if (!data || !data.daily) {
    weatherBody.innerHTML = `<div class="alert alert-warning">Unable to load weather for ${city}. Please try another destination.</div>`;
    return;
  }

  const daily = data.daily;
  const forecastCards = daily.time.slice(0, 3).map((date, index) => {
    const maxTemp = daily.temperature_2m_max[index];
    const minTemp = daily.temperature_2m_min[index];
    const rainChance = daily.precipitation_probability_max[index];
    return `
      <div class="col-sm-4 mb-3">
        <div class="weather-day p-3 rounded border bg-white text-dark h-100">
          <strong>${date}</strong>
          <div>${maxTemp}° / ${minTemp}°</div>
          <div>Rain ${rainChance}%</div>
        </div>
      </div>
    `;
  }).join('');

  weatherBody.innerHTML = `
    <p class="mb-2"><strong>${city}</strong> weather forecast</p>
    <div class="row gx-2">${forecastCards}</div>
  `;
}

function fetchWeatherForDestination(city) {
  const coords = cityCoordinates[city];
  if (!coords) {
    updateWeatherCard(null, city);
    return;
  }
  const endpoint = `https://api.open-meteo.com/v1/forecast?latitude=${coords.latitude}&longitude=${coords.longitude}&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto`;
  fetch(endpoint)
    .then((response) => response.json())
    .then((data) => updateWeatherCard(data, city))
    .catch(() => updateWeatherCard(null, city));
}

function updateBudgetCard(estimate) {
  const budgetBody = document.getElementById('budgetBody');
  if (!budgetBody) {
    return;
  }
  budgetBody.innerHTML = `
    <p class="mb-2"><strong>Fuel cost:</strong> ${formatCurrency(estimate.fuelCost)}</p>
    <p class="mb-2"><strong>Lodging:</strong> ${formatCurrency(estimate.lodgingCost)}</p>
    <p class="mb-0"><strong>Total road trip budget:</strong> ${formatCurrency(estimate.totalCost)}</p>
  `;
}

function handlePlannerSubmit(event) {
  event.preventDefault();
  const city = document.getElementById('destinationSelect').value;
  const distance = Number(document.getElementById('tripDistance').value);
  const mpg = Number(document.getElementById('vehicleMpg').value);
  const gasPrice = Number(document.getElementById('gasPrice').value);
  const nights = Number(document.getElementById('nights').value);
  const nightlyBudget = Number(document.getElementById('nightlyBudget').value);

  const estimate = estimateRoadTrip(distance, mpg, gasPrice, nights, nightlyBudget);
  updateBudgetCard(estimate);
  fetchWeatherForDestination(city);
}

function updateTravelTip() {
  const tipElement = document.getElementById('travelTip');
  if (tipElement) {
    const index = Math.floor(Math.random() * travelTips.length);
    tipElement.textContent = travelTips[index];
  }
}

function getDestinationHighlight(city) {
  const highlights = {
    'San Francisco': 'Enjoy coastal views, cable cars, and a creative food scene near the bay.',
    'Miami': 'Experience warm beaches, vibrant art, and lively waterfront dining.',
    'Denver': 'Take in mountain scenery, craft breweries, and easy access to hiking trails.',
    'Asheville': 'Wander artsy streets, scenic drives, and Blue Ridge mountain vistas.'
  };
  return highlights[city] || 'Select a city to view its destination highlight.';
}

function renderDestinationHighlights() {
  const select = document.getElementById('highlightSelect');
  const highlightText = document.getElementById('highlightText');
  if (!select || !highlightText) {
    return;
  }
  const update = () => {
    highlightText.textContent = getDestinationHighlight(select.value);
  };
  select.addEventListener('change', update);
  update();
}

function initPage() {
  setActiveNav();
  renderFeaturedTrips();
  updateTravelTip();
  renderDestinationHighlights();
  renderResources();

  const plannerForm = document.getElementById('plannerForm');
  if (plannerForm) {
    plannerForm.addEventListener('submit', handlePlannerSubmit);
    fetchWeatherForDestination(document.getElementById('destinationSelect').value);
  }
}

document.addEventListener('DOMContentLoaded', initPage);
