
 interface CouponAttributes {
    id: number;
    code: string;
    discount: number;
    expiryDate: Date;
    isActive: boolean;
  }
  
 interface CouponCreationAttributes extends Omit<CouponAttributes, 'id'> {}
  
 export {CouponCreationAttributes , CouponAttributes }