function Unit (number, building, sqft, rent, tenant) {
  this.number = number;
  this.building = building;
  this.sqft = sqft;
  this.rent = rent;
  // ...
  this.tenant = null;
  // ...
}

Unit.prototype.available = function(){
  // if(!this.tenant){
  //   return true;
  // }
  // else{
  //   return false;
  // }
  return !(this.tenant);
};

// export the module
module.exports = Unit;

