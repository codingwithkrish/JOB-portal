import mongoose from 'mongoose'


const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URL)
        console.log(`Connected to database ${mongoose.connection.host}`.bgMagenta)
    } catch (error) {
        console.log(`MongoDB Error ${error}`.bgRed.white)
    }
}

export default connectDB;