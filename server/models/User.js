const mongoose = require("mongoose");

const socialLinksSchema = new mongoose.Schema({
  github: String,
  linkedin: String,
  twitter: String,
  portfolio: String,
});

const profileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  bio: { type: String },
  avatar: { type: String },
  resumeUrl: { type: String },
  socialLinks: socialLinksSchema,
});

const skillSchema = new mongoose.Schema({
  category: { type: String }, // e.g., Frontend
  items: [{ type: String }], // ["React", "CSS"]
});

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },

    templateId: {
      type: String,
      default: "minimal",
    },

    isPro: {
      type: Boolean,
      default: false,
    },

    profile: profileSchema,

    skills: [skillSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
