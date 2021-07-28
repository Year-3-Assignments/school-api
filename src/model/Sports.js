import mongoose, { Schema } from 'mongoose'

const SportSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Sport name is required'],
            trim: true
        },
        responsibleCoach: {
            type: Schema.Types.ObjectId,
            required: [true, 'Coach person is required'],
            ref: 'users',
        },
    })