"use strict"

function Building(address) {
  this.address = address;
  this.units = [];
}

Building.prototype.setManager = function(person) {
  if (person.constructor.name === "Manager") {
    this.manager = person;
  }
};

Building.prototype.getManager = function(){
  return this.manager;
};

Building.prototype.addTenant = function(unit, tenant) {
  if (this.manager &&
    tenant.constructor.name === "Tenant" &&
    tenant.references.length >= 2 &&
    this.units.indexOf(unit) !== -1 &&
    unit.available())
  {
    unit.tenant = tenant;
  }
};

Building.prototype.removeTenant = function(unit, tenant) {
  if(this.units.indexOf(unit) !== -1 &&
    unit.tenant === tenant &&
    this.manager)
  {
    unit.tenant = null;
  }
};

Building.prototype.availableUnits = function(){
  return this.units.filter(function(unit){
    return unit.available();
  });


};

Building.prototype.rentedUnits = function(){
   return this.units.filter(function(unit){
    return !unit.available();
  });
};

module.exports = Building;
