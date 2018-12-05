module.exports = function(models,controller, app, express, upload) {
    console.log("Routes Module Loaded")


    app.post('/profile', upload.single('avatar'), function (req, res, next) {
      // req.file is the `avatar` file
      // req.body will hold the text fields, if there were any
      console.log(req.file);
      res.send({ success: true, message: 'Image Uploaded Successfully'})
    })


};
