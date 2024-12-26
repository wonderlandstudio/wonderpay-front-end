import { initPlasmicLoader } from "@plasmicapp/loader-react";

export const PLASMIC = initPlasmicLoader({
  projects: [],
  // Add your Plasmic project ID and API token here
  // You can find these in your Plasmic project settings
  preview: true,
});