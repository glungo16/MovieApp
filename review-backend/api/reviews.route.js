import express from "express"
import ReviewsCtrl from "./reviews.controller.js"

const router = express.Router()

//router.route("/new").get((req, res) => res.send("hello world"))

// : = can be anything -> id becomes variable
router.route("/movie/:id").get(ReviewsCtrl.apiGetReviews) // get all reviews
router.route("/new").post(ReviewsCtrl.apiPostReview) // post new review
router.route("/:id") // perform different actions on the specific movie (id) based on what request we make (get, put, delete)
.get(ReviewsCtrl.apiGetReview)
.put(ReviewsCtrl.apiUpdateReview)
.delete(ReviewsCtrl.apiDeleteReview)

export default router