import { jwtDecode } from "jwt-decode";

export default () => {
    // State untuk token dan user
    const useAuthToken = () => useState<string | null>('auth_token');
    const useAuthTokenCookie = () => useCookie<string | null>('access_token');
    const useAuthUser = () => useState<any>('auth_user');
    const useUserRole = () => useCookie<string | null>('user_role');
    const isLoggedIn = () => useCookie<boolean>('isLoggedIn');

    // Menyimpan token ke state dan cookie
    const setToken = (newToken: string | null) => {
        useAuthToken().value = newToken;
        useAuthTokenCookie().value = newToken;
    };

    // Menyimpan data user
    const setUser = (newUser: any) => {
        useAuthUser().value = newUser;
        useUserRole().value = newUser?.role || null;
    };

    // Fungsi Login
    const login = async ({ email, password }: { email: string; password: string }) => {
        try {
            const response: any = await useFetchApi('/api/auth/login', {
                method: 'POST',
                body: { email, password },
            });

            console.log("Respons Login:", response);

            if (!response?.data.access_token) throw new Error("Login gagal");

            // Simpan token di localStorage
            localStorage.setItem("token", response.data.access_token);

            // Set token dan user
            setToken(response.data.access_token);
            setUser(response?.data?.profile);
            isLoggedIn().value = true;

            // Redirect ke halaman
            return navigateTo('/home-page');
        } catch (error) {
            console.error(error);
            throw new Error('Email atau kata sandi salah');
        }
    };

    // Fungsi Refresh Token
    const refreshToken = async () => {
        try {
            const response: any = await useFetchApi('/api/auth/refresh', { method: 'GET' });
            setToken(response?.data.access_token);
            return true;
        } catch (error) {
            await logout();
            throw error;
        }
    };

    // Mengambil Data User
    const getUser = async () => {
        try {
            const response: any = await useFetchApi('/api/profile', {method: 'GET', credentials: 'include'});
            setUser(response?.data?.profile);
            return true;
        }
        catch (error) {
            console.error("Error saat mengambil user:", error);
            throw error;
    }
    };

    // Memperbarui Token secara Berkala
    const reRefreshAccessToken = () => {
        const authToken = useAuthToken().value;
        if (!authToken) return;

        const jwt: any = jwtDecode(authToken);
        const newRefreshTime = jwt?.exp - 60000;

        setTimeout(async () => {
            await refreshToken();
            reRefreshAccessToken();
        }, newRefreshTime);
    };

    // Inisialisasi Autentikasi saat Aplikasi Dimuat
    const initAuth = async () => {
        try {
            if (!isLoggedIn().value) return;
            await refreshToken();
            await getUser();
            reRefreshAccessToken();
        } catch (error) {
            console.error(error);
        }
    };

    // Logout
    const logout = async () => {
        try {
            await useFetchApi('/api/auth/logout', { method: 'GET' });
        } catch (error) {
            console.error("Logout error:", error);
        } finally {
            // Hapus semua data autentikasi
            setToken(null);
            setUser(null);
            useUserRole().value = null;
            isLoggedIn().value = false;
            navigateTo('/auth/login');
        }
    };

    return {
        login,
        useAuthUser,
        useAuthToken,
        useAuthTokenCookie,
        useUserRole,
        initAuth,
        logout,
        isLoggedIn
    };
};