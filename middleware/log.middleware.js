import fs from 'fs';
import path from 'path';
import { v2 as cloudinary } from 'cloudinary';
import { fileURLToPath } from 'url';
import { dirname } from 'path';


// Resolve directory path using import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const logFilePath = path.join(__dirname, 'requestLogs.txt');

const loggingMiddleware = async (req, res, next) => {
    if (req.method === 'POST') {
        try {
            const logData = `${new Date().toISOString()} - ${req.method} ${req.url} - Body: ${JSON.stringify(req.body)}\n`;
            console.log('Log data:', logData);

            // Append log data to file
            fs.appendFileSync(logFilePath, logData);

            // Upload file to Cloudinary
            const result = await cloudinary.uploader.upload(logFilePath, {
                resource_type: 'raw', // Treat the file as raw data
                public_id: 'request_logs', // Specify a public ID for Cloudinary
                overwrite: true // Overwrite if file with the same public ID already exists
            });
            
            console.log('File uploaded to Cloudinary:', result);
        } catch (error) {
            console.error('Error in logging middleware:', error);
        }
    }
    
    next();
};

export default loggingMiddleware;
