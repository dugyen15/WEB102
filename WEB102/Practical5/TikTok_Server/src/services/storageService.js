const supabase = require('../lib/supabase');

const VIDEOS_BUCKET = 'videos';
const THUMBNAILS_BUCKET = 'thumbnails';

const uploadVideo = async (fileBuffer, fileName, mimeType) => {
  const { data, error } = await supabase.storage
    .from(VIDEOS_BUCKET)
    .upload(fileName, fileBuffer, {
      contentType: mimeType,
      upsert: true
    });

  if (error) throw error;
  
  const { data: urlData } = supabase.storage
    .from(VIDEOS_BUCKET)
    .getPublicUrl(fileName);
    
  return { path: data.path, url: urlData.publicUrl };
};

const uploadThumbnail = async (fileBuffer, fileName, mimeType) => {
  const { data, error } = await supabase.storage
    .from(THUMBNAILS_BUCKET)
    .upload(fileName, fileBuffer, {
      contentType: mimeType,
      upsert: true
    });

  if (error) throw error;
  
  const { data: urlData } = supabase.storage
    .from(THUMBNAILS_BUCKET)
    .getPublicUrl(fileName);
    
  return { path: data.path, url: urlData.publicUrl };
};

const deleteVideo = async (filePath) => {
  const { error } = await supabase.storage
    .from(VIDEOS_BUCKET)
    .remove([filePath]);
    
  if (error) throw error;
};

const deleteThumbnail = async (filePath) => {
  const { error } = await supabase.storage
    .from(THUMBNAILS_BUCKET)
    .remove([filePath]);
    
  if (error) throw error;
};

module.exports = { uploadVideo, uploadThumbnail, deleteVideo, deleteThumbnail };