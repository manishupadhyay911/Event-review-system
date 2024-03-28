const asyncHandler = require("express-async-handler");
const Event = require("../models/eventModel");
const User = require("../Models/userModel");
const createEvent = asyncHandler(async (req, res) => {
    const { name, date, location, price } = req.body;
    if (!name || !date || !location || !price) {
        res.status(400);
        throw new Error("Enter all feilds");
    }
    userId = req.user._id;
    const event = await Event.create({
        name,
        date,
        location,
        price,
        organiser : userId
    });

    const organiser = await User.findByIdAndUpdate(
        userId,
        {
            $push: { eventsCreated: event._id },
        },
    )

    if (event && organiser) {
        res.status(201).json({
            _id: event._id,
            name: event.name,
            date: event.date,
            location : event.location,
            price : event.price,
            organiserId : userId
        });
    } else {
        res.status(400);
        throw new Error("Failed to create event");
    }
});

const fetchEvent = asyncHandler(async (req, res) =>{
    const id  = req.query.id;
    const event = await Event.findById({
        _id : id
    })
        .populate("organiser","-password")
    userId = req.user._id;
    if( event ) {
        res.status(201).json({
            _id: event._id,
            name: event.name,
            date: event.date,
            location : event.location,
            price : event.price,
            organiser : event.organiser.name
        });
    } else {
        res.status(400);
        throw new Error("Failed to create event");
    }

});

const encrypt = (originalString) =>{
    return Buffer.from(originalString).toString('base64');
}
const decrypt = (cursor) =>{
    return Buffer.from(cursor, 'base64').toString('utf-8');
}

const fetchAllEvents= asyncHandler(async (req, res) =>{

    const limit = parseInt(req.query.limit)
    const cursor = req.query.cursor
    let decryptedCursor
    let posts

    if (cursor) {
        decryptedCursor = decrypt(cursor)
        let decrypedDate = new Date(decryptedCursor * 1000)
        posts = await Event.find({
            updatedAt: {
                $lt: new Date(decrypedDate),
            },
        })
            .sort({ updatedAt: -1 })
            .limit(limit + 1)
            .exec()
    } else {
        posts = await Event.find({})
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

const attendEvent = asyncHandler(async (req, res) =>{
    const id = req.query.id;
    const userId = req.user._id;
        //if already attended then cant attend
        //if created by user then cant attend
        //past event cannot be attended
        //TODO create a count for event attendees
    const event = await Event.findById({
        _id : id
    })
    if(!event) {
        res.status(400);
        throw new Error("Cannot attend event, No event found");
    }
    if(event.organiser === userId) {
        res.status(400);
        throw new Error("Event created by the same user");
    }
    if(event.date < Date.now()) {
        res.status(400);
        throw new Error("Cannot attend Past event");
    }
    const eventAttended = await User.findByIdAndUpdate(
        userId,
        {
            $push: { eventsAttended: event._id },
        },
    )
    if( eventAttended) {
        res.status(200).send({
            status: "Successful",
            data : event
        })
    }
    else{
        res.status(400);
        throw new Error("Cannot attend event");
    }

});
module.exports = { createEvent, fetchEvent, fetchAllEvents, attendEvent};