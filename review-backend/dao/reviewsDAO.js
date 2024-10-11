import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId // to search in the database, we need to search for an object id

let reviews

export default class ReviewsDAO {
  static async injectDB(conn) {
    if (reviews) { // if there is already a database connection, return
      return
    }
    try {
      reviews = await conn.db("reviews").collection("reviews") // look for a database reviews -> in which there is a collection reviews
    } catch (e) {
      console.error(`Unable to establish collection handles in userDAO: ${e}`)
    }
  }

  static async addReview(movieId, user, review, date) {
    try {
      const reviewDoc = {
        movie_id: movieId,
        user : user,
        review : review 
      }

      return await reviews.insertOne(reviewDoc) // insertOne = MongoDB function to insert a document in the database
    } catch (e) {
      console.error(`Unable to post review: ${e}`)
      return { error: e }
    }
  }

  static async getReview(reviewId) {
    try {
      return await reviews.findOne(
        { _id: ObjectId.createFromHexString(reviewId)}
      )

    } catch (e) {
      console.error(`Unable to get review: ${e}`)
      return { error: e }
    }
  }

  static async updateReview(reviewId, user, review) {
    try {
      const updateResponse = await reviews.updateOne(
        { _id: ObjectId.createFromHexString(reviewId) },
        { $set: { user: user, review: review  } },
      )

      return updateResponse
    } catch (e) {
      console.error(`Unable to update review: ${e}`)
      return { error: e }
    }
  }

  static async deleteReview(reviewId) {

    try {
      const deleteResponse = await reviews.deleteOne({
        _id: ObjectId.createFromHexString(reviewId)
      })

      return deleteResponse
    } catch (e) {
      console.error(`Unable to delete review: ${e}`)
      return { error: e }
    }
  }

  static async getReviewsByMovieId(movieId) {
    try {
      const cursor = await reviews.find(
        { movie_id: parseInt(movieId)}
      )

      return cursor.toArray()

    } catch (e) {
      console.error(`Unable to get review: ${e}`)
      return { error: e }
    }
  }

}