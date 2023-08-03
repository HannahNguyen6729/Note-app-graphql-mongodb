import { GRAPHQL_SERVER_URL } from './constants';

export const graphqlRequest = async (payload, options = {}) => {
  const res = await fetch(`${GRAPHQL_SERVER_URL}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      ...options,
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  return data;
};
