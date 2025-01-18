<script lang="ts">
 import {Button} from "$lib/components/ui/button/index.js";
 import Navbar from "$lib/components/ui/navbar/navbar.svelte";
  let features = [
    { title: "Feature 1", description: "Description of feature 1" },
    { title: "Feature 2", description: "Description of feature 2" },
    { title: "Feature 3", description: "Description of feature 3" }
  ];
</script>

<main class="min-h-screen bg-gray-50 text-gray-800">
    <Navbar/>
  <section class="bg-blue-600 text-white py-20">
    <div class="container mx-auto px-6 text-center">
      <a href="/landing">
        <h2 class="text-4xl font-extrabold mb-4" >Welcome to PARAPOINTS</h2>
        </a>
      <p class="text-lg mb-6">Convert your waste into Fare with our Environmental Solution.</p>
      <Button href="/auth/login">Get Started</Button>
    </div>
  </section>
  <section id="features" class="py-16">
    <div class="container mx-auto px-6">
      <h3 class="text-3xl font-bold text-center mb-8">Our Features</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        {#each features as feature}
          <div class="bg-white p-6 rounded-lg shadow-md">
            <h4 class="text-xl font-semibold mb-2">{feature.title}</h4>
            <p class="text-gray-600">{feature.description}</p>
          </div>
        {/each}
      </div>
    </div>
  </section>
  <section id="about" class="bg-gray-100 py-16">
    <div class="container mx-auto px-6 text-center">
      <h3 class="text-3xl font-bold mb-4">About Us</h3>
      <p class="text-lg text-gray-700">We are dedicated to providing top-notch solutions to our users.</p>
    </div>
  </section>
  <section id="contact" class="py-16">
    <div class="container mx-auto px-6 text-center">
      <h3 class="text-3xl font-bold mb-4">Contact Us</h3>
      <p class="text-gray-600">Feel free to reach out for any inquiries or support.</p>
      <a href="mailto:contact@example.com" class="block mt-4 text-blue-600 underline">contact@example.com</a>
    </div>
  </section>
  <footer class="bg-gray-800 text-white py-4">
    <div class="container mx-auto px-6 text-center">
      <p>&copy; 2025 MyLandingPage. All rights reserved.</p>
    </div>
  </footer>
</main>
