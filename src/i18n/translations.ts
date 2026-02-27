export type Lang = "bg" | "en";
export type T = typeof translations.bg;

export const translations = {
  bg: {
    appName: "Construction SaaS",
    nav: {
      dashboard: "Табло",
      projects: "Обекти",
      transport: "Транспорт",
    },
    pages: {
      dashboard: "Табло",
      projects: "Обекти",
      transport: "Транспортни заявки",
      login: "Вход",
      email: "Имейл",
      password: "Парола",
      signIn: "Вход",
    },
  },
  en: {
    appName: "Construction SaaS",
    nav: {
      dashboard: "Dashboard",
      projects: "Projects",
      transport: "Transport",
    },
    pages: {
      dashboard: "Dashboard",
      projects: "Projects",
      transport: "Transport Requests",
      login: "Login",
      email: "Email",
      password: "Password",
      signIn: "Sign in",
    },
  },
} as const;