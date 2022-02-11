/* Copyright Fauna, Inc.
SPDX-License-Identifier: MIT-0 */

import { createClient } from '@urql/svelte';

export default createClient({
  
  /**
    Uncomment the appropriate line according to the
    region group where you created your database.
  **/

	//url: https://graphql.eu.fauna.com/graphql
  //url: https://graphql.us.fauna.com/graphql

  url: `https://graphql.us.fauna.com/graphql`,

  fetchOptions: () => {
    const token = import.meta.env.VITE_PUBLIC_FAUNA_KEY;
    return {
      headers: { authorization: token ? `Bearer ${token}` : '' },
    };
  },
}); 


export const clientWithCookieSession = token => createClient({
  url: 'https://graphql.us.fauna.com/graphql',
  fetchOptions: () => {
    console.log('token', token);
    return {
      headers: { authorization: token ? `Bearer ${token}` : '' },
    };
  },
});