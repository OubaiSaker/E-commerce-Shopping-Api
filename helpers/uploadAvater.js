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
        cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
        const ext = file.mimetype.split('/')[1];
        const fileName = `${Math.round(Math.random() * 1E9)}-${Date.now()}.${ext}`;
        cb(null, fileName)
    }
})

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
})

module.exports = upload;