import express from "express";
import bodyParser from "body-parser";

import userModel from "./models/user.js";

const port = 3000;
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/read", async(req, res) => {
   let allusers =  await userModel.find()
  res.render("read.ejs", {users : allusers});
});

app.get("/find", async(req, res) => {
  let useress = await userModel.find();
  res.send(useress);
})

// app.get('/update', async (req, res) => {
//   // findoneupdates syntax(findone, update, {new: true})
//   let usermodelupdated = await userModel.findOneAndUpdate(

//       // findone
//   {
//       image: 'https://cdn.pixabay.com/photo/2023/12/11/12/51/lynx-8443540_1280.jpg'
//   },
//   // update
//   {
//       image:'https://cdn.pixabay.com/photo/2023/09/29/14/58/road-8284023_1280.jpg'
//   },

//   {new: true}

//  )
//   console.log("updated the image")
//   res.send(usermodelupdated)
// })


app.get("/delete-all", async(req, res) => {
  await userModel.deleteMany({});
  res.send("All users deleted successfully");
})


app.get("/delete/:id", async(req, res) => {
 await userModel.findOneAndDelete({_id:req.params.id});
  res.redirect('/read')

})




app.get('/edit/:id', async(req, res) => {
  let user = await userModel.findOne({_id:req.params.id});
  res.render('edit.ejs', {user});
})

app.post("/update/:id", async(req, res) => {
  let {image, name, email} = req.body;
  await userModel.findOneAndUpdate({_id:req.params.id}, {image, name, email} , {new: true});
  res.redirect('/read')
})


app.post("/create", async (req, res) => {
    let { name, email, image } = req.body;
  let createdUser = await userModel.create({
    // name: name,
    // email: email,
    // image: image

    // Alternative way using Mongoose
    name,
    email,
    image,
  });
  res.redirect('/read');
});

app.listen(port, (req, res) => {
  console.log(`Server is running on port ${port}`);
});
