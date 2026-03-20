export type Lang = 'bg' | 'en';
export type T = typeof translations.bg;

export const translations = {
    bg: {
        appName: 'Construction SaaS',
        nav: {
            dashboard: 'Табло',
            projects: 'Обекти',
            transport: 'Транспорт',
            createOrganization: 'Създай фирма',
        },
        pages: {
            dashboard: 'Табло',
            projects: 'Обекти',
            transport: 'Транспортни заявки',
            login: {
                title: 'Вход',
                email: 'Имейл',
                password: 'Парола',
                signIn: 'Вход',
                signingIn: 'Влизане...',
            },
            email: 'Имейл',
            password: 'Парола',
            signIn: 'Вход',
        },
        common: {
            logout: "Изход",
          },
    },
    en: {
        appName: 'Construction SaaS',
        nav: {
            dashboard: 'Dashboard',
            projects: 'Projects',
            transport: 'Transport',
            createOrganization: 'Create Organization',
        },
        pages: {
            dashboard: 'Dashboard',
            projects: 'Projects',
            transport: 'Transport Requests',
            login: {
                title: 'Login',
                email: 'Email',
                password: 'Password',
                signIn: 'Sign in',
                signingIn: 'Signing in...',
            },
            email: 'Email',
            password: 'Password',
            signIn: 'Sign in',
        },
        common: {
            logout: "Logout",
          },
    },
} as const;
