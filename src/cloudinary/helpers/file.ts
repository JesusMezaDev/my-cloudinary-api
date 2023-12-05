export const validateFileFormat = (fileName: string, allowedFileFormats: string[]) => {
    const extension = fileName.split('.').pop();
    return allowedFileFormats.includes(extension);
}