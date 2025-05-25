import {Readable} from 'stream';
import cloudinary from '~/server/config/cloud';

// Tipe data untuk parameter yang digunakan pada upload file
interface UploadFileOptions {
    fileBuffer: Buffer;
    filename: string;
    mimeType: string;
}

// Tipe data untuk hasil upload
interface UploadResult {
    public_id: string;
    version: number;
    signature: string;
    width: number;
    height: number;
    format: string;
    resource_type: string;
    url: string;
    secure_url: string;
    created_at: string;
    // Properti tambahan jika diperlukan
}

// Fungsi upload file buffer ke Cloudinary
export const uploadFile = async ({ fileBuffer, filename, mimeType }: UploadFileOptions): Promise<UploadResult> => {
    try {
        return await new Promise<UploadResult>((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    resource_type: "auto",
                    public_id: filename,
                    format: mimeType.split("/")[1] || "jpg",
                    asset_folder: "kozy-hive",
                },
                (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        result ? resolve(result) : reject(new Error("Upload failed: result is undefined"));
                    }
                }
            );

            const bufferStream = Readable.from(fileBuffer);
            bufferStream.pipe(uploadStream);
        });
    } catch (error) {
        throw error;
    }
};
