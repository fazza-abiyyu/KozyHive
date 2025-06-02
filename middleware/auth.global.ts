export default defineNuxtRouteMiddleware((to, from) => {
    const isAuthenticated = useCookie('isLoggedIn').value;

    const userRole = useCookie("user.role").value ?? "TENANT"; // Default ke TENANT jika tidak ada


    // Daftar halaman publik yang bisa diakses siapa saja
    const publicPages = ['/auth/login', '/auth/register', '/home-page', '/browser', '/properties/:id'];

    if (publicPages.includes(to.path)) return; // Jika halaman publik, lanjutkan

    if (!isAuthenticated) {
        return navigateTo('/auth/login', { redirectCode: 302 });
    }

    // Jika halaman punya meta.role, cek apakah pengguna sesuai
    if (to.meta.role && to.meta.role !== userRole) {
        return navigateTo('/unauthorized'); // Redirect jika tidak sesuai
    }
});
