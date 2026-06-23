import {
  type Config,
} from '@lib/util';

export type Auth0User = {
  nickname: string | null;
  name: string | null;
  picture: string | null;
  email: string;
};

export const fetchAuth0User = async (
  userId: string,
  config: Config,
): Promise<Auth0User> => {

  const tokenRes = await fetch(`${config.AUTH_DOMAIN}/oauth/token`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      client_id: config.AUTH_CLIENT_ID,
      client_secret: config.AUTH_CLIENT_SECRET,
      audience: `${config.AUTH_DOMAIN}/api/v2/`,
      grant_type: 'client_credentials',
    }),
  });

  const tokenJson = await tokenRes.json();

  if (!tokenRes.ok) {
    console.log('Auth0 token error:', tokenJson);
    throw new Error('Failed to get Auth0 management token');
  }

  const access_token = tokenJson.access_token;

  const userRes = await fetch(
    `${config.AUTH_DOMAIN}/api/v2/users/${encodeURIComponent(userId)}`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    },
  );

  const user = await userRes.json();

  if (!userRes.ok) {
    console.log('Auth0 user error:', user);
    throw new Error('Failed to fetch Auth0 user');
  }

  return {
    nickname: user.nickname ?? null,
    name: user.name ?? null,
    picture: user.picture ?? null,
    email: user.email ?? '',
  };
};