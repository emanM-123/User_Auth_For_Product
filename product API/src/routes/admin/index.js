import { Router } from "express";
import { authRouter } from "./auth.js";
import { userRouter } from "./user.js";
import { productRouter } from "./product.js";

const v1AdminRouter = Router();

v1AdminRouter.use("/auth", authRouter);
v1AdminRouter.use("/user", userRouter);
v1AdminRouter.use("/product", productRouter);


export { v1AdminRouter };
