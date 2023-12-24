import mongoose from 'mongoose'
const jobSchema = new mongoose.Schema({
    company: {
        type: String,
        required: [true, 'Company Name is required']
    },
    position: {
        type: String,
        required: [true, "Position is required"],
        minlength: 10
    },
    status: {
        type: String,
        enum: ['pending', 'reject', 'interview'],
        default: 'pending'
    }, workType: {
        type: String,
        enum: ['full-time', 'part-time', 'internship', 'contract']
        , default: "full-time"
    },
    location: {
        type: String
        , default: 'Mumbai',
        required: [true, 'Work Location is required']
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
}, { timestamp: true })

export default mongoose.model("Job", jobSchema)