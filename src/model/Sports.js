import mongoose, { Schema } from 'mongoose'

const SportSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Sport name is required'],
            trim: true
        },
        coach: [{
            type: Schema.Types.ObjectId,
            required: [true, 'Coach person is required'],
            ref: 'users',
        }],       
        teamPlayers: [{
            type: Schema.Types.ObjectId, 
            required: [true, 'Team Players list is required'],
            ref: 'users',
        }],
    },
    {
        timestamps: true,
    }
)

const Sports = mongoose.model('sports', SportSchema);
export default Sports;