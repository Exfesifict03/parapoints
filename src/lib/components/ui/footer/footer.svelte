<script lang="ts">
    import { page } from '$app/stores';
    import { fade } from 'svelte/transition';
    import {
        Button,
        buttonVariants
    } from "$lib/components/ui/button/index.js";
    import * as Dialog from "$lib/components/ui/dialog/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
    import { Mail, MapPin } from 'lucide-svelte';

    // Check if the current page is under the "admin" path
    let hideFooter = false;
    $: hideFooter = $page.url.pathname.startsWith('/admin');
</script>

{#if !hideFooter}
<footer class="relative bg-blue-950 text-white py-12 px-8 md:px-16">
    <div class="absolute inset-0 z-0">
        <img src="/image/landing1.jpg" class="w-full h-full object-cover opacity-20" alt="Footer Background">
    </div>

    <div class="relative z-10 flex flex-col md:flex-row justify-between items-center md:items-start space-y-8 md:space-y-0 md:divide-x md:divide-gray-400">
        <!-- About Us -->
        <div class="text-center md:text-left max-w-xs px-4 md:px-6">
            <h3 class="font-semibold text-lg mb-2 text-cyan-300">About Us</h3>
            <p class="text-sm leading-relaxed text-gray-300">EcoFare is a web-based smart recycling system that turns waste into valuable points for fare and essentials.</p>
        </div>

        <!-- Contact Us -->
        <div class="text-center md:text-left max-w-xs px-4 md:px-6">
            <h3 class="font-semibold text-lg mb-2 text-cyan-300">Contact Us</h3>
            <div class="flex items-center gap-2 text-sm text-gray-300">
                <Mail class="w-4 h-4 text-gray-400" />
                <a href="mailto:jericho.roque.platilla@apcas.ph.education" class="hover:underline transition duration-300 ease-in-out hover:text-cyan-200">
                    jericho.roque.platilla@apcas.ph.education
                </a>
            </div>
            <div class="flex items-center gap-2 text-sm mt-1 text-gray-300">
                <MapPin class="w-4 h-4 text-gray-400" />
                <span>228 National Rd, Balanga, Bataan</span>
            </div>
        </div>

        <!-- Partnership -->
        <div class="text-center md:text-left flex flex-col items-center md:items-start max-w-md px-4 md:px-6">
            <h3 class="font-semibold text-lg mb-2 text-cyan-300">Partnership</h3>
            <div class="flex items-center gap-4">
                <img src="/image/coop.jpg" alt="Partner Logo" class="w-16 h-16 object-cover rounded-full shadow-lg transform transition-all hover:scale-105">
                <p class="text-sm leading-relaxed text-gray-300">Partnering with Balanga-Orani Transport Service Multipurpose Cooperative to promote sustainable and efficient transportation.</p>
            </div>
        </div>
    </div>

    <!-- Terms and Conditions -->
    <div class="relative z-10 flex justify-center mt-6">
        <Dialog.Root>
            <Dialog.Trigger class="text-white hover:text-cyan-200 font-semibold transition duration-300 ease-in-out">
                Terms and Conditions
            </Dialog.Trigger>
            <Dialog.Content class="sm:max-w-[425px] overflow-y-auto h-4/5 bg-white rounded-lg p-6 shadow-lg">
                <Dialog.Header>
                    <Dialog.Title class="font-bold text-blue-800">Terms and Conditions</Dialog.Title>
                    <Dialog.Description class="text-gray-600 text-sm leading-relaxed">
                        <p class="mb-4"><strong>1. Acceptance of Terms</strong><br>By accessing and using EcoFare, you accept and agree to be bound by these Terms. If you do not agree, refrain from using the service.</p>
                        <p class="mb-4"><strong>2. Account Registration</strong><br>You agree to provide accurate and up-to-date information when registering.</p>
                        <p class="mb-4"><strong>3. Use of Service</strong><br>EcoFare must be used solely for lawful purposes.</p>
                        <p class="mb-4"><strong>4. Points and Rewards</strong><br>Users can earn points by recycling, which can be redeemed for fare credits or other rewards.</p>
                        <p class="mb-4"><strong>5. Privacy and Data Security</strong><br>Your data is collected according to our Privacy Policy.</p>
                        <p class="mb-4"><strong>6. Payment and Fees</strong><br>Transactions within EcoFare may require approved payment methods.</p>
                        <p class="mb-4"><strong>7. Termination</strong><br>We reserve the right to suspend or terminate accounts that violate these terms.</p>
                        <p class="mb-4"><strong>8. Limitation of Liability</strong><br>EcoFare is not responsible for indirect or incidental damages.</p>
                        <p class="mb-4"><strong>9. Changes to Terms</strong><br>These terms may be updated, and users are encouraged to review them periodically.</p>
                        <p class="mb-4"><strong>10. Governing Law</strong><br>These Terms are governed by the laws of the Philippines.</p>
                        <p><strong>11. Contact Information</strong><br>For inquiries, email us at <a href="mailto:jericho.roque.platilla@apcas.ph.education" class="text-blue-500 hover:text-blue-700">jericho.roque.platilla@apcas.ph.education</a>.</p>
                    </Dialog.Description>
                </Dialog.Header>
            </Dialog.Content>
        </Dialog.Root>
    </div>

    <!-- Copyright -->
    <div class="relative z-10 text-center text-xs text-gray-400 mt-8">
        <div class="w-full h-0.5 bg-gray-500 opacity-30 rounded-full mb-4"></div>
        <p>© 2024 EcoFare. All Rights Reserved | Powered by: 
            <a href="https://carldextertorio.com" target="_blank" class="font-bold text-gray-400 hover:text-cyan-200 transition duration-300 ease-in-out">Jericho Platilla / Joice Tolentino</a>
        </p>
    </div>
</footer>
{/if}
