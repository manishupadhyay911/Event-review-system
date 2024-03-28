const asyncHandler = require("express-async-handler");
const Event = require("../models/eventModel");
const User = require("../Models/userModel");
const Rating = require("../models/ratingModel");

const validateRating = (rating) => {
    return !(rating < 0 || rating > 10);
}
const giveRating = asyncHandler(async (req, res) => {
    const eventId = req.query.id;
    const userId = req.user._id;
    const {overall, registrationExp, eventExp, breakfastExp} = req.body;

    if(!validateRating(overall) || !validateRating(registrationExp) ||
    !validateRating(eventExp) || !validateRating(breakfastExp)) {
        res.status(400);
        throw new Error("Invalid Rating");
    }
    // user should be attending the event on order to give rating
    const event = await User.findById({
        _id : userId
    })
    const eventExists = event.eventsAttended.filter(eventId => eventId === eventId);
    if(eventExists.length === 0) {
        res.status(400).send(
            { status : "unsuccessful", message : "User Did not attend the event"}
        );
        throw new Error("User Did not attend the event");
    }

    const ratingExists = await Rating.exists({
        createdBy : userId,
        event : event,
    });
    if(ratingExists) {
        res.status(400);
        throw new Error("Rating already given");
    }

    const rating = await Rating.create({
        overall,
        registrationExp,
        eventExp,
        breakfastExp,
        event : eventId,
        likes : 0,
        reportCount : 0,
        flag : false,
        createdBy : userId,
    });

    if(rating) {
        const event = await Event.findByIdAndUpdate(
            eventId,
            {
                $push: { ratings: rating._id },
            },
        );
        const user = await User.findByIdAndUpdate(
            userId,
            {
                $push: { ratings: rating._id },
            },
        );

        if(event && user) {
            res.status(200).send({
                status: "Successful",
                data : rating
            })
        }
    }

});

const likeReview = asyncHandler(async (req, res) => {
    // if already liked
    userId = req.user._id;
    reviewId = req.query.id;
    const rating = await Rating.findById({
        _id : reviewId
    });
    const usersLiked = rating.likedBy.filter(userId => userId === userId);
    if(usersLiked.length !== 0) {
        return res.status(400).json({ error: 'User Already liked the review' });
    }
    const likes = await Rating.findByIdAndUpdate(
        reviewId,
        {
            likes : rating.likes+1,
            $push: { likedBy: userId },
        },
    );

    if(likes) {
        return res.status(200).json({ success: 'Successfully liked the review' });
    }
    else return res.status(400).json({ error: 'Cannot like the review' });

});

const reportReview = asyncHandler(async (req, res) => {
    // if already reported
    userId = req.user._id;
    reviewId = req.query.id;
    const rating = await Rating.findById({
        _id : reviewId
    });
    const usersReported = rating.reportedBy.filter(userId => userId === userId);
    if(usersReported.length !== 0) {
        return res.status(400).json({ error: 'User Already reported the review' });
    }
    let flag = rating.flag;
    if(rating.reportCount >= 5) flag = true;
    const report = await Rating.findByIdAndUpdate(
        reviewId,
        {
            reportCount : rating.reportCount+1,
            flag : flag,
            $push: { reportedBy: userId },
        },
    );

    if(report) {
        return res.status(200).json({ success: 'Successfully reported the review' });
    }
    else return res.status(400).json({ error: 'Cannot report the review' });

});

const respondToReview =   asyncHandler(async (req, res) =>{
    const { reviewId, description } = req.body;
    const review = await Rating.findByIdAndUpdate(reviewId, { description: description });
    if (review) {
        res.status(200).json({ success: true, message: 'Response added to the review' });
    }
    else{
        return res.status(404).json({ success: false, error: 'Review not found' });
    }
});


const fetchSummary = asyncHandler(async (req, res) => {
    const eventId = req.query.eventId;
    // Fetch reviews for the specified event
    const reviews = await Event.findById({_id : eventId})
        .populate("ratings","");

    // Calculate average ratings for each criteria
    let registrationExpTotal = 0;
    let eventExpTotal = 0;
    let breakfastExpTotal = 0;
    let overallRatingTotal = 0;

    reviews.ratings.forEach(review => {
        registrationExpTotal += review.registrationExp;
        eventExpTotal += review.eventExp;
        breakfastExpTotal += review.breakfastExp;
        overallRatingTotal += review.overall;
    });

    const numReviews = reviews.ratings.length;
    const avgRegistrationExp = numReviews > 0 ? registrationExpTotal / numReviews : 0;
    const avgEventExp = numReviews > 0 ? eventExpTotal / numReviews : 0;
    const avgBreakfastExp = numReviews > 0 ? breakfastExpTotal / numReviews : 0;
    const avgOverallRating = numReviews > 0 ? overallRatingTotal / numReviews : 0;

    // Construct summary object
    const summary = {
        numReviews: numReviews,
        avgRegistrationExp: avgRegistrationExp,
        avgEventExp: avgEventExp,
        avgBreakfastExp: avgBreakfastExp,
        avgOverallRating: avgOverallRating
    };

    res.status(200).json(summary);
});

const fetchAllRating = asyncHandler(async (req, res) => {
    const eventId = req.query.eventId;
    // Fetch reviews for the specified event
    const limit = parseInt(req.query.limit)
    const cursor = req.query.cursor
    let decryptedCursor
    let posts

    if (cursor) {
        decryptedCursor = decrypt(cursor)
        let decrypedDate = new Date(decryptedCursor * 1000)
        posts = await Rating.find({
            event : eventId,
            updatedAt: {
                $lt: new Date(decrypedDate),
            },
        })
            .sort({ updatedAt: -1 })
            .limit(limit + 1)
            .exec()
    } else {
        posts = await Rating.find({event : eventId})
            .sort({ updatedAt: -1 })
            .limit(limit + 1)
    }
    const hasNext = posts.length === limit + 1
    let nextCursor = null
    if (hasNext) {
        const record = posts[limit]
        var unixTimestamp = Math.floor(record.updatedAt.getTime() / 1000)
        nextCursor = encrypt(unixTimestamp.toString())
        posts.pop()
    }

    res.status(200).send({
        data: posts,
        paging: {
            hasNext,
            nextCursor,
        },
    })
});
    module.exports = { giveRating, likeReview, reportReview, respondToReview, fetchSummary, fetchAllRating};