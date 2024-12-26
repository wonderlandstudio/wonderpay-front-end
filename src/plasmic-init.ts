import { initPlasmicLoader } from "@plasmicapp/loader-react";

export const PLASMIC = initPlasmicLoader({
  projects: [
    {
      id: "d8QwHC2mX9hhyJO4b6QhTXJSz8KeFcYdUdE0xTjMXp313qdoyzZVAFttkzqSfnGOofWpNEug68jRE3ShlUA",
      token: "your-api-token" // You can remove this if your project is public
    }
  ],
  // Fetches the latest revisions, whether or not they were unpublished!
  // Disable for production to ensure you render only published changes.
  preview: true
});