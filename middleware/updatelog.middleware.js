import cloudinary from 'cloudinary'


const updateAndUploadLog = async (req,res,next) => {
    try {
        if (req.method === 'POST') {
            // Log request details to console
            const logData = `${new Date().toISOString()} - ${req.method} ${req.url} - Body: ${JSON.stringify(req.body)}\n`;
            console.log('Log data:', logData);

            // Read current content of requestLogs.txt
            const currentContent = await fs.promises.readFile(logFilePath, 'utf8');
            
            // Append new log data
            const updatedContent = currentContent + logData;

            console.log(updateAndUploadLog)

            // Write updated content to temp_requestLogs.txt
            await fs.promises.writeFile(tempFilePath, updatedContent);
            console.log('Updated content written to temp_requestLogs.txt');

            // Upload temp_requestLogs.txt to Cloudinary
            const result = await cloudinary.uploader.upload(tempFilePath);
            console.log('File uploaded to Cloudinary:', result);
        }
    } catch (error) {
        console.error('Error updating log file or uploading to Cloudinary:', error);
    }

    next(); // Move to the next middleware or route handler
};


export default updateAndUploadLog