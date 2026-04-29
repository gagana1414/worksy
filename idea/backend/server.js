const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

/* =========================
   MongoDB Connection
========================= */
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected ✅"))
    .catch(err => console.log("MongoDB Error ❌", err));


/* =========================
   Job Model
========================= */
const jobSchema = new mongoose.Schema({
    title: String,
    company: String,
    location: String,
    salary: String,
    type: String,
    description: String,
    tags: [String],
    postedAt: String,
    requirements: [String],
    employerEmail: String
});

const Job = mongoose.model("Job", jobSchema);


/* =========================
   Routes
========================= */

// ✅ Test route
app.get("/", (req, res) => {
    res.send("Backend running 🚀");
});

// ✅ Get ALL jobs
app.get("/api/jobs", async (req, res) => {
    try {
        let jobs = await Job.find();

        // Auto-seed if database is empty
        if (jobs.length === 0) {
            console.log("Database is empty. Seeding with mock jobs...");
            const mockJobs = require("./data/mockJobs");
            await Job.insertMany(mockJobs);
            jobs = await Job.find();
        }

        res.json({
            success: true,
            dataSource: "mongodb",
            data: jobs
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ Get ALL jobs by an employer
app.get("/api/jobs/employer", async (req, res) => {
    try {
        const { email } = req.query;
        if (!email) {
            return res.status(400).json({ error: "Email is required" });
        }
        
        const jobs = await Job.find({ employerEmail: email });
        
        res.json({
            success: true,
            data: jobs
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ Get SINGLE job (FIXED ERROR HERE)
app.get("/api/jobs/:id", async (req, res) => {
    try {
        const { id } = req.params;

        // 🔥 Fix: prevent undefined error
        if (!id || id === "undefined") {
            return res.status(400).json({ error: "Valid Job ID is required" });
        }

        const job = await Job.findById(id);

        if (!job) {
            return res.status(404).json({ error: "Job not found" });
        }

        res.json({ success: true, data: job });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ Create new job
app.post("/api/jobs", async (req, res) => {
    try {
        const job = new Job(req.body);
        await job.save();

        res.json({
            success: true,
            message: "Job created ✅",
            data: job
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ Update a job
app.put("/api/jobs/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        
        const job = await Job.findByIdAndUpdate(id, updatedData, { new: true });
        
        if (!job) {
            return res.status(404).json({ success: false, error: "Job not found" });
        }
        
        res.json({
            success: true,
            message: "Job updated successfully ✅",
            data: job
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});
/* =========================
   Review Model & Routes
========================= */
const reviewSchema = new mongoose.Schema({
    userEmail: String,
    userName: String,
    employerEmail: String,
    company: String,
    rating: Number,
    reviewText: String,
    createdAt: { type: Date, default: Date.now }
});

const Review = mongoose.model("Review", reviewSchema);

// ✅ Add a new review
app.post("/api/reviews", async (req, res) => {
    try {
        const { userEmail, userName, employerEmail, company, rating, reviewText } = req.body;

        if (!rating || rating < 1 || rating > 5) {
            return res.status(400).json({ error: "Rating must be between 1 and 5" });
        }

        // Prevent duplicate reviews from the same student for the same employer
        const existingReview = await Review.findOne({ userEmail, employerEmail });
        if (existingReview) {
            return res.status(400).json({ error: "You have already reviewed this employer." });
        }

        const review = new Review({ userEmail, userName, employerEmail, company, rating, reviewText });
        await review.save();

        res.json({ success: true, message: "Review added successfully", data: review });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ Get reviews for an employer
app.get("/api/reviews/:employerEmail", async (req, res) => {
    try {
        const { employerEmail } = req.params;
        const reviews = await Review.find({ employerEmail }).sort({ createdAt: -1 });

        const totalReviews = reviews.length;
        const averageRating = totalReviews > 0 
            ? (reviews.reduce((sum, rev) => sum + rev.rating, 0) / totalReviews).toFixed(1)
            : 0;

        res.json({
            success: true,
            data: {
                averageRating: parseFloat(averageRating),
                totalReviews,
                reviews
            }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ Get multiple employer ratings at once (for Job Cards)
app.post("/api/reviews/stats", async (req, res) => {
    try {
        const { employerEmails } = req.body; // Array of emails
        if (!Array.isArray(employerEmails)) {
            return res.status(400).json({ error: "employerEmails must be an array" });
        }

        const stats = {};
        
        for (const email of employerEmails) {
            const reviews = await Review.find({ employerEmail: email });
            if (reviews.length > 0) {
                const avg = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1);
                stats[email] = { averageRating: parseFloat(avg), totalReviews: reviews.length };
            } else {
                stats[email] = { averageRating: 0, totalReviews: 0 };
            }
        }

        res.json({ success: true, data: stats });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/* =========================
   Application Model & Routes
========================= */
const applicationSchema = new mongoose.Schema({
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
    applicantName: String,
    applicantEmail: String,
    college: String,
    resumeLink: String,
    status: { type: String, default: 'Pending' },
    appliedAt: { type: Date, default: Date.now }
});

const Application = mongoose.model("Application", applicationSchema);

// ✅ Apply for a job
app.post("/api/jobs/:id/apply", async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, college, resume } = req.body;

        const application = new Application({
            jobId: id,
            applicantName: name,
            applicantEmail: email,
            college: college,
            resumeLink: resume
        });

        await application.save();

        res.json({
            success: true,
            message: "Application submitted successfully! 🎉"
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ Get applications for a user
app.get("/api/applications", async (req, res) => {
    try {
        const { email } = req.query;
        if (!email) {
            return res.status(400).json({ error: "Email is required" });
        }
        
        const applications = await Application.find({ applicantEmail: email }).populate('jobId');
        
        res.json({
            success: true,
            data: applications
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/* =========================
   Server Start
========================= */
const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});