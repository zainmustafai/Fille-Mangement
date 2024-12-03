import { Request, Response } from 'express';
import { IncomingForm } from 'formidable';
import { saveFileStream } from "../services/file.services";

export const uploadFiles = async (req: Request, res: Response) => {
    const form = new IncomingForm({ multiples: true, uploadDir: './uploads' });

    try {
        form.parse(req, async (err, fields, files) => {
            if (err) {
                return res.status(500).json({ message: 'Error parsing form data', error: err });
            }
            const uploadResults: string[] = [];
            const fileArray = Array.isArray(files.file) ? files.file : [files.file];

            for (const file of fileArray) {

                if (file) {
                    console.log(file.originalFilename);
                    const { filepath, originalFilename } = file;
                    const savedPath = await saveFileStream(filepath, originalFilename || 'unknown');
                    uploadResults.push(savedPath);
                }
            }

            res.status(200).json({ message: 'Files uploaded successfully', paths: uploadResults });
        });
    } catch (error) {
        res.status(500).json({ message: 'Error uploading files', error });
    }
};
