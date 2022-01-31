<script>
  import { setClient, mutation } from '@urql/svelte';
  import Cookies from 'js-cookie';
  import client from '../client';
  import { userSession } from '../store';
  import { goto } from '$app/navigation';

  setClient(client);

  let error;

  const loginMutation = mutation({
    query: `
      mutation OwnerLogin($email: String!, $password: String!) {
        login(email: $email, password: $password) {
          secret
          ttl
          email
          ownerId
        }
      }
    `,
  });
  async function onSubmit(e) {
    const formData = new FormData(e.target);

    const data = {};
    for (let field of formData) {
      const [key, value] = field;
      data[key] = value;
    }
    const { email, password } = data;
    const resp = await loginMutation({ email, password })
    
    if(resp.data?.login) {
      alert('Login Successful');

      Cookies.set(
        'fauna-session', 
        JSON.stringify(resp.data.login),
        { expires: new Date(resp.data.login.ttl) }
      );

      userSession.update(() => (resp.data.login));

      goto('/')
    }
    if(resp.error) {
      error = resp.error?.message;
    }
  }
</script>

<div class="wrap">
  <div class="uk-card uk-card-default uk-card-body">
    <h3 class="uk-card-title">Login</h3>
    {#if error}
      <div class="uk-alert-danger" uk-alert style={{ maxWidth: '300px', padding: '10px'}}>
        {error}
      </div>
    {/if}
    <form on:submit|preventDefault={onSubmit} >
      <div class="uk-margin">
        <input 
          class="uk-input" 
          type="text" 
          placeholder="Email" 
          name="email"
        />
      </div>
        <div class="uk-margin">
          <input 
            class="uk-input" 
            type="password" 
            placeholder="Password" 
            name="password"
          />
        </div>
        <div class="uk-margin">
          <input class="uk-input" type="submit" />
        </div>
    </form>
  </div>
</div>

<style>
  .wrap {
    margin: 10% 40%;
    min-width: 300px;
  }
</style>