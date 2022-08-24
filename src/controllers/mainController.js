const fs = require('fs');
const path = require('path');
const { loadProducts } = require('../data/db_moduls');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {
		let products = loadProducts();
		let productsVisited = products.filter(products => products.category === "visited")
		let productsInsale = products.filter(products => products.category === "in-sale")
		return res.render('index', {
			productsVisited,
			productsInsale,
			toThousand
		})
	},
	search: (req, res) => {
		// Do the magic
	},
};

module.exports = controller;
