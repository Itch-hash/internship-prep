import rateLimit, { type RateLimitRequestHandler } from "express-rate-limit";

const limiter: RateLimitRequestHandler = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  ipv6Subnet: 64,
});

export default limiter;
