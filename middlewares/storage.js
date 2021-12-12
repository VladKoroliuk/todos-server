import multer from 'multer'


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/img/avatars/')
    },
    filename: function (req, file, cb) {

      const fileObj = {
        "image/jpeg": ".jpeg",
        "image/jpg": ".jpg"
      }
        if(fileObj[file.mimetype] == undefined) {
            cb(new Error("file format not valid"))
        }else if(file.size < 5000000){
            cb(new Error("file format not valid"))
        }else{
            cb(null, file.originalname)
        }
      
    }
})

export default storage