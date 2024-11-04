import { Router } from "express";
import * as searchController from "../controllers/searchController";
import { upload } from "../middlewares/uploads";
import authentication from "../middlewares/authentication";

const searchRouter = Router()

searchRouter.get("/", authentication, searchController.getAllUsersSearch)
// searchRouter.get("/", searchController.searchAllUsers)

export default searchRouter