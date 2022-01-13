
//const Products = require('./stock');
const { purchaseOrders, salesOrders } = require('./orders');

const allocate = require('./index')

const outcome = allocate(salesOrders, purchaseOrders)
console.log(outcome)