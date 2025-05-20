const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5500",
  "https://onse-app.onrender.com/",
  "https://onse-app.onrender.com",
  "http://onse.abdeldjalile.me/",
  "http://onse.abdeldjalile.me",
];

const CorsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
};

export default CorsOptions;
