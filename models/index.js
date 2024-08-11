import Property from "./property.js";
import Price from "./price.js";
import Category from "./category.js";
import User from "./user.js";

Property.belongsTo(Price, { foreignKey: "priceId" });
Property.belongsTo(Category, { foreignKey: "categoryId" });
Property.belongsTo(User, { foreignKey: "userId" });

export { Property, Price, Category, User };
