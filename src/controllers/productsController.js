const fs = require('fs');
const path = require('path');
const {loadProducts,storeProducts} = require('../data/db_moduls')

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		let products = loadProducts();
		return res.render('products', {
			products
		})
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		let products = loadProducts();
		let product = products.find(product => product.id === +req.params.id);
		return res.render('detail', {
			product,
			toThousand
		})
		
	},

	// Create - Form to create
	create: (req, res) => {
	
        return res.render('productToCreate'
		)
	},
	
	// Create -  Method to store
	store: (req, res) => {
		product = loadProducts();
		const {name, price, category,discount,description } = req.body;
		const id = products[products.length - 1].id;
		const newProduct = {
			id : id + 1,
			...req.body,
			name : name.trim(),
			price: +price,
			discount : +discount,
			category: category,
			description : description.trim(),
			//Image : 
		}
		const productNew = [...products, newProduct];
		storeProducts(productNew)
		return res.redirect('/')
	},

	// Update - Form to edit
	edit: (req, res) => {
		const products = loadProducts();
        const product = products.find(product => product.id === +req.params.id);

        return res.render('productToEdit',{
            product
        })
		
	},
	// Update - Method to update
	update: (req, res) => {
		const products = loadProducts();
        const {id} = req.params;
        const {name,price,discount,category,description, Image} = req.body;

		const productModify = products.map(product => {
			if (product === +id){
				return {
					id : product.id,
					name : name.trim(),
					price : +price,
					discount : +discount,
					category,
					description : description.trim(),
					Image : product.Image
				}
			}
			return product
		})
		storeProducts(productModify)
		res.redirect('/products/detail/' + req.params.id)
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		
		const products = loadProducts();

        const productsModify = products.filter(product => product.id !== +req.params.id )
        storeProducts(productsModify);
        
        return res.redirect('/')

	}
};

module.exports = controller;