var express = require('express');
var cors = require('cors');
const multer = require('multer');
const bodyParser = require('body-parser');
const path = require('path');


var app = express();
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });


app.post("/api/fileanalyse",upload.single('upfile'), (req, res)=>{
const fileDetails={
  name:req.file.originalname,
  type:req.file.mimetype,
  size:req.file.size
}
res.json(fileDetails)
})
app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});




const port = process.env.PORT || 9000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
