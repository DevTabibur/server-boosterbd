const mongoose = require("mongoose");
const app = require("./app");
// server
const port = process.env.PORT || 5000;

mongoose.set("strictQuery", false);
// database connection
// mongoose.connect(process.env.DATABASE_LOCAL).then(() => {
//   console.log(`Database connection is SUCCESSFUL`.bgRed.bold);
// });

// this link is ipv4 supported. so it'll not giving any error with connection => mongodb://127.0.0.1:27017/boosterbd
mongoose
  .connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`Database connection is SUCCESSFUL`.bgBlue.bold))
  .catch((err) =>
    console.log(`Database connection is SUCCESSFUL`.bgRed.bold, err)
  );

app.listen(port, () => {
  console.log(`Server is running on ${port}`.bgYellow.bold);
});
