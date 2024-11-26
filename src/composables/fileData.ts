export const checkFileExtension = (fileName: string) => {
  if (
    fileName.includes('.png') ||
    fileName.includes('.jpg') ||
    fileName.includes('.webp') ||
    fileName.includes('.jpeg')
  )
    return 'ph:image-bold'
  else return 'tabler:file'
}
