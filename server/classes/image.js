const cloudinary = require('cloudinary');

module.exports = class Gallary {
  static uploadImage(image, callback) {
    if (!image.path) {
      return callback('Image not found');
    }
    cloudinary.v2.uploader.upload(image.path, (error, uploadedImage) => {
      if (error) {
        return callback('Image failed to  upload');
      }
      return callback(
        null,
        uploadedImage.public_id + '.' + uploadedImage.format
      );
    });
  }

  static deleteImage(image) {
    const publicId = image.split('.')[0];
    cloudinary.v2.uploader.destroy(publicId, (error) => {
      if (error) {
        console.log(error);
      }
    });
  }

  static formatForUser(image) {
    return cloudinary
      .image(image, {
        secure: true,
        transformation: [
          { width: 500, height: 500, crop: 'fill' },
          {
            overlay: 'eooxancqx4ks2guozncs',
            x: 190,
            y: 190,
            width: 100,
            height: 100
          },
          {
            overlay: {
              font_family: 'Montaga',
              font_size: 15,
              font_weight: 'bold',
              text: 'Fahad Hossain'
            },
            color: '#fae669',
            y: -230,
            x: -180
          },
          { gravity: 'face' },
          { effect: 'improve:50' }
        ]
      })
      .split("'")[1];
  }
};
