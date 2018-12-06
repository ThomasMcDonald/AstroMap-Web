module.exports = function(models,controller, app, express, upload,sightengine) {
    console.log("Routes Module Loaded")


    app.post('/profile', upload.single('avatar'), function (req, res, next) {
      // req.file is the `avatar` file
      // req.body will hold the text fields, if there were any

      sightengine.check(['nudity','wad','properties','celebrities','offensive','faces']).set_file(req.file.path).then(function(result) {
        // The result of the API.
        console.log(result.status)
        if(result.status == "success" && result.nudity.safe > 0.80 && result.offensive.prob < 0.30){
        console.log(result);
        res.send({ success: true, message: 'Image Uploaded Successfully'});
      }
      }).catch(function(err) {
        // Error
        console.log(err);
          res.send({ success: false, message: 'Image Failed Upload'});
      });
      //console.log(req.file);

    })


};
