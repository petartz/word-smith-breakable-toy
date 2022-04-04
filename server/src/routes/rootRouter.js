import express from "express";
import userSessionsRouter from "./api/v1/userSessionsRouter.js";
import usersRouter from "./api/v1/usersRouter.js";
import clientRouter from "./clientRouter.js";
import dictionaryShowRouter from "./api/v1/dictionaryShowRouter.js"
import userProfileRouter from "./api/v1/userProfileRouter.js"
import wordCloudRouter from "./api/v1/wordCloudRouter.js"
import homeDictionaryRouter from "./api/v1/homeDictionaryRouter.js"

import topicExtractorRouter from "./api/v1/topicExtractorRouter.js";

const rootRouter = new express.Router();
rootRouter.use("/", clientRouter);

rootRouter.use("/api/v1/user-sessions", userSessionsRouter);
rootRouter.use("/api/v1/users", usersRouter); //place your server-side routes here
rootRouter.use("/api/v1/profile/", userProfileRouter)
rootRouter.use("/api/v1/wordCloud", wordCloudRouter)

rootRouter.use("/api/v1/topicExtractor", topicExtractorRouter)

rootRouter.use("/api/v1/dictionaries", homeDictionaryRouter)
rootRouter.use("/api/v1/dictionaries/:id", dictionaryShowRouter)
export default rootRouter;
