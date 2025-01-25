<script lang="ts">
  import Footer from "$lib/components/ui/footer/footer.svelte";
  import { Button } from "$lib/components/ui/button/index.js";
  import Navbar from "$lib/components/ui/navbar/navbar.svelte";
  let features = [
    { 
      title: "Insert", 
      description: "Recycle plastic bottles or cans to earn points for fare.",
      image: "/image/insert.jpg" 
    },
    { 
      title: "Scan", 
      description: "Scan the QR code to redeem your points for fare.",
      image: "/image/scan.jpg" 
    },
    { 
      title: "Pay", 
      description: "Scan the QR code to pay with your points.",
      image: "/image/pay.jpg" 
    }
  ];
</script>

<main class="min-h-screen bg-gray-50 text-gray-800 ">
  <Navbar />
  <div class="w-full h-full p-0">
  <!-- Hero Section -->
  <section class="flex flex-col md:flex-row min-h-[10vh] bg-cover bg-center bg-no-repeat text-gray-800 p-6 md:p-10 items-center 
  justify-between space-y-6 md:space-y-0" style="background-image: url('image/bgl.png');">
    <!-- Text Container -->
    <div class="md:w-1/2 w-full text-center md:text-left px-4 md:px-6">
      <a href="/landing">
        <h2 class="text-3xl md:text-5xl font-extrabold mb-4 md:mb-6 leading-snug">
          Transform Waste into Fare with EcoFare
        </h2>
      </a>
      <p class="text-base md:text-lg mb-6 md:mb-8 leading-relaxed">
        A sustainable solution for a greener planet — Join us in making a difference.
      </p>
      <Button
          href="/login"
          class="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 md:px-6 rounded-full text-sm md:text-lg 
          font-semibold shadow-lg hover:shadow-xl transition duration-300 ease-in-out"
    >
          Get Started
      </Button>
    </div>
  
    <!-- Image Container 
           ---class="rounded-lg shadow-md" 
           -->
    <div class="md:w-1/2 w-full flex justify-center">
      <img
        src="/image/clean.png"
        alt="EcoFare Logo"

      />
    </div>
  </section>  

  <!-- Exploit Section -->
  <section id="features" class="py-10 bg-gray-50">
    <div class="w-full h-full p-5 bg-gray-200/40">
      <h3 class="text-3xl md:text-4xl font-bold text-center text-blue-600 mb-12">EXPLOIT</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        {#each features as feature}
          <div class="group relative bg-gradient-to-r from-blue-50 to-blue-100 p-8 rounded-xl shadow-md transition duration-300 ease-in-out hover:scale-105 flex flex-col justify-center items-center hover:from-blue-100 hover:to-blue-200">
            
            <!-- Image on top -->
            <img 
              src={feature.image} 
              alt={feature.title} 
              class="w-full h-auto md:h-64 lg:h-80 object-cover rounded-t-xl mb-4 transition-all duration-300 group-hover:opacity-80" 
            />
            
            <!-- Title and description below the image -->
            <h4 class="text-xl md:text-2xl font-semibold text-blue-600 relative z-10 mb-4 group-hover:text-black transition-colors duration-300 text-center">
              {feature.title}
            </h4>
            
            <p class="text-base md:text-md text-gray-700 relative z-10 leading-relaxed group-hover:text-black transition-colors duration-300 text-center">
              {feature.description}
            </p>
            
            <button
              class="mt-6 px-6 py-3 text-base md:text-lg bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 
              hover:text-white border border-blue-500 transition duration-300 relative z-10"
            >
              Learn More
            </button>
          </div>
        {/each}
      </div>
    </div>
  </section>  
  
  </div>
  <Footer />
</main>
