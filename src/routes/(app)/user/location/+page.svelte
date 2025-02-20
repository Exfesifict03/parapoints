<script lang="ts">
  type Destination = {
    id: number;
    name: string;
    type: "Bus Stop" | "Train Station" | "Airport" | "Ferry Terminal" | "City Center" | "University";
    eta: string; // Estimated time of arrival
    fare: string; // Approximate fare cost
  };

  type Destination2 = {
    id: number;
    name: string;
    type: "Bus Stop" | "Train Station" | "Airport" | "Ferry Terminal" | "City Center" | "University";
    eta: string; // Estimated time of arrival
    fare: string; // Approximate fare cost
  };

  let destinations: Destination[] = [
    { id: 1, name: "Tuyo", type: "City Center", eta: "10 mins", fare: "₱2.50" },
    { id: 2, name: "Abucay", type: "Airport", eta: "30 mins", fare: "₱15.00" },
    { id: 3, name: "Mabatang", type: "Bus Stop", eta: "25 mins", fare: "₱3.00" },
    { id: 4, name: "Calaguiman", type: "Train Station", eta: "15 mins", fare: "₱2.00" },
    { id: 5, name: "Samal", type: "University", eta: "20 mins", fare: "₱2.75" },
    { id: 6, name: "Lalawigan", type: "Ferry Terminal", eta: "40 mins", fare: "₱5.00" },
    { id: 7, name: "Orani", type: "Ferry Terminal", eta: "40 mins", fare: "₱5.00" }
  ];

  let destinations2: Destination2[] = [
    { id: 1, name: "Orani", type: "Ferry Terminal", eta: "40 mins", fare: "₱5.00" },
    { id: 2, name: "Lalawigan", type: "Ferry Terminal", eta: "40 mins", fare: "₱5.00" },
    { id: 3, name: "Samal", type: "University", eta: "20 mins", fare: "₱2.75" },
    { id: 4, name: "Calaguiman", type: "Train Station", eta: "15 mins", fare: "₱2.00" },
    { id: 5, name: "Mabatang", type: "Bus Stop", eta: "25 mins", fare: "₱3.00" },
    { id: 6, name: "Abucay", type: "Airport", eta: "30 mins", fare: "₱15.00" },
    { id: 7, name: "Tuyo", type: "City Center", eta: "10 mins", fare: "₱2.50" }
  ];

  let selectedDestination: Destination | null = null;
  let showDestinations = true; // Default to btn1Click state
  let showDestinations2 = false; // Hide destinations2 by default

  function selectDestination(destination: Destination) {
    selectedDestination = destination;
  }

  export const btn1Text = "Balanga";
  export const btn2Text = "Orani";
  export const btn1Click = () => {  
    showDestinations = true;
    showDestinations2 = false;
  };
  export const btn2Click = () => {
    showDestinations = false;
    showDestinations2 = true;
  };
</script>

<div class="p-6 md:p-10 max-w-lg mx-auto bg-gradient-to-br from-blue-100 to-white rounded-3xl shadow-lg space-y-6 mt-24 mb-12 font-sans">
  <h2 class="text-xl md:text-2xl font-bold text-gray-800 flex items-center justify-center gap-3">
    <span>🚏 Choose Your Destination</span>
  </h2>
  
  <div class="inline-flex items-center text-sm font-medium rounded-md justify-center w-full border-transparent">
    <button 
    class="py-2 px-4 md:px-6 rounded-l-full text-sm md:text-lg font-semibold shadow-lg transition duration-300 ease-in-out border-2 border-blue-700 
    {showDestinations ? 'bg-blue-700 text-white' : 'bg-white text-black hover:bg-blue-700 hover:text-white'}"
    on:click={btn1Click}
  >{btn1Text}</button>
    <span class="py-2 px-4 md:px-6 text-gray-500 bg-white border-t-2 border-b-2 border-blue-700 text-sm md:text-lg font-semibold ">from</span>
    <button 
    class="py-2 px-4 md:px-6 rounded-r-full text-sm md:text-lg font-semibold shadow-lg transition duration-300 ease-in-out border-2 border-blue-700 
    {showDestinations2 ? 'bg-blue-700 text-white' : 'bg-white text-black hover:bg-blue-700 hover:text-white'}"
    on:click={btn2Click}
  >{btn2Text}</button>
  </div>
  
  {#if showDestinations}
    <ul class="space-y-3">
      {#each destinations as destination}
        <li>
          <button 
            class="w-full p-4 md:p-5 text-left rounded-2xl border border-gray-300 flex justify-between items-center bg-white hover:bg-blue-500 hover:text-white shadow-md transition-transform transform hover:scale-105"
            on:click={() => selectDestination(destination)}>
            <div>
              <span class="font-semibold text-base md:text-lg">{destination.name}</span> 
              <span class="text-sm md:text-base text-gray-600 block">{destination.type}</span>
            </div>
            <div class="text-sm md:text-base text-gray-500 font-medium bg-gray-100 px-3 py-1 rounded-full">ETA: {destination.eta}</div>
          </button>
        </li>
      {/each}
    </ul>
  {/if}

  {#if showDestinations2}
    <ul class="space-y-3">
      {#each destinations2 as destination2}
        <li>
          <button 
            class="w-full p-4 md:p-5 text-left rounded-2xl border border-gray-300 flex justify-between items-center bg-white hover:bg-blue-500 hover:text-white shadow-md transition-transform transform hover:scale-105"
            on:click={() => selectDestination(destination2)}>
            <div>
              <span class="font-semibold text-base md:text-lg">{destination2.name}</span> 
              <span class="text-sm md:text-base text-gray-600 block">{destination2.type}</span>
            </div>
            <div class="text-sm md:text-base text-gray-500 font-medium bg-gray-100 px-3 py-1 rounded-full">ETA: {destination2.eta}</div>
          </button>
        </li>
      {/each}
    </ul>
  {/if}
  {#if selectedDestination}
  {#if selectedDestination}
  <div class="mt-4 p-4 md:p-6 bg-blue-50 rounded-2xl text-blue-900 shadow-md border border-blue-200 flex justify-between items-center">
    <div>
      <h3 class="font-semibold text-base md:text-lg">🎯 Selected Destination</h3>
      <p class="text-md md:text-lg">🚌 {selectedDestination.name}</p>
      <p class="text-sm md:text-base text-gray-700">Mode: <span class="font-medium">{selectedDestination.type}</span></p>
      <p class="text-sm md:text-base text-gray-700">⌚ ETA: <span class="font-medium">{selectedDestination.eta}</span></p>
      <p class="text-sm md:text-base text-gray-700">💸 Fare: <span class="font-medium">{selectedDestination.fare}</span></p>
    </div>
    <a href="/user/pay" class="bg-white border-2 border-blue-700 hover:bg-blue-700 text-black hover:text-white py-2 px-4 md:px-6 rounded-full text-sm md:text-lg 
    font-semibold shadow-lg hover:shadow-xl transition duration-300 ease-in-out">
      PAY HERE!
    </a>
  </div>
{/if}
{/if}
</div>