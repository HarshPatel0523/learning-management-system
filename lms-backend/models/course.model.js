import { model, Schema } from "mongoose"

const courseSchema = new Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        minlength: [8, "Title must be at least 8 characters"],
        maxlength: [60, "Title must be at most 60 characters"],
        trim: true,
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        minlength: [20, "Description must be at least 20 characters"],
        maxlength: [200, "Description must be at most 200 characters"],
    },
    category: {
        type: String,
        required: [true, "Category is required"],
    },
    thumbnail: {
        public_id: {
            type: String,
        },
        secure_url: {
            type: String,
        },
    },
    lectures: [
        {
            title: String,
            description: String,
            lecture: {
                public_id: {
                    type: String
                },
                secure_url: {
                    type: String
                },
            }
        }
    ],
    numberOfLectures: {
        type: Number,
        default: 0,
    },
    createdBy: {
        type: String,
        required: [true, "CreatedBy is required"],
    },
}, {
    timestamps: true,
})

const Course = model("Course", courseSchema)

export default Course