import mongoose, { Schema } from 'mongoose'

const SportInventorySchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Sport Equipment name is required'],
            trim: true
        },
        sportname: [{
            type: Schema.Types.ObjectId,
            required: [true, 'Tools used sport is required'],
            ref: 'sports',
        }],       
        dateOfPurchase: {
            type: String,
            required: [true, 'Date of purchase is required'],
        },
        quantity: {
            type: String,
            required: [true, 'Quantity is required'],
        },
    },
    {
        timestamps: true,
    }
)

const SportsInventory = mongoose.model('sportsinventory', SportInventorySchema);
export default SportsInventory;