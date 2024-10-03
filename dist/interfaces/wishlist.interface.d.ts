interface WishlistAttributes {
    id: number;
    userId: number;
    productId: number;
    addedDate: Date;
}
interface WishlistCreationAttributes extends Omit<WishlistAttributes, 'id' | 'addedDate'> {
}
export { WishlistCreationAttributes, WishlistAttributes };
