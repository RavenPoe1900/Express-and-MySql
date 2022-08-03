const PurchaseService = require('../service/purchaseService.js');
const send = require('../utils/functions.js').send;

const purchase = async (req, res) => {
	let purchase = new PurchaseService();
	const body = req.body;
	purchase = await purchase.init(req.app.locals.models, body);
	send(res,purchase);
};

// Remove, Update, GetOne and Paginate

module.exports = {
	purchase,
};