const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true, 
        maxlength: [100, 'Title cannot be more than 100 characters']
    },
    description: {
        type: String,
        trim: true,
        maxlength: [500, 'Description cannot be more than 500 characters']
    },
    completed: {
        type: Boolean,
        default: false 
    }
}, {
    
    timestamps: true 
});

module.exports = mongoose.model('Task', TaskSchema);
