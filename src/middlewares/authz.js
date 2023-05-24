const authorize = (privilege) => {
  return (req, res, next) => {
    const userRole = req.user.role;

    if (userRole !== privilege) return res.status(403).send("Unauthorized");

    next();
  };
};

module.exports = authorize;

// const privileges = ["customer", "seller", "admin"];
// const customerRole = {
//   getMe,
//   addUser,
//   updateUser,
//   deleteUser,
// };
// const sellerRole = {
//   addSeller,
//   getAllSellers,
//   getSeller,
//   updateSeller,
//   deleteSeller,
// };
// const adminRole = {};
