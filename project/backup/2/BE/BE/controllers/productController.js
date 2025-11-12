import asyncHandler from 'express-async-handler';
import { Product } from '../models/productModel.js';
import { Category } from '../models/categoryModel.js';

/**
 * @desc    Lấy tất cả sản phẩm (có lọc, tìm kiếm, phân trang)
 * @route   GET /api/products
 * @access  Public
 */
export const getAllProducts = asyncHandler(async (req, res) => {
    const pageSize = parseInt(req.query.limit) || 20;
    const page = parseInt(req.query.page) || 1;

    // 1. Build Query cho tìm kiếm và lọc
    const query = {};

    if (req.query.search) {
        query.name = { $regex: req.query.search, $options: 'i' }; // 'i' = không phân biệt hoa thường
    }
    if (req.query.category) {
        query.category = req.query.category; // req.query.category là ObjectId
    }
    if (req.query.brand) {
        query.brand = { $regex: req.query.brand, $options: 'i' };
    }

    // 2. Build Query cho Sắp xếp
    let sortOptions = {};
    const sort = req.query.sort; // e.g., "price_asc", "price_desc", "newest"
    if (sort === 'price_asc') {
        sortOptions.price = 1; // 1 = tăng dần
    } else if (sort === 'price_desc') {
        sortOptions.price = -1; // -1 = giảm dần
    } else {
        sortOptions.createdAt = -1; // Mặc định là mới nhất
    }

    // 3. Thực thi query
    const count = await Product.countDocuments(query);
    const products = await Product.find(query)
        .sort(sortOptions)
        .limit(pageSize)
        .skip(pageSize * (page - 1))
        .populate('category', 'name'); // Lấy tên của category

    res.json({
        products,
        page,
        totalPages: Math.ceil(count / pageSize),
        totalProducts: count
    });
});

/**
 * @desc    Lấy chi tiết 1 sản phẩm
 * @route   GET /api/products/:id
 * @access  Public
 */
export const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id).populate('category', 'name');
    if (product) {
        res.json(product);
    } else {
        res.status(404);
        throw new Error('Không tìm thấy sản phẩm');
    }
});

/**
 * @desc    Lấy sản phẩm liên quan
 * @route   GET /api/products/:id/related
 * @access  Public
 */
export const getRelatedProducts = asyncHandler(async (req, res) => {
    const currentProduct = await Product.findById(req.params.id);
    if (!currentProduct) {
        res.status(404);
        throw new Error('Không tìm thấy sản phẩm');
    }

    // Logic gợi ý: Lấy 10 sản phẩm cùng category, không bao gồm sản phẩm hiện tại
    const relatedProducts = await Product.find({
        category: currentProduct.category,
        _id: { $ne: currentProduct._id } // $ne = not equal
    })
    .limit(10)
    .select('name price salePrice images ratings');

    res.json(relatedProducts);
});

export const createProduct = asyncHandler(async (req, res) => {
    const {
        name,
        sku,
        description,
        price,
        salePrice,
        stockQuantity = 0,
        images = [],
        category,
        brand,
        attributes = {}
    } = req.body;

    // basic validation
    if (!name || !sku || !description || price === undefined || !category) {
        res.status(400);
        throw new Error('Thiếu thông tin bắt buộc: name, sku, description, price, category');
    }

    // SKU uniqueness
    const existingSku = await Product.findOne({ sku });
    if (existingSku) {
        res.status(400);
        throw new Error('SKU đã tồn tại');
    }

    // optionally validate category exists
    if (category) {
        const cat = await Category.findById(category);
        if (!cat) {
            res.status(400);
            throw new Error('Category không hợp lệ');
        }
    }

    const product = new Product({
        name,
        sku,
        description,
        price,
        salePrice,
        stockQuantity,
        images,
        category,
        brand,
        attributes
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
});


export const updateProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        res.status(404);
        throw new Error('Không tìm thấy sản phẩm');
    }

    const {
        name,
        sku,
        description,
        price,
        salePrice,
        stockQuantity,
        images,
        category,
        brand,
        attributes
    } = req.body;

    // if SKU is being changed, ensure uniqueness
    if (sku && sku !== product.sku) {
        const other = await Product.findOne({ sku });
        if (other) {
            res.status(400);
            throw new Error('SKU đã được sử dụng bởi sản phẩm khác');
        }
    }

    // if category provided, validate it exists
    if (category) {
        const cat = await Category.findById(category);
        if (!cat) {
            res.status(400);
            throw new Error('Category không hợp lệ');
        }
    }

    // update only fields provided
    if (name !== undefined) product.name = name;
    if (sku !== undefined) product.sku = sku;
    if (description !== undefined) product.description = description;
    if (price !== undefined) product.price = price;
    if (salePrice !== undefined) product.salePrice = salePrice;
    if (stockQuantity !== undefined) product.stockQuantity = stockQuantity;
    if (images !== undefined) product.images = images;
    if (category !== undefined) product.category = category;
    if (brand !== undefined) product.brand = brand;
    if (attributes !== undefined) product.attributes = attributes;

    const updated = await product.save();
    res.json(updated);
});

export const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        res.status(404);
        throw new Error('Không tìm thấy sản phẩm');
    }

    await product.remove();
    res.json({ message: 'Sản phẩm đã được xóa' });
});
