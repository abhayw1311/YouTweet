import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";

const app = new express();


const corsOptions = {
    origin: 'https://youtube-twitter-clone-frontend.vercel.app/',
    credentials: true,
  }
  
  app.use(cors(corsOptions));
  
app.get("/",(req,res)=>{
  res.json("hello")
});
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(morgan("dev")); //HTTP request logger middleware for node.js 



//routes import

import userRouter from "./routes/user.routes.js";
import commentRouter from "./routes/comment.routes.js";
import likeRouter from "./routes/like.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import tweetRouter from "./routes/tweet.routes.js";
import videoRouter from "./routes/video.routes.js";
import healthcheckRouter from "./routes/healthcheck.routes.js";
import playlistRouter from "./routes/playlist.routes.js";
import dashboardRouter from "./routes/dashboard.routes.js";

//routes declaration

app.use("/users", userRouter);
app.use("/comment", commentRouter);
app.use("/likes", likeRouter);
app.use("/subscriptions", subscriptionRouter);
app.use("/tweet", tweetRouter);
app.use("/video", videoRouter);
app.use("/healthcheck", healthcheckRouter);
app.use("/playlist", playlistRouter);
app.use("/dashboard", dashboardRouter);


export default app;
