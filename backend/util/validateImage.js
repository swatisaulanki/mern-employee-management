// Define the image file validation function
module.exports = validateImage = (image) => {
    const imageRegex = /\.(jpg|png)$/i;
    return imageRegex.test(image);
};