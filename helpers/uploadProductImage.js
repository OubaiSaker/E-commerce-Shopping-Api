const multer = require('multer');

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg') {
        cb(null, true)
    }
    else {
        cb(new Error('please upload jpeg image'), false)
    }
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
        const fileName = file.originalname;
        cb(null, fileName)
    }
})

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
})

module.exports = upload;