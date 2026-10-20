require("dotenv").config();
const dns = require("dns");
const express = require("express");
const mongoose = require("mongoose");

// Fix for Node.js SRV record resolution (querySrv ECONNREFUSED) on Windows/VPN
if (typeof dns.setServers === "function") {
  try {
    dns.setServers(["8.8.8.8", "1.1.1.1"]);
  } catch (dnsErr) {
    console.warn("[DNS] Fallback DNS server configuration skipped:", dnsErr.message);
  }
}
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const hpp = require("hpp");
const compression = require("compression");

// Import Routes
const leadRoutes = require("./routes/leadRoutes");
const projectRoutes = require("./routes/projectRoutes");
const adminRoutes = require("./routes/adminRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const settingsRoutes = require("./routes/settingsRoutes");

const app = express();
app.set("trust proxy", 1);

// ─── GZIP COMPRESSION ────────────────────────────────────────────────────────
// Must be first — compresses all responses before they leave the server
app.use(compression());

// ─── CORS ────────────────────────────────────────────────────────────────────
const ALLOWED_ORIGINS = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://steppingstones.agency",
  "https://www.steppingstones.agency",
  "https://steppingstones.cloud",
  "https://www.steppingstones.cloud",
  "https://steppingstonesagency.netlify.app",
  ...(process.env.ALLOWED_ORIGIN
    ? process.env.ALLOWED_ORIGIN.split(",").map((s) => s.trim())
    : []),
];

const isAllowedOrigin = (origin) => {
  if (!origin) return true; // non-browser requests (Postman, curl, server-to-server)
  if (ALLOWED_ORIGINS.includes(origin)) return true;
  // Match any Netlify site or deploy-preview: https://*.netlify.app
  if (/^https:\/\/([a-zA-Z0-9_-]+\.)*netlify\.app$/.test(origin)) return true;
  // Match custom domain variants: https://*.steppingstones.cloud or .agency
  if (/^https:\/\/([a-zA-Z0-9_-]+\.)*steppingstones\.(cloud|agency)$/.test(origin)) return true;
  return false;
};

app.use(
  cors({
    origin: (origin, callback) => {
      if (isAllowedOrigin(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS: origin ${origin} not allowed`));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

// ─── SECURITY HEADERS (Helmet + CSP) ────────────────────────────────────────
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"], // unsafe-inline needed for inline styles
        imgSrc: ["'self'", "data:", "res.cloudinary.com"], // only our Cloudinary bucket
        connectSrc: ["'self'"],
        fontSrc: ["'self'", "fonts.googleapis.com", "fonts.gstatic.com"],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [],
      },
    },
    crossOriginEmbedderPolicy: false, // Allows Cloudinary images in browser
  }),
);

// ─── BODY PARSING ────────────────────────────────────────────────────────────
app.use(express.json({ limit: "50kb" })); // JSON body, capped at 50kb
app.use(express.urlencoded({ extended: true, limit: "50kb" }));

// ─── NOSQL INJECTION PROTECTION ──────────────────────────────────────────────
// express-mongo-sanitize is incompatible with Express 5 (req.query is read-only).
// This custom middleware sanitizes req.body and req.params (mutable objects) only.
const sanitizeValue = (obj) => {
  if (!obj || typeof obj !== "object") return;
  for (const key of Object.keys(obj)) {
    if (key.startsWith("$") || key.includes(".")) {
      const safe = key.replace(/\$/g, "_").replace(/\./g, "_");
      console.warn(`[SECURITY] Sanitized key '${key}' → '${safe}'`);
      obj[safe] = obj[key];
      delete obj[key];
    } else if (typeof obj[key] === "object") {
      sanitizeValue(obj[key]);
    }
  }
};
app.use((req, res, next) => {
  sanitizeValue(req.body);
  sanitizeValue(req.params);
  next();
});

// ─── HTTP PARAMETER POLLUTION PROTECTION ─────────────────────────────────────
// Prevents ?budget[]=cheap&budget[]=expensive style injection
app.use(
  hpp({
    whitelist: [], // add any params that legitimately accept arrays
  }),
);

// ─── LOGGING ─────────────────────────────────────────────────────────────────
if (process.env.NODE_ENV !== "production") {
  morgan.token("statusColor", (req, res) => {
    const status = res.headersSent ? res.statusCode : undefined;
    const color =
      status >= 500
        ? 31
        : status >= 400
          ? 33
          : status >= 300
            ? 36
            : status >= 200
              ? 32
              : 0;
    return "\x1b[" + color + "m" + status + "\x1b[0m";
  });
  app.use(
    morgan(
      "\x1b[36m[SERVER]\x1b[0m :method :url - :statusColor :response-time ms",
    ),
  );
} else {
  app.use(morgan("combined"));
}

// ─── DATABASE ────────────────────────────────────────────────────────────────
const connectDB = async () => {
  const primaryUri = process.env.MONGO_URI;
  const localFallbackUri =
    process.env.MONGO_LOCAL_URI || "mongodb://127.0.0.1:27017/steppingstones";

  try {
    const conn = await mongoose.connect(primaryUri, {
      autoIndex: process.env.NODE_ENV !== "production", // Disable auto-index in prod
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`\x1b[32m[MONGODB]\x1b[0m Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(
      `\x1b[31m[ERROR]\x1b[0m DB Connection Failed: ${error.message}`,
    );

    // In development mode, gracefully fall back to local MongoDB if primary fails
    if (process.env.NODE_ENV !== "production" && primaryUri !== localFallbackUri) {
      console.log(
        `\x1b[33m[MONGODB]\x1b[0m Attempting fallback to local MongoDB (${localFallbackUri})...`,
      );
      try {
        const localConn = await mongoose.connect(localFallbackUri, {
          autoIndex: true,
          serverSelectionTimeoutMS: 3000,
        });
        console.log(
          `\x1b[32m[MONGODB]\x1b[0m Connected to local fallback: ${localConn.connection.host}`,
        );
        console.log(
          `\x1b[33m[NOTE]\x1b[0m MongoDB Atlas connection failed (often due to IP Whitelist or VPN). Running with local MongoDB.`,
        );
        return;
      } catch (localErr) {
        console.error(
          `\x1b[31m[ERROR]\x1b[0m Local DB Connection Also Failed: ${localErr.message}`,
        );
      }
    }

    process.exit(1);
  }
};
connectDB();

// ─── ROUTES ──────────────────────────────────────────────────────────────────
app.use("/api/leads", leadRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/settings", settingsRoutes);

// Health Check — minimal info in production
app.get("/api/health", (req, res) => {
  if (process.env.NODE_ENV === "production") {
    return res.status(200).json({ status: "ok" });
  }
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

// ─── 404 HANDLER ─────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, error: "Route not found" });
});

// ─── GLOBAL ERROR HANDLER ────────────────────────────────────────────────────
// Catches all unhandled errors — prevents stack traces leaking to clients
app.use((err, req, res, next) => {
  // Log full error internally
  console.error(`\x1b[31m[ERROR]\x1b[0m ${err.message}`, {
    stack: err.stack,
    url: req.originalUrl,
  });

  // CORS errors
  if (err.message && err.message.startsWith("CORS:")) {
    return res.status(403).json({ success: false, error: err.message });
  }

  // Mongoose validation errors — surface field-level errors safely
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({ success: false, error: messages.join(", ") });
  }

  // Mongoose bad ObjectId (e.g. /api/leads/not-a-valid-id)
  if (err.name === "CastError") {
    return res.status(400).json({ success: false, error: "Invalid ID format" });
  }

  // JWT errors
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({ success: false, error: "Invalid token" });
  }
  if (err.name === "TokenExpiredError") {
    return res.status(401).json({ success: false, error: "Token expired" });
  }

  // Generic — never reveal internal error details in production
  const message =
    process.env.NODE_ENV === "production" ? "Server Error" : err.message;
  res.status(err.statusCode || 500).json({ success: false, error: message });
});

// ─── SERVER ──────────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\x1b[35m[SYSTEM]\x1b[0m Architecture initiated on port ${PORT}`);
  console.log(`\x1b[35m[SYSTEM]\x1b[0m NODE_ENV: ${process.env.NODE_ENV}`);
});
