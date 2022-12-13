function imageLoader({ src }) {
    return `/public/images/${src}`;
}

module.exports = imageLoader;