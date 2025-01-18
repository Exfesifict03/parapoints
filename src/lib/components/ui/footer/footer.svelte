<script lang="ts">
    let showModal = false;
  
    // Function to open the modal
    const openModal = () => {
      showModal = true;
    };
  
    // Function to close the modal
    const closeModal = () => {
      showModal = false;
    };
  </script>
  
  <footer class="bg-gray-800 text-white py-6 mt-8">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
      <p class="text-sm text-left">&copy; 2025 EcoFare. All rights reserved.</p>
      <div class="flex space-x-4">
        <button
          on:click={openModal}
          class="text-white hover:text-gray-200 font-semibold"
        >
          Terms and Conditions
        </button>
      </div>
    </div>
  </footer>
  
  <!-- Modal -->
  {#if showModal}
    <div class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div class="bg-white w-full max-w-md p-6 rounded-lg shadow-lg overflow-y-auto max-h-[90vh] relative">
        
        <!-- X Button to Close -->
        <button
          on:click={closeModal}
          class="absolute top-4 right-4 text-2xl text-gray-600 hover:text-gray-800 focus:outline-none"
        >
          &times;
        </button>
        
        <h1 class="text-2xl font-semibold text-center text-gray-800 mb-4">Terms and Conditions for EcoFare</h1>
        <p class="text-sm text-gray-700 mb-4"><strong>Last Updated:</strong> January 2025</p>
        
        <div class="text-gray-700 space-y-4 overflow-y-auto max-h-[75vh]">
          <p><strong>1. Acceptance of Terms</strong><br>
            By accessing and using EcoFare, you accept and agree to be bound by these Terms. If you do not agree with any part of these Terms, you must not use the Service.
          </p>
  
          <p><strong>2. Account Registration</strong><br>
            To use certain features of the Service, you may be required to create an account. You agree to provide accurate and complete information during the registration process and to keep your account information up to date.
          </p>
  
          <p><strong>3. Use of Service</strong><br>
            You agree to use EcoFare solely for lawful purposes and in accordance with our guidelines. You must not misuse or exploit the Service, including but not limited to: engaging in any fraudulent activity, submitting false or misleading information, attempting to reverse-engineer, hack, or access any part of the Service not intended for user access.
          </p>
  
          <p><strong>4. Points and Rewards</strong><br>
            EcoFare allows users to earn points by recycling plastic bottles and other recyclable materials. Points can be redeemed for fare credits or other rewards as specified within the Service. EcoFare reserves the right to modify or terminate the rewards program at any time, with or without notice.
          </p>
  
          <p><strong>5. Privacy and Data Security</strong><br>
            Your privacy is important to us. We collect and process personal data in accordance with our Privacy Policy. By using EcoFare, you consent to the collection and use of your personal information as described in the Privacy Policy.
          </p>
  
          <p><strong>6. Payment and Fees</strong><br>
            EcoFare may offer paid services or transactions. All payments made through the Service must be made using an approved payment method. By making a payment, you agree to pay the amount specified for the Service.
          </p>
  
          <p><strong>7. Termination</strong><br>
            We reserve the right to suspend or terminate your account if you violate these Terms. You may also close your account at any time by contacting us through the Service.
          </p>
  
          <p><strong>8. Limitation of Liability</strong><br>
            EcoFare will not be held liable for any indirect, incidental, or consequential damages arising from your use of the Service, including loss of points, data, or rewards.
          </p>
  
          <p><strong>9. Changes to Terms</strong><br>
            EcoFare reserves the right to update or modify these Terms at any time. Any changes will be posted on this page, and the "Last Updated" date will be updated accordingly. You are encouraged to review these Terms regularly.
          </p>
  
          <p><strong>10. Governing Law</strong><br>
            These Terms will be governed by and construed in accordance with the laws of the Philippines, without regard to its conflict of law principles.
          </p>
  
          <p><strong>11. Contact Information</strong><br>
            If you have any questions or concerns about these Terms, please contact us at 
            <a href="mailto:jericho.roque.platilla@apcas.ph.education" class="text-blue-500 hover:text-blue-700">
              jericho.roque.platilla@apcas.ph.education
            </a>.
          </p>
          
        </div>
      </div>
    </div>
  {/if}
  