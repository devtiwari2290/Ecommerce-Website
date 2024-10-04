import express from "express";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";
import {
  categoryProductController,
  createProductController,
  deleteProductController,
  filterProductController,
  getProductController,
  getSingleProductController,
  productCountController,
  productListController,
  productPhotoController,
  relatedProductController,
  searchProductController,
  updateProductController,
  createRazorpayOrder,
  verifyRazorpayPayment,
  getAllOrders,
  AllOrdersController,
  orderStatusController,
} from "../controllers/productController.js";
import formidable from "express-formidable";

const router = express.Router();

// create product
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

// update product
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

// get all products
router.get("/get-product", getProductController);

// single product
router.get("/get-product/:slug", getSingleProductController);

// product photo
router.get("/product-photo/:pid", productPhotoController);

// delete product
router.delete("/delete-product/:pid", deleteProductController);

// filter product
router.post("/filter-product", filterProductController);

// product count
router.get("/product-count", productCountController);

// product list
router.get("/product-list/:page", productListController);

// search product
router.get("/search-product/:keyword", searchProductController);

// similar products
router.get("/related-product/:pid/:cid", relatedProductController);

// category wise products
router.get("/product-category/:slug", categoryProductController);

// payment routes

router.post("/razorpay/order", requireSignIn, createRazorpayOrder);
router.post("/razorpay/verify", requireSignIn, verifyRazorpayPayment);

// orders
router.get("/orders/get", requireSignIn, getAllOrders);

// all orders
router.get("/all-orders", requireSignIn, isAdmin, AllOrdersController);

// update order status
router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);

export default router;
