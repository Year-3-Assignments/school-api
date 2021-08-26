import mongoose, { Schema } from 'mongoose'

const SportSchema = new Schema(
    {
        sportId: {
            type: String,
            required: [true, 'Sport ID is required'],
            trim: true,
          },
        name: {
            type: String,
            required: [true, 'Sport name is required'],
            trim: true
        },
        teamImageUrl: {
            type: String,
            required: [true, 'Image is requred'],
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
            ref: 'students',
        }],
    },
    {
        timestamps: true,
    }
)

const Sports = mongoose.model('sports', SportSchema);
export default Sports;