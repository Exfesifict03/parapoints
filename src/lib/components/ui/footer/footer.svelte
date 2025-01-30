<script lang="ts">
    import { fade } from 'svelte/transition'; 
    import {
    Button,
    buttonVariants
    } from "$lib/components/ui/button/index.js";
    import * as Dialog from "$lib/components/ui/dialog/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
    import { Mail, MapPin } from 'lucide-svelte'; 
</script>

<footer class="relative bg-blue-950 text-white py-12 px-8 md:px-16">
    <div class="absolute inset-0 z-0">
        <img src="/image/landing1.jpg" class="w-full h-full object-cover opacity-20" alt="Footer Background">
    </div>

    <div class="relative z-10 flex flex-col md:flex-row justify-between items-center md:items-start space-y-8 md:space-y-0 md:divide-x md:divide-gray-400">
        <!-- About Us -->
        <div class="text-center md:text-left max-w-xs px-4 md:px-6">
            <h3 class="font-semibold text-lg mb-2">About Us</h3>
            <p class="text-sm leading-relaxed">EcoFare is a web-based smart recycling system that turns waste into valuable points for fare and essentials.</p>
        </div>
    
        <!-- Contact Us -->
        <div class="text-center md:text-left max-w-xs px-4 md:px-6">
            <h3 class="font-semibold text-lg mb-2">Contact Us</h3>
            <div class="flex items-center gap-2 text-sm">
                <Mail class="w-4 h-4 text-gray-400" />
                <a href="mailto:jericho.roque.platilla@apcas.ph.education" class="hover:underline">
                    jericho.roque.platilla@apcas.ph.education
                </a>
            </div>
            <div class="flex items-center gap-2 text-sm mt-1">
                <MapPin class="w-4 h-4 text-gray-400" />
                <span>228 National Rd, Balanga, Bataan</span>
            </div>
        </div>
    
        <!-- Partnership -->
        <div class="text-center md:text-left flex flex-col items-center md:items-start max-w-md px-4 md:px-6">
            <h3 class="font-semibold text-lg mb-2">Partnership</h3>
            <div class="flex items-center gap-4">
                <img src="/image/coop.jpg" alt="Partner Logo" class="w-16 h-16 object-cover rounded-full shadow-lg">
                <p class="text-sm leading-relaxed">Partnering with Balanga-Orani Transport Service Multipurpose Cooperative to promote sustainable and efficient transportation.</p>
            </div>
        </div>
    </div>
    

    <!-- Terms and Conditions -->
    <div class="relative z-10 flex justify-center mt-6">
        <Dialog.Root>
            <Dialog.Trigger  class="text-white hover:text-cyan-200 font-semibold transition duration-300 ease-in-out"
             >Terms and Conditions</Dialog.Trigger
            >
            <Dialog.Content class="sm:max-w-[425px] overflow-y-auto h-4/5">
             <Dialog.Header>
              <Dialog.Title class="font-bold">Terms and Conditions</Dialog.Title>
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
                    If you have any questions or concerns regarding these Terms, please contact us at <a href="mailto:jericho.roque.platilla@apcas.ph.education" class="text-blue-500 hover:text-blue-700">jericho.roque.platilla@apcas.ph.education</a>.</p>                            
              </Dialog.Description>
             </Dialog.Header>
             <Dialog.Footer>
             </Dialog.Footer>
            </Dialog.Content>
           </Dialog.Root>
    </div>

    <!-- Copyright -->
    <div class="relative z-10 text-center text-xs text-gray-400 mt-8">
        <div class="w-full h-0.5 bg-gray-500 opacity-30 rounded-full mb-4"></div>
        <p>© 2024 EcoFare. All Rights Reserved | Powered by: 
            <a href="https://carldextertorio.com" target="_blank" class="font-bold text-gray-400 hover:text-cyan-200">Jericho Platilla / Joice Tolentino</a>
        </p>
    </div>
</footer>
