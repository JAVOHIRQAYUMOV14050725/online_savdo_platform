export interface UserAnalytics {
    totalUsers: number;
    activeUsers: number;
    newUsersToday: number;
}
export interface OrderAnalytics {
    totalOrders: number;
    ordersToday: number;
    pendingOrders: number;
}
export interface ProductSales {
    totalProductsSold: number;
    salesToday: number;
    bestSellingProduct: string;
}
export interface SiteVisits {
    totalVisits: number;
    uniqueVisitors: number;
    visitsToday: number;
}
