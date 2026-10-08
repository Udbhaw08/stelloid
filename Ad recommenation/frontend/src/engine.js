// Helper: Validate that uploaded CSV files contain the required column headers
export function validateCSVFiles(products, inventory, sales, campaigns) {
    const errors = [];

    const checkHeaders = (data, fileName, requiredCols) => {
        if (!data || !data.length) {
            errors.push(`${fileName}: File is completely empty.`);
            return;
        }
        const headers = Object.keys(data[0]);
        const missing = requiredCols.filter(col => !headers.includes(col));
        if (missing.length > 0) {
            errors.push(
                `Missing column(s) in [${fileName}]: "${missing.join('", "')}". (Found columns: ${headers.map(h => `"${h}"`).join(', ')})`
            );
        }
    };

    checkHeaders(products, 'products.csv', ['Product_ID', 'Selling_Price', 'Manufacturing_Cost', 'Amazon_Fees']);
    checkHeaders(inventory, 'inventory.csv', ['Product_ID', 'Units_In_Stock']);
    checkHeaders(sales, 'sales_and_returns.csv', ['Product_ID', 'Units_Sold', 'Units_Returned']);
    checkHeaders(campaigns, 'campaigns.csv', ['Product_ID', 'Campaign_ID', 'Ad_Spend', 'Ad_Sales', 'Clicks', 'Impressions']);

    return errors;
}

export function generateRecommendations(products, inventory, sales, campaigns) {
    const recommendations = [];

    const findById = (array, id) => (array || []).find(item => item && item.Product_ID === id);

    for (const product of products || []) {
        const id = product.Product_ID;

        // 1. Validate Product ID itself
        if (!id) {
            recommendations.push({
                Product_ID: "Unknown",
                Product_Name: product.Product_Name || "Unnamed Product",
                Campaign_ID: "N/A",
                Action: "ERROR",
                Explanation: `Missing "Product_ID" in products.csv for this row. Every product must have a Product_ID.`,
                Metrics: null
            });
            continue;
        }

        const inv = findById(inventory, id);
        const sale = findById(sales, id);
        const campaign = findById(campaigns, id);

        // 2. Validate Cross-File Linkage (Specific File Errors)
        if (!inv) {
            recommendations.push({
                Product_ID: id,
                Product_Name: product.Product_Name || id,
                Campaign_ID: "N/A",
                Action: "ERROR",
                Explanation: `Missing in [inventory.csv]: Product_ID "${id}" was not found. Cannot determine stock level.`,
                Metrics: null
            });
            continue;
        }

        if (!sale) {
            recommendations.push({
                Product_ID: id,
                Product_Name: product.Product_Name || id,
                Campaign_ID: "N/A",
                Action: "ERROR",
                Explanation: `Missing in [sales_and_returns.csv]: Product_ID "${id}" was not found. Cannot determine sales and return rates.`,
                Metrics: null
            });
            continue;
        }

        if (!campaign) {
            recommendations.push({
                Product_ID: id,
                Product_Name: product.Product_Name || id,
                Campaign_ID: "N/A",
                Action: "ERROR",
                Explanation: `Missing in [campaigns.csv]: No campaign found for Product_ID "${id}". Make sure Product_ID matches.`,
                Metrics: null
            });
            continue;
        }

        // 3. Validate Corrupt / Empty Fields in Each File
        const sellingPrice = parseFloat(product.Selling_Price);
        const cost = parseFloat(product.Manufacturing_Cost);
        const fees = parseFloat(product.Amazon_Fees);
        const unitsInStock = parseInt(inv.Units_In_Stock);
        const unitsSold = parseInt(sale.Units_Sold);
        const unitsReturned = parseInt(sale.Units_Returned);
        const clicks = parseInt(campaign.Clicks);
        const impressions = parseInt(campaign.Impressions);
        const adSpend = parseFloat(campaign.Ad_Spend);
        const adSales = parseFloat(campaign.Ad_Sales);
        const adOrders = parseInt(campaign.Ad_Orders) || 0;

        if (isNaN(sellingPrice) || isNaN(cost) || isNaN(fees)) {
            recommendations.push({
                Product_ID: id,
                Product_Name: product.Product_Name || id,
                Campaign_ID: campaign.Campaign_ID || "N/A",
                Action: "ERROR",
                Explanation: `Data Error in [products.csv]: Selling_Price, Manufacturing_Cost, or Amazon_Fees is invalid/missing for Product "${id}".`,
                Metrics: null
            });
            continue;
        }

        if (isNaN(unitsInStock)) {
            recommendations.push({
                Product_ID: id,
                Product_Name: product.Product_Name || id,
                Campaign_ID: campaign.Campaign_ID || "N/A",
                Action: "ERROR",
                Explanation: `Data Error in [inventory.csv]: Units_In_Stock is not a valid number for Product "${id}".`,
                Metrics: null
            });
            continue;
        }

        if (isNaN(unitsSold) || isNaN(unitsReturned)) {
            recommendations.push({
                Product_ID: id,
                Product_Name: product.Product_Name || id,
                Campaign_ID: campaign.Campaign_ID || "N/A",
                Action: "ERROR",
                Explanation: `Data Error in [sales_and_returns.csv]: Units_Sold or Units_Returned is not a valid number for Product "${id}".`,
                Metrics: null
            });
            continue;
        }

        if (isNaN(clicks) || isNaN(impressions) || isNaN(adSpend) || isNaN(adSales)) {
            recommendations.push({
                Product_ID: id,
                Product_Name: product.Product_Name || id,
                Campaign_ID: campaign.Campaign_ID || "N/A",
                Action: "ERROR",
                Explanation: `Data Error in [campaigns.csv]: Ad_Spend, Ad_Sales, Clicks, or Impressions is invalid/missing for Product "${id}".`,
                Metrics: null
            });
            continue;
        }

        // --- 4. Calculate Advanced Professional Metrics ---
        const profitPerUnit = sellingPrice - cost - fees;
        const profitMargin = sellingPrice > 0 ? (profitPerUnit / sellingPrice) : 0;
        const breakEvenAcos = profitMargin;
        const returnRate = unitsSold > 0 ? (unitsReturned / unitsSold) : 0;
        const acos = adSales > 0 ? (adSpend / adSales) : (adSpend > 0 ? 1.0 : 0);
        const ctr = impressions > 0 ? (clicks / impressions) : 0;
        const cvr = clicks > 0 ? (adOrders / clicks) : 0;

        let action = "WAIT";
        let reason = "The campaign is performing steadily. Let it run and monitor.";

        // --- 5. Execute Decision Rules (Priority Order) ---
        // Rule 1: Statistical Significance
        if (clicks < 50 || adSpend < 10) {
            action = "WAIT";
            reason = `Not enough data (Clicks: ${clicks}). Wait for at least 50 clicks to judge Conversion Rate (CVR).`;
        }
        // Rule 2: Inventory Health (Stock Out Risk)
        else if (unitsInStock < 20) {
            action = "REDUCE SPEND";
            reason = `Critical Stock Warning (${unitsInStock} units in inventory.csv). Reduce ads to avoid paying for clicks on an item about to stock out.`;
        }
        // Rule 3: Fundamental Profitability
        else if (returnRate > 0.20) {
            action = "REDUCE SPEND";
            reason = `High Return Rate (${(returnRate * 100).toFixed(1)}% in sales_and_returns.csv). Even if ads look good, fulfillment fees on returns are destroying profits. Pause ads and fix product.`;
        }
        // Rule 4: Top of Funnel Issues (Bad CTR)
        else if (ctr < 0.003) {
            action = "OPTIMIZE LISTING";
            reason = `Poor Click-Through Rate (${(ctr * 100).toFixed(2)}%). Customers see the ad but don't click. Improve main image, title, or target more relevant keywords before spending more.`;
        }
        // Rule 5: Bottom of Funnel Issues (Bad CVR)
        else if (cvr < 0.05) {
            action = "OPTIMIZE LISTING";
            reason = `Poor Conversion Rate (${(cvr * 100).toFixed(1)}%). People click but don't buy. Improve listing details, A+ content, or lower price before scaling ads.`;
        }
        // Rule 6: Profitability Threshold (ACoS vs Break-Even)
        else if (acos > breakEvenAcos) {
            action = "REDUCE BIDS";
            reason = `Ads are unprofitable. Current ACoS (${(acos * 100).toFixed(1)}%) is higher than your Break-Even ACoS (${(breakEvenAcos * 100).toFixed(1)}%). Reduce keyword bids.`;
        }
        // Rule 7: Scaling Opportunity
        else if (acos < (breakEvenAcos - 0.05) && unitsInStock > 100) {
            action = "INCREASE BIDS & BUDGET";
            reason = `Golden Campaign! ACoS (${(acos * 100).toFixed(1)}%) is well below Break-Even (${(breakEvenAcos * 100).toFixed(1)}%). You are making pure profit on every sale. Scale up aggressively!`;
        }

        // Attach metrics for UI display
        recommendations.push({
            Product_ID: id,
            Product_Name: product.Product_Name,
            Campaign_ID: campaign.Campaign_ID,
            Action: action,
            Explanation: reason,
            Metrics: {
                Margin: `${(profitMargin * 100).toFixed(1)}%`,
                BreakEvenACoS: `${(breakEvenAcos * 100).toFixed(1)}%`,
                CurrentACoS: `${(acos * 100).toFixed(1)}%`,
                CVR: `${(cvr * 100).toFixed(1)}%`
            }
        });
    }

    return recommendations;
}
