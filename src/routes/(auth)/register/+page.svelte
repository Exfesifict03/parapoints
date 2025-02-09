<script lang="ts">
    import * as Form from '$lib/components/ui/form';
    import { Input } from '$lib/components/ui/input';
    import { zod, zodClient } from 'sveltekit-superforms/adapters';
    import { defaults, superForm } from 'sveltekit-superforms';
    import { registerSchema } from '$lib/zod-schema';
    import { toast, Toaster } from 'svelte-sonner';
  
    const form = superForm(defaults(zod(registerSchema)), {
          validators: zodClient(registerSchema),
          resetForm: false,
          onResult({ result }) {
              if (result.type === 'failure') {
                  toast.error('Account Cannot Register.');
              } else if (result.type === 'success') {
                  toast.success('Register successfully!');
          window.location.href = '/login';
              }
          }
      });
  
      const { form: formData, enhance } = form;

  </script>
  
  <main class="min-h-screen bg-gray-50 flex items-center justify-center">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <Toaster position="top-center"  />
      <form method="POST" use:enhance action="?/register">
        <div class="space-y-6">
          <div class="space-y-2 text-center">
            <div class="text-4xl font-bold">Register</div>
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
            
            <Form.Field {form} name="firstname">
              <Form.Control let:attrs>
                <Input 
                  {...attrs} 
                  type="text"
                  bind:value={$formData.firstname} 
                  placeholder="Firstname"
                  class="w-full"
                />
              </Form.Control>
              <Form.FieldErrors class="text-sm text-red-500 mt-1" />
            </Form.Field>
            
            <Form.Field {form} name="middlename">
              <Form.Control let:attrs>
                <Input 
                  {...attrs} 
                  type="text"
                  bind:value={$formData.middlename} 
                  placeholder="Middlename"
                  class="w-full"
                />
              </Form.Control>
              <Form.FieldErrors class="text-sm text-red-500 mt-1" />
            </Form.Field>
  
            <Form.Field {form} name="lastname">
              <Form.Control let:attrs>
                <Input 
                  {...attrs} 
                  type="text"
                  bind:value={$formData.lastname} 
                  placeholder="Lastname"
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
            <div class="text-sm text-gray-600 space-y-1">
              <p>Password must:</p>
              <ul class="list-disc pl-5 space-y-1">
                <li>Be at least 6 characters long</li>
                <li>Contain at least one uppercase letter</li>
                <li>Contain at least one number</li>
              </ul>
            </div>
          </div>
          <Form.Button class="w-full bg-gray-900 hover:bg-blue-900">Register</Form.Button>
        </div>
      </form>
      <p class="text-center text-gray-600 text-sm mt-4">
        Already have an account? <a href="/login" class="text-blue-600 hover:underline">Login</a>
      </p>
    </div>
  </main>