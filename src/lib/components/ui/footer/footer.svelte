<script lang="ts">
    import { fade } from 'svelte/transition'; // Import fade transition from Svelte
    import {
    Button,
    buttonVariants
    } from "$lib/components/ui/button/index.js";
    import * as Dialog from "$lib/components/ui/dialog/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
</script>

<footer class="relative bg-primary-dark text-white py-6 px-2 md:flex md:flex-col md:items-center md:py-0 md:pt-6 md:px-6">
    <div class="absolute inset-0 z-0">
        <!-- Use w-full and h-full to ensure the image covers the entire footer -->
        <img src="https://bfc-animal-clinic-and-grooming-center.site/imgs/cover.jpg" class="w-full h-full object-cover opacity-30" alt="Footer-Cover">
    </div>

    <div class="md:gap-8 relative z-10 md:mt-10 md:flex md:space-x-12 md:items-center md:justify-center">
        <div class="flex text-center flex-col items-center gap-4 mb-4 md:mb-0 md:gap-8 md:items-start">
            <div class="mt-4 md:mt-0 md:text-left">
                <h3 class="font-bold">ABOUT Us</h3>
                <p class="md:w-1/2">
                    We, at BFC Animal Clinic promote wellness and well-being for your furbabies,
                    prevent and treat diseases and illnesses.
                </p>
            </div>

            <div class="text-center md:items-start md:mt-0 md:text-left">
                <h3 class="font-bold">Contact Us</h3>
                <p>Phone: <a href="tel:+1234567890" class="hover:underline">+63 963 537 0126</a></p>
                <p>Email: <a href="mailto:info@bfcanimalclinic.com" class="hover:underline">info@bfcanimalclinic.com</a></p>
                <p>Address: PG3Q+943, National Rd, Balanga, Bataan</p>
            </div>
        </div>

        <div class="mt-6 flex flex-col items-center justify-between space-y-4 md:items-start md:gap-8">
            <div class="flex flex-col items-center md:items-start">
                <Dialog.Root>
                    <Dialog.Trigger  class="text-white hover:text-green-200 font-semibold transition duration-300 ease-in-out"
                     >Terms and Conditions</Dialog.Trigger
                    >
                    <Dialog.Content class="sm:max-w-[425px] overflow-y-auto h-4/5">
                     <Dialog.Header>
                      <Dialog.Title>Terms and Conditions</Dialog.Title>
                      <Dialog.Description>
                        <p style="text-align: justify;"><strong>1. Acceptance of Terms</strong><br>
                            By accessing and using EcoFare, you accept and agree to be bound by these Terms. If you do not agree with any part of these Terms, you must refrain from using the Service.</p>
                            
                            <p style="text-align: justify;"><strong>2. Account Registration</strong><br>
                            To use certain features of the Service, you may be required to create an account. You agree to provide accurate and complete information during the registration process and to maintain the currency of your account information.</p>
                            
                            <p style="text-align: justify;"><strong>3. Use of Service</strong><br>
                            You agree to use EcoFare solely for lawful purposes and in compliance with our guidelines. You must not misuse or exploit the Service, including but not limited to: engaging in fraudulent activities, submitting false or misleading information, attempting to reverse-engineer, hack, or access any part of the Service not intended for user access.</p>
                            
                            <p style="text-align: justify;"><strong>4. Points and Rewards</strong><br>
                            EcoFare allows users to earn points by recycling plastic bottles and other recyclable materials. Points may be redeemed for fare credits or other rewards as specified within the Service. EcoFare reserves the right to modify or discontinue the rewards program at any time, with or without prior notice.</p>
                            
                            <p style="text-align: justify;"><strong>5. Privacy and Data Security</strong><br>
                            Your privacy is of utmost importance to us. We collect and process personal data in accordance with our Privacy Policy. By using EcoFare, you consent to the collection and use of your personal information as outlined in the Privacy Policy.</p>
                            
                            <p style="text-align: justify;"><strong>6. Payment and Fees</strong><br>
                            EcoFare may offer paid services or transactions. All payments made through the Service must be processed using an approved payment method. By making a payment, you agree to pay the specified amount for the Service.</p>
                            
                            <p style="text-align: justify;"><strong>7. Termination</strong><br>
                            We reserve the right to suspend or terminate your account if you violate these Terms. You may also close your account at any time by contacting us through the Service.</p>
                            
                            <p style="text-align: justify;"><strong>8. Limitation of Liability</strong><br>
                            EcoFare shall not be held liable for any indirect, incidental, or consequential damages arising from your use of the Service, including the loss of points, data, or rewards.</p>
                            
                            <p style="text-align: justify;"><strong>9. Changes to Terms</strong><br>
                            EcoFare reserves the right to update or modify these Terms at any time. Any changes will be posted on this page, with the "Last Updated" date updated accordingly. You are encouraged to review these Terms regularly.</p>
                            
                            <p style="text-align: justify;"><strong>10. Governing Law</strong><br>
                            These Terms will be governed by and construed in accordance with the laws of the Philippines, without regard to its conflict of law principles.</p>
                            
                            <p style="text-align: justify;"><strong>11. Contact Information</strong><br>
                            If you have any questions or concerns regarding these Terms, please contact us at <a href="mailto:jericho.roque.platilla@apcas.ph.education" class="text-green-500 hover:text-green-700">jericho.roque.platilla@apcas.ph.education</a>.</p>                            
                      </Dialog.Description>
                     </Dialog.Header>
                     <Dialog.Footer>
                     </Dialog.Footer>
                    </Dialog.Content>
                   </Dialog.Root>
            </div>
        </div>
    </div>

    <div class="container relative py-4">
        <div class="flex flex-col items-center opacity-30 text-xs">
            <div class="w-full h-0.5 bg-gray-300 rounded-full mb-2"></div>
            © 2024 BFC Animal Clinic. All Rights Reserved Powered by:
            <a href="https://carldextertorio.com" target="_blank"><span class="font-bold">Carl Dexter Torio</span></a>
        </div>
    </div>
</footer>

<!--
<footer class="bg-green-700 text-white py-6 mt-8">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <p class="text-sm text-left">&copy; 2025 EcoFare. All rights reserved.</p>
        <div class="flex space-x-4">
            <button
                on:click={openModal}
                class="text-white hover:text-green-200 font-semibold transition duration-300 ease-in-out"
            >
                Terms and Conditions
            </button>
        </div>
    </div>
</footer>
-->

