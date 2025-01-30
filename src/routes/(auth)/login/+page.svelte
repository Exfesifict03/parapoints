<script lang="ts">
    import * as Form from '$lib/components/ui/form';
    import { Input } from '$lib/components/ui/input';
    import { zod, zodClient } from 'sveltekit-superforms/adapters';
    import { defaults, superForm } from 'sveltekit-superforms';
    import { loginSchema } from '$lib/zod-schema';
    import { toast, Toaster } from 'svelte-sonner';
    import { Button } from '$lib/components/ui/button';
    import Navbar from "$lib/components/ui/navbar/navbar.svelte";
    import Footer from '$lib/components/ui/footer/footer.svelte';
  
    const form = superForm(defaults(zod(loginSchema)), {
          validators: zodClient(loginSchema),
          resetForm: false,
          onResult({ result }) {
              if (result.type === 'failure') {
                  toast.error('Invalid email or password.');
              } else if (result.type === 'success') {
                  toast.success('Login successfully!');
                  window.location.href = '/user/home';
              }
          }
      });
  
    const { form: formData, enhance} = form;
  </script>
  
  <Navbar />
  <main class="min-h-screen bg-gray-50 flex items-center justify-center">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <Toaster />
        <form method="POST" use:enhance action="?/login">
            <div class="space-y-6">
                <div class="space-y-2 text-center">
                    <div class="text-4xl font-bold">Login</div>
                    <div class="text-muted-foreground">Enter your account details</div>
                </div>
                <div class="space-y-4">
                    <Form.Field {form} name="email">
                        <Form.Control let:attrs>
                            <Input 
                                {...attrs} 
                                type="email"
                                bind:value={$formData.email} 
                                placeholder="Email"
                                class="w-full"
                            />
                        </Form.Control>
                        <Form.FieldErrors class="text-sm text-red-500 mt-1" />
                    </Form.Field>
                    
                    <Form.Field {form} name="password">
                        <Form.Control let:attrs>
                            <Input 
                                {...attrs} 
                                type="password"
                                bind:value={$formData.password} 
                                placeholder="Password"
                                class="w-full"
                            />
                        </Form.Control>
                        <Form.FieldErrors class="text-sm text-red-500 mt-1" />
                    </Form.Field>
                </div>
                <Form.Button class="w-full bg-gray-900 hover:bg-blue-900">Login</Form.Button>
            </div>
        </form>
        <p class="text-center text-gray-600 text-sm mt-4">
            Don't have an account? <a href="/register" class="text-blue-600 hover:underline">Sign up</a>
        </p>
    </div>
  </main>
  <Footer />