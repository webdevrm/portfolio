import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    required: [true, "Please enter your email address"],
  },
  password: {
    type: String,
    select: false,
    required: [true, "Please enter Password"],
  },
  timeline: [
    {
      title: String,
      description: String,
      date: Date,
    },
  ],
  skills: [
    {
      image: {
        public_id: String,
        url: String,
      },
      title: String,
    },
  ],
  projects: [
    {
      url: String,
      title: String,
      image: {
        public_id: String,
        url: String,
      },
      description: String,
      techStack: String,
    },
  ],
  about: {
    name: String,
    title: String,
    subtitle: String,
    description: String,
    quote: String,
    avtar: {
      public_id: String,
      url: String,
    },
  },
});

export const User = mongoose.model("User", userSchema);
