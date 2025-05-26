import bcrypt from "bcryptjs";
import {LoginRequest} from "~/types/AuthType";
import {User} from "~/server/models/User";
import {RefreshToken} from "~/server/models/RefreshToken";
import {generateToken, sendRefreshToken} from "~/server/utils/jwt";
import {ResponseHandler} from "~/server/utils/ResponseHandler";
import {ErrorHandler} from "~/server/utils/ErrorHandler";

export default defineEventHandler(async (event) => {
    try {
        const data: LoginRequest = await readBody(event);

        // Validasi input
        if (!data.email || !data.password) {
            setResponseStatus(event, 400);
            return {
                statusCode: 400,
                statusMessage: "Pastikan telah mengisi dengan benar dan lengkap.",
            };
        }


        // Cek apakah user ada
        const user = await User.getUserByEmail(data.email);
        if (!user) {
            setResponseStatus(event, 400);
            return {
                statusCode: 400,
                statusMessage: "Kesalahan Kradensial.",
            };
        }

        // Cek password
        const isPasswordValid = bcrypt.compareSync(data.password, user.password);
        if (!isPasswordValid) {
            setResponseStatus(event, 400);
            return {
                statusCode: 400,
                statusMessage: "Kesalahan Kradensial.",
            };
        }

        // Generate tokens
        const {refreshToken, accessToken} = generateToken({
            id: user.id,
            email: user.email,
            role: user.role,
        });

        const {password, ...userData} = user;

        // Simpan refresh token ke database
        await RefreshToken.create(user.id, refreshToken);

        // Set refresh token ke cookie
        sendRefreshToken(event, refreshToken);

        // Kirim respons sukses menggunakan ResponseHandler
        return ResponseHandler.sendSuccess(
            event,
            "Berhasil Masuk!",
            {
                access_token: accessToken,
                user: {
                    id: user.id,
                    email: user.email,
                    role: user.role,
                },
            },
            200
        );
    } catch (error: any) {
        return ErrorHandler.handleError(event, error);
    }
});
