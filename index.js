function orderByDate(arr, index) {
  const orderedByDate = arr.sort((next, prev) => {
    const nextDate = new Date(next[index]);
    const prevDate = new Date(prev[index]);
    return nextDate - prevDate;
  });
  return orderedByDate;
}

function checkAvailable(quantity, purchaseOrders) {

  let sum = 0;
  let limit = 1;
  let date = '';

  let total = 0;
  for (var i = 0; i < purchaseOrders.length; i++) {
    total += purchaseOrders[i].quantity;
  }

  if (total === 0) {
    return {
      purchaseOrders: [],
      date: ''
    }
  }
  for (let i = 0; i < limit; i++) {
    let purchaseQuantity = purchaseOrders[i].quantity;

    if (purchaseQuantity != 0) {
      sum += purchaseQuantity;
      if (sum >= quantity) {
        purchaseOrders[i].quantity = purchaseQuantity - quantity;
        date = purchaseOrders[i].receiving;
      } else {
        purchaseOrders[i + 1].quantity += purchaseQuantity;
        purchaseOrders[i].quantity = 0;
        limit++;
      }
    } else {
      limit++;
    }
  }
  return {
    purchaseOrders: purchaseOrders,
    date: date
  }
}

function allocate(salesOrders, purchaseOrders) {
  let tempPursacheOrder = [];
  let results = [];

  const pursacheOrdersOrderedByDate = orderByDate(purchaseOrders, 'receiving');
  const saleOrdersOrderedByDate = orderByDate(salesOrders, 'created');

  tempPursacheOrder = pursacheOrdersOrderedByDate
  for (let i = 0; i < saleOrdersOrderedByDate.length; i++) {
    const outcome = checkAvailable(saleOrdersOrderedByDate[i].quantity, tempPursacheOrder);
    tempPursacheOrder = outcome.purchaseOrders;
    if (tempPursacheOrder.length) {
      results[i] = {
        salesOrderId: saleOrdersOrderedByDate[i].id,
        availabilityDate: outcome.date
      }
    }
    
  }

  return results;
}

module.exports = allocate;