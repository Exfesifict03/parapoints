<script lang="ts">
  import Footer from "$lib/components/ui/footer/footer.svelte";
  import { Button } from "$lib/components/ui/button/index.js";
  import * as Dialog from "$lib/components/ui/dialog/index.js";

  let activeModal: number | null = null; // ✅ Fix: Changed from 'const' to 'let'

  const openModal = (id: number) => {
    activeModal = id;
  };

  const closeModal = () => {
    activeModal = null;
  };

  let features = [
    { 
      id: 1,
      title: "Insert", 
      description: "Recycle plastic bottles or cans to earn points for fare.",
      image: "/image/insert.jpg",
      modalContent: `
        EcoFare's "Insert" feature makes recycling simple and rewarding. 
        Place your recyclable plastic bottles or metal cans into the machine, 
        which automatically sorts them and assigns points based on the material. 
        Each item you recycle contributes to reducing waste while earning points 
        you can redeem for transportation fare. Be a part of the change, 
        one recyclable at a time!
      `
    },
    { 
      id: 2,
      title: "Scan", 
      description: "Scan the QR code to redeem your points for fare.",
      image: "/image/scan.jpg",
      modalContent: `
        The "Scan" feature provides a seamless way to redeem your points. 
        After recycling, you'll receive a QR code containing your earned points. 
        Simply scan the QR code using our app or kiosk, and the points will be added to your account instantly. 
        It's a quick and efficient step towards using your points for your daily commute or other rewards.
      `
    },
    { 
      id: 3,
      title: "Pay", 
      description: "Scan the QR code to pay with your points.",
      image: "/image/pay.jpg",
      modalContent: `
        Use EcoFare's "Pay" feature to make your commute even more sustainable. 
        With your earned points from recycling, you can pay directly at partnered transportation services. 
        Just scan the QR code, and your fare will be deducted from your points balance. 
        No cash, no hassle — just a greener way to travel.
      `
    }
  ];
</script>
<main class="mt-10 min-h-screen bg-gray-50 text-gray-800">

  <div class="w-full h-full p-0 mt-16"> 
    <section class="flex flex-col md:flex-row min-h-[10vh] bg-cover bg-center bg-no-repeat text-gray-800 p-6 md:p-10 items-center 
    justify-between space-y-6 md:space-y-0" style="background-image: url('image/bgl.png');">
      <div class="md:w-1/2 w-full text-center md:text-left px-4 md:px-6">
        <a href="/landing">
          <h4 class="text-sky-400 text-xl md:text-lg font-extrabold mb-4 md:mb-6 leading-snug">
            Welcome To EcoFare!!!
          </h4>
        </a>
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
            class="bg-white border-2 border-blue-700 hover:bg-blue-700 text-black hover:text-white py-2 px-4 md:px-6 rounded-full text-sm md:text-lg 
            font-semibold shadow-lg hover:shadow-xl transition duration-300 ease-in-out">
            Get Started
        </Button>
      </div>
    <div class="md:w-1/2 w-full flex justify-center">
      <img src="/image/clean.png" alt="EcoFare Logo"/>
    </div>
  </section>  
  </div>

  <!-- Features Section -->
  <section id="features" class="py-10 bg-gray-50">
    <div class="w-full h-full p-5 bg-gray-200/40">
      <h3 class="text-3xl md:text-4xl font-bold text-center text-blue-600 mb-12">HOW TO USE</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        {#each features as feature}
          <div class="group relative bg-gradient-to-r from-blue-50 to-blue-100 p-8 rounded-xl shadow-md transition duration-300 ease-in-out hover:scale-105 flex flex-col justify-center items-center hover:from-blue-100 hover:to-blue-200">
            
            <!-- Image -->
            <img 
              src={feature.image} 
              alt={feature.title} 
              class="w-full h-auto md:h-64 lg:h-80 object-cover rounded-t-xl mb-4 transition-all duration-300 group-hover:opacity-80" 
            />
            
            <!-- Title & Description -->
            <h4 class="text-xl md:text-2xl font-semibold text-blue-600 relative z-10 mb-4 group-hover:text-black transition-colors duration-300 text-center">
              {feature.title}
            </h4>
            
            <p class="text-base md:text-md text-gray-700 relative z-10 leading-relaxed group-hover:text-black transition-colors duration-300 text-center">
              {feature.description}
            </p>
            
            <!-- Learn More Button -->
            <Button
              class="mt-6 px-6 py-3 text-base md:text-lg bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 hover:text-white border border-blue-500 transition duration-300 relative z-10"
              on:click={() => openModal(feature.id)}
            >
              Learn More
            </Button>
          </div>
        {/each}
      </div>
    </div>
  </section>  

  <!-- Modals -->
  {#each features as feature}
    {#if activeModal === feature.id}
      <Dialog.Root open>
        <Dialog.Portal>
          <Dialog.Overlay class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center" />
          
          <Dialog.Content
            class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl p-8 w-11/12 max-w-lg max-h-[90vh] shadow-lg overflow-auto z-[100]"
          >
            <!-- Modal Header -->
            <div class="flex justify-between items-center border-b pb-4 mb-6">
              <h2 class="text-2xl font-bold text-blue-600">{feature.title}</h2>
              <Dialog.Close asChild>
              </Dialog.Close>
            </div>
            
            <!-- Modal Content -->
            <div>
              <img src={feature.image} alt={feature.title} class="w-full h-48 object-cover rounded-xl mb-4 shadow-sm"/>
              <p class="text-gray-700 leading-relaxed whitespace-pre-line mb-6">
                {feature.modalContent}
              </p>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    {/if}
  {/each}
</main>
