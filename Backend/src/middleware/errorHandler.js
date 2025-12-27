exports.errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err.name === "ValidationError") {
    return res
      .status(400)
      .json({ message: "Validation error", details: err.message });
  }

  if (err.code === 11000) {
    return res.status(400).json({ message: "Duplicate field value" });
  }

  res.status(500).json({ message: "Internal server error" });
};
