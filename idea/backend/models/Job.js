const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, required: true },
    salary: { type: String, required: true },
    type: { type: String, required: true },
    description: { type: String, required: true },
    tags: [{ type: String }],
    postedAt: { type: String, default: "Just now" },
    requirements: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.model("Job", jobSchema);
