import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { authStore } from "@/store/authStore";

export const authorizeToken: (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => void = (to, from, next) => {
  const store = authStore();
  if (to.path !== '/login' && !store.$state.userInfo) {
    next('/login');
  } else {
    next();
  }
};