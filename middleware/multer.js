const multer = require('multer')

// multer configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    }

})

// file type filtering
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        cb(null, true)
    } else {
        return cb (new Error('only image files are allowed'))
    }
}

const multerConfig = multer({
    storage: storage,
    fileFilter: fileFilter
})

module.exports = multerConfig