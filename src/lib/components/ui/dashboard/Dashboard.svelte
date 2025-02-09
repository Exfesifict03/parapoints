<script lang="ts">
    import { Store, ShoppingBasket, Box, ClockArrowUpIcon, PackageCheckIcon, PhilippinePeso, Gift, User, Users, PinIcon, PhilippinePesoIcon } from 'lucide-svelte';
    export let title: string;
    export let value: string;
    export let icon: string;
    export let color: string;
  
    let IconComponent;
    switch (icon) {
      case '1':
        IconComponent = Store;
        break;
      case '2':
        IconComponent = User;
        break;
      case '3':
        IconComponent = Users;
        break;
        case '4':
        IconComponent = Gift;
        break;
        case '5':
        IconComponent = PinIcon;
        break;
        case '6':
        IconComponent = ShoppingBasket;
        break;
        case '7':
        IconComponent = Box;
        break;
        case '8':
      default:
        IconComponent = PhilippinePeso; 
    }
  </script>
  
  <div class={`p-6 bg-gradient-to-r from-${color}-300 to-${color}-500 rounded-xl shadow-lg flex items-center space-x-4 hover:shadow-2xl transition-all duration-300`}>
    <div class={`p-4 bg-red-900 text-${color}-500 rounded-full shadow-lg`}>
      <IconComponent class="h-5 w-5 text-white" />
    </div>
    <div class="flex flex-col">
      <h3 class="text-sm font-semibold text-gray-500 uppercase">{title}</h3>
      <p class="text-2xl font-bold text-black">{value}</p>
    </div>
  </div>