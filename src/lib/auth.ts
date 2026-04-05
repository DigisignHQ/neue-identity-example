import { betterAuth } from "better-auth";
import { genericOAuth } from "better-auth/plugins";
import { nanoid } from "nanoid";

export const auth = betterAuth({
  baseURL: "http://localhost:3000/",
  plugins: [
    genericOAuth({
      config: [
        {
          providerId: "neue-identity",
          clientId: process.env.CLIENT_ID as string,
          clientSecret: process.env.CLIENT_SECRET as string,
          discoveryUrl: process.env.DISCOVERY_URL as string,
          scopes: [
            "openid",
            "email",
            "profile",
            "urn:biometrics:verify:ng.nin|ng.bvn",
            "urn:biometrics:read:ng.nin",
            "urn:biometrics:read:ng.bvn",
          ],
          pkce: true,
          responseMode: "query",
          prompt: "consent",
          authorizationUrlParams: () => ({
            auth_context: "login",
            ui_locales: "en",
            nonce: nanoid(32),
          }),
        },
      ],
    }),
  ]
});
