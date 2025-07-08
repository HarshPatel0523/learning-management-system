import { model, Schema } from "mongoose";

const messageSchema = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    message: {
        type: String,
        minlength: [10, "Message must be at least 10 characters"],
    },
}, {
    timestamps: true,
    versionKey: false
});

const Message = model("Message", messageSchema);

export default Message;