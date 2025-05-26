export default defineNuxtRouteMiddleware((to, from) => {
    const isAuthenticated = useCookie('isLoggedIn').value; // Cek status login

    // Jika pengguna sudah login, arahkan ke home-page
    if (isAuthenticated) {
        return navigateTo('/home-page');
    }
});
