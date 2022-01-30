<script>
  import { setClient, mutation } from '@urql/svelte';
  import client from '../client';
  setClient(client);

  const loginMutation = mutation({
    query: `
      mutation ($email: String!, $password: String!) {
        login(email: $email, password: $password) {
          secret
          ttl
        }
      }
    `,
  });
  async function testLogin(e) {
    e.preventDefault();
    const resp = await loginMutation({ email: "test22@gmail.com", password: "test22@gmail.com" })
    console.log(resp.data);
  }
</script>

<div>
  <h3>Login Test</h3>
  <button on:click={testLogin}>Login Test</button>
</div>