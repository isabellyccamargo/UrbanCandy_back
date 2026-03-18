import Users from "./Users.js";
import People from "./People.js";
import Address from "./Address.js";

const setupAssociations = () => {
  Users.hasOne(People, { foreignKey: "id_user", as: "people" }); 
  
  People.belongsTo(Users, { foreignKey: "id_user", as: "user" });
  People.belongsTo(Address, { foreignKey: "id_address", as: "address" });
  Address.hasMany(People, { foreignKey: "id_address", as: "residents" });
};

export { setupAssociations };