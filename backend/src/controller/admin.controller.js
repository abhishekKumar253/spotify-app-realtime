import cloudinary from '../lib/cloudinary.js';
import { Album } from '../models/album.model.js';
import { Song } from '../models/song.model.js';

const uploadTocloudinary = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      resource_type: 'auto'
    });
    return result.secure_url;
  } catch (error) {
    console.log('Error in uploadTocloudinary', error);
    throw new Error('Error uploading file to cloudinary');
  }
};

export const craeteSong = async (req, res, next) => {
  try {
    if (!req.files || !req.files.audioFile || !req.files.imageFile) {
      return res.status(400).json({ message: 'Please upload all files' });
    }

    const { title, artist, albumId, duration } = req.body;
    const audioFile = req.files.audioFile;
    const imageFile = req.files.imageFile;

    const audioUrl = await uploadTocloudinary(audioFile);
    const imageUrl = await uploadTocloudinary(imageFile);

    const song = new Song({
      title,
      artist,
      audioUrl,
      imageUrl,
      duration,
      albumId: albumId || null
    });

    await song.save();

    if (albumId) {
      await Album.findByIdAndUpdate(albumId, {
        $push: { songs: song._id }
      });
    }
    res.status(201).json({
      message: 'Song created successfully',
      song
    });
  } catch (error) {
    console.log('Error in createSong:', error);
    next(error);
  }
};

export const deleteSong = async (req, res, next) => {
  try {
    const { id } = req.params;
    const song = await Song.findById(id);

    if (song.albumId) {
      await Album.findByIdAndUpdate(song.albumId, {
        $pull: { songs: song._id }
      });
    }

    await Song.findByIdAndDelete(id);

    res.status(200).json({ message: 'Song deleted Successfully' });
  } catch (error) {
    console.log('Error in deleteSong:', error);
    next(error);
  }
};

export const createAlbum = async (req, res, next) => {
  try {
    const { title, artist, releaseYear } = req.body;
    const { imageFile } = req.files;

    const imageUrl = await uploadTocloudinary(imageFile);

    const album = new Album({
      title,
      artist,
      imageUrl,
      releaseYear
    });

    await album.save();

    res.status(201).json(album);
  } catch (error) {
    console.log('Error in createAlbum', error);
    next(error);
  }
};

export const deleteAlbum = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Song.deleteMany({ albumId: id });
    await Album.findByIdAndDelete(id);
    res.status(200).json({ message: 'Album deleted successfully' });
  } catch (error) {
    console.log('Error in deleteAlbum', error);
    next(error);
  }
};

export const checkAdmin = async (req, res, next) => {
  res.status(200).json({ admin: true });
};