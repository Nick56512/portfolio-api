import { extname } from "path";

export function getFileName(originalName: string) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const uploadedFileName = uniqueSuffix + extname(originalName);
    return uploadedFileName
}