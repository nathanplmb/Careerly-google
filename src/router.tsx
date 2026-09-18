import "./lib/polyfills";
import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

const sharedQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      gcTime: 300_000,
      refetchOnWindowFocus: false,
    },
  },
});

export const getRouter = () => {
  const router = createRouter({
    routeTree,
    context: { queryClient: sharedQueryClient },
    scrollRestoration: true,
    defaultPreload: false,
    defaultPreloadDelay: 300,
    defaultPreloadStaleTime: 120_000,
  });

  return router;
};
