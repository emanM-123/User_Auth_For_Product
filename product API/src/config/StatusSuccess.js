export const StatusSuccess = function (req, res, next) {
  res.ok = function (data) {
    return res.status(200).send(data);
  };
  next();
};
