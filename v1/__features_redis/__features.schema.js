const mongoose = require("mongoose");
const {
  __featuresPreMiddleWare,
  __featuresPostMiddleWare,
} = require("./__features.middleware");
const __featuresSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Please provide a name for this __features"],
      trim: true,
      unique: true,
      minLength: [3, "Name required at list 3 letter"],
    },
    description: { type: String, require: true },
    price: {
      type: Number,
      required: true,
      min: [0, "price can't be negative"],
    },
    unit: {
      type: String,
      required: true,
      enum: {
        values: ["kg", "liter", "pcs", "pound", "gram", "ml"],
        message: "unit value must be kg/litre/pcs",
      },
    },
    quantity: {
      type: Number,
      required: true,
      min: [0, "quantity can't be negative"],
      validate: {
        validator: (value) => {
          const isInteger = Number.isInteger(value);
          if (isInteger) {
            return true;
          } else {
            return false;
          }
        },
        message: "Quantity must be an integer",
      },
    },
    status: {
      type: String,
      required: false,
      enum: {
        values: ["in-stock", "out-of-stock", "discontinued"],
        message: "status can't be {VALUE}",
      },
    },
    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
    },
    categories: [
      {
        name: { type: String, required: true },
        _id: mongoose.Schema.Types.ObjectId,
      },
    ],
    // if timestamp is true it auto created
    //   createdAt: {
    //     type: Date,
    //     default: Date.now,
    //   }
    //   updateAt: {
    //     type: Date,
    //     default: Date.now,
    //   }
  },
  {
    timestamps: true,
  }
);

// * middleware
/* This middleware is invoke before and after save the value */
__featuresSchema.pre("save", __featuresPreMiddleWare);
__featuresSchema.post("save", __featuresPostMiddleWare);

// * static method
// you can call this method from controller
__featuresSchema.methods.logger = function () {};

module.exports.__featuresSchema = __featuresSchema;
