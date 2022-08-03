const purchaseService = require('../utils/purchaseService.js');
const send = require('../utils/functions.js').send;

const purchase = async (req, res) => {
	let purchase = new purchaseService();
	const data = req.body;
	purchase = await purchase.init(req, data);
	send(res,purchase);
};

// Remove, Update, GetOne and Paginate

module.exports = {
	purchase,
};