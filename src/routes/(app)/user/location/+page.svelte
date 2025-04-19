<script lang="ts">
  type Location = {
    id: number;
    name: string;
    type: "Bus Stop" | "Train Station" | "Airport" | "Ferry Terminal" | "City Center" | "University" | "Barangay" | "City";
    eta: string;
    image: string;
  };

  let locations: Location[] = [
    { id: 1, name: "Balanga", type: "City", eta: "10 mins", image: "/image/balanga.jpg" },
    { id: 2, name: "Tuyo", type: "Barangay", eta: "10 mins", image: "/image/tuyo.jpg" },
    { id: 3, name: "Abucay", type: "Barangay", eta: "30 mins", image: "/image/abucay.png" },
    { id: 4, name: "Mabatang", type: "Barangay", eta: "25 mins", image: "/image/mabatang.jpeg" },
    { id: 5, name: "Calaguiman", type: "Barangay", eta: "15 mins", image: "/image/calaguiman.jpg" },
    { id: 6, name: "Samal", type: "Barangay", eta: "20 mins", image: "/image/samal.jpg" },
    { id: 7, name: "Lalawigan", type: "Barangay", eta: "40 mins", image: "/image/lalawigan.png" },
    { id: 8, name: "Orani", type: "City", eta: "40 mins", image: "/image/orani.png" }
  ];

  let currentStep = 1;
  let origin: Location | null = null;
  let destination: Location | null = null;

  // Fare map based on ID combinations
  const fareMap: Record<string, number> = {
    "1-2": 10, "1-3": 20, "1-4": 25, "1-5": 15, "1-6": 18, "1-7": 30, "1-8": 35,
    "2-1": 10, "2-3": 12, "2-4": 20, "2-5": 17, "2-6": 19, "2-7": 25, "2-8": 28,
    "3-1": 20, "3-2": 12, "3-4": 10, "3-5": 12, "3-6": 14, "3-7": 20, "3-8": 22,
    "4-1": 25, "4-2": 20, "4-3": 10, "4-5": 11, "4-6": 12, "4-7": 18, "4-8": 20,
    "5-1": 15, "5-2": 17, "5-3": 12, "5-4": 11, "5-6": 10, "5-7": 15, "5-8": 17,
    "6-1": 18, "6-2": 19, "6-3": 14, "6-4": 12, "6-5": 10, "6-7": 13, "6-8": 16,
    "7-1": 30, "7-2": 25, "7-3": 20, "7-4": 18, "7-5": 15, "7-6": 13, "7-8": 10,
    "8-1": 35, "8-2": 28, "8-3": 22, "8-4": 20, "8-5": 17, "8-6": 16, "8-7": 10
  };

  // ETA map based on ID combinations
  const etaMap: Record<string, string> = {
    "1-2": "4 mins", "1-3": "7 mins", "1-4": "10 mins", "1-5": "13 mins", "1-6": "13 mins", "1-7": "27 mins", "1-8": "22 mins",
    "2-1": "4 mins", "2-3": "10 mins", "2-4": "13 mins", "2-5": "10 mins", "2-6": "13 mins", "2-7": "27 mins", "2-8": "22 mins",
    "3-1": "7 mins", "3-2": "11 mins", "3-4": "13 mins", "3-5": "10 mins", "3-6": "13 mins", "3-7": "27 mins", "3-8": "22 mins",
    "4-1": "12 mins", "4-2": "12 mins", "4-3": "12 mins", "4-5": "13 mins", "4-6": "13 mins", "4-7": "27 mins", "4-8": "22 mins",
    "5-1": "13 mins", "5-2": "10 mins", "5-3": "10 mins", "5-4": "13 mins", "5-6": "13 mins", "5-7": "27 mins", "5-8": "22 mins",
    "6-1": "13 mins", "6-2": "13 mins", "6-3": "13 mins", "6-4": "13 mins", "6-5": "13 mins", "6-7": "27 mins", "6-8": "22 mins",
    "7-1": "27 mins", "7-2": "27 mins", "7-3": "27 mins", "7-4": "27 mins", "7-5": "27 mins", "7-6": "27 mins", "7-8": "22 mins",
    "8-1": "22 mins", "8-2": "22 mins", "8-3": "22 mins", "8-4": "22 mins", "8-5": "22 mins", "8-6": "22 mins", "8-7": "22 mins"
  };

  

  function selectLocation(location: Location) {
    if (currentStep === 1) {
      origin = location;
      currentStep = 2;
    } else if (currentStep === 2) {
      destination = location;
      currentStep = 3;
    }
  }

  function reset() {
    currentStep = 1;
    origin = null;
    destination = null;
  }

  function startOver() {
    // Resets only the destination selection step
    currentStep = 2;
    destination = null;
  }

  function calculateFare(): string {
    if (origin && destination) {
      const key = `${origin.id}-${destination.id}`;
      const reverseKey = `${destination.id}-${origin.id}`;
      const fare = fareMap[key] || fareMap[reverseKey];
      return `₱${fare.toFixed(2)}`;
    }
    return "₱0.00";
  }

  function calculateETA(): string {
    if (origin && destination) {
      const key = `${origin.id}-${destination.id}`;
      const reverseKey = `${destination.id}-${origin.id}`;
      const eta = etaMap[key] || etaMap[reverseKey];
      return eta || "N/A";
    }
    return "N/A";
  }
</script>

<div class="p-6 md:p-10 max-w-lg mx-auto bg-gradient-to-br from-blue-100 to-white rounded-3xl shadow-lg space-y-6 mt-24 mb-12 font-sans">

  {#if currentStep === 1}
    <h2 class="text-xl md:text-2xl font-bold text-gray-800 text-center">📍 Where are you now?</h2>
    <ul class="space-y-3">
      {#each locations as loc}
        <li>
          <button 
            class="w-full p-4 text-left rounded-2xl border border-gray-300 flex justify-between items-center bg-white hover:bg-blue-500 hover:text-black shadow-md transition-transform transform hover:scale-105"
            on:click={() => selectLocation(loc)}>
            <div>
              <span class="font-semibold">{loc.name}</span>
              <span class="block text-sm text-gray-600">{loc.type}</span>
            </div>
          </button>
        </li>
      {/each}
    </ul>
  {/if}

  {#if currentStep === 2}
  <h2 class="text-xl md:text-2xl font-bold text-gray-800 text-center">🎯 Where do you want to go?</h2>
  <ul class="space-y-3">
    {#each locations.filter(l => l.id !== origin?.id) as loc}
      <li>
        <button 
          class="w-full p-4 text-left rounded-2xl border border-gray-300 flex justify-between items-center bg-white hover:bg-blue-500 hover:text-black shadow-md transition-transform transform hover:scale-105"
          on:click={() => selectLocation(loc)}>
          <div>
            <span class="font-semibold">{loc.name}</span>
            <span class="block text-sm text-gray-600">{loc.type}</span>
          </div>
          <span class="text-sm font-medium bg-gray-100 px-3 py-1 rounded-full">
            ETA: {origin ? (etaMap[`${origin.id}-${loc.id}`] || etaMap[`${loc.id}-${origin.id}`] || "N/A") : "N/A"}
          </span>
        </button>
      </li>
    {/each}
  </ul>

    <div class="flex justify-center mt-4">
      <button 
        on:click={reset} 
        class="px-4 py-2 rounded-full bg-blue-700 hover:bg-blue-800 text-white font-semibold">
        🔄 Start Over
      </button>
    </div>
  {/if}

  {#if currentStep === 3 && origin && destination}
    <div class="space-y-4">
      <h2 class="text-xl md:text-2xl font-bold text-gray-800 text-center">🧾 EcoFare Receipt</h2>
      <div class="bg-white p-5 rounded-2xl shadow-md text-gray-800 space-y-2 border">
        {#if destination.image}
          <img src={destination.image} alt={destination.name} class="rounded-xl w-full h-48 object-cover mb-4" />
        {/if}
        <p><strong>From:</strong> {origin.name} ({origin.type})</p>
        <p><strong>To:</strong> {destination.name} ({destination.type})</p>
        <p><strong>ETA:</strong> {calculateETA()}</p> <!-- Updated ETA here -->
        <p><strong>Fare:</strong> {calculateFare()}</p>
      </div>
      <div class="flex justify-between">
        <button on:click={reset} class="px-4 py-2 rounded-full bg-gray-200 hover:bg-gray-300 text-sm font-semibold">🔁 Start Over</button>
        <a href="/user/pay" class="px-6 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-full text-sm font-semibold shadow">✅ Confirm & Pay</a>
      </div>
    </div>
  {/if}
</div>
