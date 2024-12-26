import { initPlasmicLoader } from "@plasmicapp/loader-react";

export const PLASMIC = initPlasmicLoader({
  projects: [
    {
      id: "d8QwHC2mX9hhyJO4b6QhTXJSz8KeFcYdUdE0xTjMXp313qdoyzZVAFttkzqSfnGOofWpNEug68jRE3ShlUA",
      // No token needed for public projects
    }
  ],
  // Fetches the latest revisions, whether or not they were unpublished!
  // Disable for production to ensure you render only published changes.
  preview: process.env.NODE_ENV === 'development'
});