export function generateRecommendations(products, inventory, sales, campaigns) {
    const recommendations = [];

    const findById = (array, id) => array.find(item => item.Product_ID === id) || {};

    for (const product of products) {
        const id = product.Product_ID;
        const inv = findById(inventory, id);
        const sale = findById(sales, id);
        const campaign = findById(campaigns, id);

        if (!campaign.Campaign_ID) continue;

        // --- 1. Extract Raw Data ---
        const sellingPrice = parseFloat(product.Selling_Price) || 0;
        const cost = parseFloat(product.Manufacturing_Cost) || 0;
        const fees = parseFloat(product.Amazon_Fees) || 0;
        const unitsInStock = parseInt(inv.Units_In_Stock) || 0;
        const unitsSold = parseInt(sale.Units_Sold) || 0;
        const unitsReturned = parseInt(sale.Units_Returned) || 0;
        const clicks = parseInt(campaign.Clicks) || 0;
        const impressions = parseInt(campaign.Impressions) || 0;
        const adSpend = parseFloat(campaign.Ad_Spend) || 0;
        const adSales = parseFloat(campaign.Ad_Sales) || 0;
        const adOrders = parseInt(campaign.Ad_Orders) || 0; // NEW: Advanced metric

        // --- 2. Calculate Advanced Professional Metrics ---
        // Profit Margin & Break-Even ACoS
        const profitPerUnit = sellingPrice - cost - fees;
        const profitMargin = sellingPrice > 0 ? (profitPerUnit / sellingPrice) : 0;
        const breakEvenAcos = profitMargin; // Golden rule of Amazon PPC: Break-Even ACoS = Profit Margin

        // Ad Performance Metrics
        const returnRate = unitsSold > 0 ? (unitsReturned / unitsSold) : 0;
        const acos = adSales > 0 ? (adSpend / adSales) : (adSpend > 0 ? 1.0 : 0);
        const ctr = impressions > 0 ? (clicks / impressions) : 0; // Click-Through Rate
        const cvr = clicks > 0 ? (adOrders / clicks) : 0;         // Conversion Rate

        let action = "WAIT";
        let reason = "The campaign is performing steadily. Let it run and monitor.";

        // --- 3. Execute Decision Rules (Priority Order) ---

        // Rule 0: Missing/Corrupt Data
        if (isNaN(sellingPrice) || isNaN(unitsInStock) || isNaN(clicks)) {
            action = "ERROR";
            reason = "Missing or corrupt data across CSV files. Cannot safely generate recommendation.";
        }
        // Rule 1: Statistical Significance
        else if (clicks < 50 || adSpend < 10) {
            action = "WAIT";
            reason = `Not enough data (Clicks: ${clicks}). Wait for at least 50 clicks to judge Conversion Rate (CVR).`;
        }
        // Rule 2: Inventory Health (Stock Out Risk)
        else if (unitsInStock < 20) {
            action = "REDUCE SPEND";
            reason = `Critical Stock Warning (${unitsInStock} units). Reduce ads to avoid paying for clicks on an item about to stock out.`;
        }
        // Rule 3: Fundamental Profitability
        else if (returnRate > 0.20) {
            action = "REDUCE SPEND";
            reason = `High Return Rate (${(returnRate * 100).toFixed(1)}%). Even if ads look good, fulfillment fees on returns are destroying profits. Pause ads and fix product.`;
        }
        // Rule 4: Top of Funnel Issues (Bad CTR)
        else if (ctr < 0.003) { // Less than 0.3% CTR
            action = "OPTIMIZE LISTING";
            reason = `Poor Click-Through Rate (${(ctr * 100).toFixed(2)}%). Customers see the ad but don't click. Improve main image, title, or target more relevant keywords before spending more.`;
        }
        // Rule 5: Bottom of Funnel Issues (Bad CVR)
        else if (cvr < 0.05) { // Less than 5% Conversion
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
