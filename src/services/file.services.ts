import { createReadStream, createWriteStream } from 'fs';
import path from 'path';

export const saveFileStream = (filePath: string, fileName: string): Promise<string> => {
    console.log('Uploading File', fileName);
    return new Promise((resolve, reject) => {
        const savePath = path.join(__dirname, '../../uploads', fileName);
        const writeStream = createWriteStream(savePath);

        writeStream.on("drain", () => {
            const written = writeStream.bytesWritten;
            console.log("Bytes Written:", written);
        })
        writeStream.on('finish', () => resolve(savePath));
        writeStream.on('error', (err) => reject(err));

        // Pipe the file stream into the write stream
        const readable = createReadStream(filePath);
        readable.pipe(writeStream);
    });
};
