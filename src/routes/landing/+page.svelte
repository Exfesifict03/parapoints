<script lang="ts">
  import Footer from "$lib/components/ui/footer/footer.svelte";
  import { Button } from "$lib/components/ui/button/index.js";
  import Navbar from "$lib/components/ui/navbar/navbar.svelte";
  let features = [
    { title: "Feature 1", description: "Description of feature 1" },
    { title: "Feature 2", description: "Description of feature 2" },
    { title: "Feature 3", description: "Description of feature 3" }
  ];
</script>

<main class="min-h-screen bg-gray-50 text-gray-800 ">
  <Navbar />
  <div class="container mx-auto px-6 py-6">
    

  <!-- Hero Section -->
  <section  class="flex flex-col md:flex-row min-h-[10vh] bg-cover bg-center bg-no-repeat text-gray-800 p-6 md:p-10 items-center justify-center" style="background-image: url('/image/landing1.jpg');">
    <div class="container mx-auto px-6 text-center">
      <a href="/landing">
        <h2 class="text-5xl font-extrabold mb-6 leading-tight">
          Transform Waste into Fare with EcoFare
        </h2>
      </a>
      <p class="text-lg mb-8">
        A sustainable solution for a greener planet — Join us in making a difference.
      </p>
      <Button
        href="/login"
        class="bg-yellow-400 hover:bg-yellow-500 text-teal-900 py-2 px-6 rounded-full text-lg font-semibold transition duration-300 ease-in-out"
      >
        Get Started
      </Button>
    </div>
  </section>

  <!-- Features Section -->
  <section id="features" class="py-24 bg-gray-50">
    <div class="container mx-auto px-6">
      <h3 class="text-4xl font-bold text-center text-teal-900 mb-12">Our Features</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        {#each features as feature}
          <div class="group relative bg-gradient-to-r from-teal-50 to-yellow-50 p-8 rounded-xl shadow-md transition duration-300 ease-in-out hover:scale-105">
            <div
              class="absolute inset-0 opacity-0 group-hover:opacity-20 bg-teal-700 rounded-xl transition-opacity duration-300"
            ></div>
            <h4 class="text-2xl font-semibold text-teal-900 relative z-10 mb-4 group-hover:text-white transition-colors duration-300">
              {feature.title}
            </h4>
            <p class="text-md text-gray-700 relative z-10 leading-relaxed group-hover:text-gray-100 transition-colors duration-300">
              {feature.description}
            </p>
            <button
              class="mt-6 px-4 py-2 bg-teal-500 text-white font-medium rounded-lg hover:bg-yellow-400 hover:text-teal-900 border border-teal-500 transition duration-300 relative z-10"
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
