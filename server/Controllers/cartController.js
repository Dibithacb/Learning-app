const CartDB = require("../Models/CartModel");
const courseDB = require("../Models/courseModel");

const getCart = async (req, res) => {
  try {
    const userId = req.user;
    const cart = await CartDB.findOne({ userId }).populate("courses.courseId");
    console.log(cart);

    if (!cart) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    res.status(200).json(cart);
  } catch (error) {
    console.log(error);
    res
      .status(error.status || 500)
      .json({ message: error.message || "Internal server error" });
  }
};

const addCart = async (req, res) => {
  try {
    const userId = req.user;
    const { courseId } = req.params;
    const course = await courseDB.findById(courseId);

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    let cart = await CartDB.findOne({ userId });
    if (!cart) {
      cart = new CartDB({ userId, courses: [] });
    }

    const courseAlreadyExist = cart.courses.some((item) =>
      item.courseId.equals(courseId),
    );

    if (courseAlreadyExist) {
      return res.status(400).json({ error: "Course already in cart" });
    }

    cart.courses.push({
      courseId,
      price: course.price,
    });

    cart.calculateTotalPrice();
    await cart.save();
    res.status(200).json({ message: "Added to cart", cart });
  } catch (error) {
    console.log(error);
    res
      .status(error.status || 500)
      .json({ message: error.message || "Internal server error" });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const userId = req.user; //From middleware

    const { courseId } = req.params;

    let cart = await CartDB.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    cart.courses = cart.courses.filter(
      (cartItem) => !cartItem.courseId.equals(courseId),
    );

    cart.calculateTotalPrice();

    await cart.save();

    res.status(200).json({ message: "Course removed from cart", cart });
  } catch (error) {
    console.log(error);
    res
      .status(error.status || 500)
      .json({ message: error.message || "Internal server error" });
  }
};

const clearCart = async (req, res) => {
  try {
    const userId = req.user;

    const cart = await CartDB.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    cart.courses = [];

    await cart.save();
    return res.status(200).json({ error: "Cart cleared" });
  } catch (error) {
    console.log(error);
    res
      .status(error.status || 500)
      .json({ message: error.message || "Internal server error" });
  }
};

module.exports = {
  addCart,
  getCart,
  removeFromCart,
  clearCart
};
