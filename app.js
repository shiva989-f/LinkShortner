import express from "express"
import connection from "./DBConn.js";
import router from "./routes/url.js";

const app = express()

app.use(express.json())
app.use(express.static('public'))
app.use("/url", router)

app.set('view engine', 'ejs');
// Setting the views directory (optional, defaults to 'views')
app.set('views', './views');

// Basic routes to render an EJS view
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/analytic', (req, res)=> {
  res.render("analytic");
})

// Connecting to database
connection()

app.listen(3000, () => {
    console.log("App listening on port http://localhost:3000/");
});