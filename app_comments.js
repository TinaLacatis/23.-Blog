const express = require("express");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require('mongoose');

const homeStartingContentText = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
// challange 11 - create new empty array for blog posts
//let posts = [];

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
// challange database
mongoose.connect("mongodb://localhost:27017/blogDB");

const postSchema = mongoose.Schema({
  title: String,
  content: String
});
const Post = mongoose.model("Post", postSchema);

//challange 1 - new page
app.get("/", function(req, res) {
  //challange database
  Post.find({}, function(err, posts){
    res.render("home",{
      homeStartingContent: homeStartingContentText,
      posts: posts
    });
  });
  //challange 3: key:value, show the content of home.ejs + challange 12, content from the new blog post
  // res.render("home", {
  //   homeStartingContent: homeStartingContentText,
  //   blogPost: post
  // });
  //challange 11
  //console.log(posts);
});

//challange 4 - new page
app.get("/about", function(req, res) {
  res.render("about", {
    aboutContent: aboutContent
  });
});

//challange 4 - new page
app.get("/contact", function(req, res) {
  res.render("contact", {
    contactContent: contactContent
  });
});
//challange 7 - new page
app.get("/compose", function(req, res) {
  res.render("compose");
});

app.post("/compose", function(req, res) {
  // challange database
  const post = new Post({
    title: req.body.newTitle,
    content: req.body.newText
  });
  post.save()

//challange 10 - new object that contains the title and text of the new post
  // const post = {
  //   titleBlog: req.body.newTitle,
  //   textBlog: req.body.newText
  // };
  // posts.push(post); //challange 11 - push the new post content into the new array
  res.redirect("/"); //challange 11 - redirect to the home page
  //console.log(req.body.newTitle);// challange 8 - console log the text of the input
});

app.get('/posts/:postId', (req, res) => {// challange 16 logs the title of the post from the URL
  // challange database
  const requestedPostId = req.params.postId;
  Post.findOne({_id: requestedPostId}, function(err,post){
    res.render("post",{
      title: post.title,
      content: post.content
    });
  });
  //console.log(req.params.postName);
  //challange 17 - check if the titles are the same
  //const urlTitle = _.lowerCase(req.params.postName);//the title from URL --- challange 18 - TITLE to lower case
  // posts.forEach(function(post){//we look into the posts array
  //   const storedTitle = _.lowerCase(post.titleBlog);//the title of the array --- challange 18
  //   if(urlTitle === storedTitle){
  //     res.render("post", {//chalange 19 - go to the new page and see the content of that post from the home page
  //       postTitle: post.titleBlog,//chalange 19
  //       postText: post.textBlog//chalange 19
  //     });

    //   console.log("Match found!"); // challange 17
    // } else {
    //   console.log("Match NOT found!");
    //};
  //});
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
