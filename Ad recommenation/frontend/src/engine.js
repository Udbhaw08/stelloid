export function generateRecommendations(products, inventory, sales, campaigns) {
    const recommendations = [];

    // Helper to find data by Product_ID
    const findById = (array, id) => array.find(item => item.Product_ID === id) || {};

    for (const product of products) {
        const id = product.Product_ID;
        const inv = findById(inventory, id);
        const sale = findById(sales, id);
        const campaign = findById(campaigns, id);

        // If we don't have basic campaign data, skip or wait
        if (!campaign.Campaign_ID) {
            continue;
        }

        // --- Calculate Core Metrics ---
        // Parse numbers safely
        const sellingPrice = parseFloat(product.Selling_Price) || 0;
        const cost = parseFloat(product.Manufacturing_Cost) || 0;
        const fees = parseFloat(product.Amazon_Fees) || 0;
        const unitsInStock = parseInt(inv.Units_In_Stock) || 0;
        const unitsSold = parseInt(sale.Units_Sold) || 0;
        const unitsReturned = parseInt(sale.Units_Returned) || 0;
        const clicks = parseInt(campaign.Clicks) || 0;
        const adSpend = parseFloat(campaign.Ad_Spend) || 0;
        const adSales = parseFloat(campaign.Ad_Sales) || 0;

        const profitPerUnit = sellingPrice - cost - fees;
        const returnRate = unitsSold > 0 ? (unitsReturned / unitsSold) : 0;
        const acos = adSales > 0 ? (adSpend / adSales) : (adSpend > 0 ? 1.0 : 0); // 1.0 (100%) if spend but no sales

        let action = "WAIT";
        let reason = "The campaign is performing steadily. Let it run and monitor.";

        // --- Execute Decision Rules (Priority Order) ---

        // Rule 0: Missing or Corrupt Data (Edge Case)
        if (isNaN(sellingPrice) || isNaN(cost) || isNaN(unitsInStock) || isNaN(clicks)) {
            action = "ERROR";
            reason = "Missing or corrupt data for this product across the CSV files. Cannot safely generate recommendation.";
        }
        // Rule 1: Not Enough Data
        else if (clicks < 50 || adSpend < 10) {
            action = "WAIT";
            reason = `Not enough data (Clicks: ${clicks}, Spend: $${adSpend.toFixed(2)}). Need more traffic to evaluate.`;
        }
        // Rule 2: Low Stock
        else if (unitsInStock < 20) {
            action = "REDUCE SPEND";
            reason = `Stock is very low (${unitsInStock} units left). Reduce ads to avoid paying for clicks on out-of-stock items.`;
        }
        // Rule 3: Unprofitable Returns
        else if (returnRate > 0.20) {
            action = "REDUCE SPEND";
            reason = `High return rate (${(returnRate * 100).toFixed(1)}%). Stop driving paid traffic until product issues are fixed.`;
        }
        // Rule 4: Poor Ad Performance (High ACoS)
        else if (acos > 0.40) {
            action = "REDUCE SPEND";
            reason = `Poor ad performance (ACoS: ${(acos * 100).toFixed(1)}%). Ads are eating too much profit. Reduce bids.`;
        }
        // Rule 5: Winning Campaign
        else if (acos < 0.25 && returnRate < 0.10 && unitsInStock > 100 && profitPerUnit > 0) {
            action = "INCREASE SPEND";
            reason = `Golden campaign! Highly profitable (ACoS: ${(acos * 100).toFixed(1)}%), good stock (${unitsInStock}), and low returns. Scale up budget.`;
        }

        // Add to results
        recommendations.push({
            Product_ID: id,
            Product_Name: product.Product_Name,
            Campaign_ID: campaign.Campaign_ID,
            Action: action,
            Explanation: reason
        });
    }

    return recommendations;
}
