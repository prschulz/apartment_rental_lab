"use strict"
var menu = require('node-menu');
var app = require('./app.js');

var building = new app.Building("Waterfront Tower");
var people = [];
var taco = building;

// Helper functions
var personFinder = function (name) {
  for (var i = 0; i < people.length; i++) {
    if(people[i].name === name){
      return people[i];
    }
  }
  return null;
};

var unitFinder = function (unit_number) {
  for (var i = 0; i < building.units.length; i++) {
    if(building.units[i].number === unit_number){
      return building.units[i];
    }
  }
};

// Add some seed data

people.push(new app.Person("Anna Adams", "765-4321"));
people.push(new app.Tenant("Devin Daniels", "765-1234"));
people.push(new app.Tenant("Steve Smith", "744-1234"));

building.units.push(new app.Unit("12", building, 400, 2000));
building.units.push(new app.Unit("13", building, 800, 3000));
building.units.push(new app.Unit("14", building, 1800, 4500));

// --------------------------------
menu.addDelimiter('-', 40, building.address + " rental app");

//NEED TO IMPLEMENT THE FUNCTION!!!

menu.addItem('Add manager',
  function(name, contact) {
    var aManager = new app.Manager(name, contact);
    aManager.addBuilding(building);
    building.setManager(aManager);
    people.push(new app.Manager(name, contact));
  },
  null,
  [{'name': 'name', 'type': 'string'}, {'name': 'contact', 'type': 'string'}]
);

menu.addItem('Add tenant',
  function(name, contact) {
    people.push(new app.Tenant(name, contact));
  },
  null,
  [{'name': 'name', 'type': 'string'}, {'name': 'contact', 'type': 'string'}]
);

menu.addItem('Show tenants:',
  function() {
    for (var i = 0; i <= people.length; i++) {
      if (people[i] instanceof app.Tenant){
        console.log("\n" + people[i].name + " " + people[i].contact);
        var references = people[i].references;
        if(!references) {continue;}
        for (var j = references.length - 1; j >= 0; j--) {
          console.log("-> Reference: " + references[j].name + " " + references[j].contact);
        };
      }
    }
  }
);

menu.addItem('Add unit',
  function(number, sqft, rent) {
    var aUnit = new app.Unit(number, building, sqft, rent);
    building.units.push(aUnit);
  },
  null,
  [{'name': 'number', 'type': 'string'},
    {'name': 'sqft', 'type': 'numeric'},
    {'name': 'rent', 'type': 'numeric'}]
);

menu.addItem('Show all units',
  function() {
    for(var i = building.units.length - 1; i >= 0; i--) {
      console.log(" tenant: " + building.units[i].tenant +
      			  " num: " + building.units[i].number +
                  " sqft: " + building.units[i].sqft +
                  " rent: $" + building.units[i].rent);
    }
  }
);

menu.addItem('Show available units',
  function() {

      console.log(taco.availableUnits());

    }
);


menu.addItem('(implement me) Add tenant reference',
  function(tenant_name, ref_name, ref_contact) {
    var tenant = personFinder(tenant_name);
    if(tenant !== null){
      var ref = findPerson(ref_name);
      console.log("You checked for a ref_name");
      if (ref !== null) {
        tenant.addReference(ref);
        consol.log("REFERENCE ADDED!!!")
      } else {
        console.log("ERROR: REFERENCE doesn't exist. Creepy...");
      }
    }else {
      console.log("ERROR: TENANT doesn't exist")
    }

    console.log("Implement me. Show error if tenant is unknown. Note: a reference is a person");
  },
  null,
    [{'name': 'tenant_name', 'type': 'string'},
    {'name': 'ref_name', 'type': 'string'},
    {'name': 'ref_contact', 'type': 'string'}]
);

menu.addItem('(implement me) Move tenant in unit',
  function(unit_number, tenant_name) {
      // find tenant and unit objects, use building's addTenant() function.
      var tenant = findPerson(tenant_name);
      var unit = findUnit(unit_number);
      if(unit.available() && tenant !== null){
        building.addTenant(unit,tenant);
        console.log(tenant_name+" is now a tenant of unit # "+unit_number);
      }
      console.log("Implement me.");
    },
    null,
    [{'name': 'unit_number', 'type': 'string'},
    {'name': 'tenant_name', 'type': 'string'}]
);

menu.addItem('(implement me) Evict tenant',
  function(tenant_name) {
      // Similar to above, use building's removeTenant() function.
      var tenant = findPerson(tenant_name);
      if (tenant !== null){
        for (var i = 0; i < building.units.length; i++) {
          if(building.units[i].tenant === tenant_name){
            var unit = building.units[i];
            building.removeTenant(unit,tenant);
            console.log("You have removed "+tenant+" from "+unit);
          }
        }
      } else {
        console.log("This person is not a tenant");
      }
    },
    null,
    [{'name': 'tenant_name', 'type': 'string'}]
);

menu.addItem('(implement me) Show total sqft rented',
  function() {
    var total = 0;
    building.units.forEach(function(unit){
      if (unit.tenant !== null){
        total += unit.sqft;
      }
    });
    console.log(total+"sqft has been rented");
    }
);

menu.addItem('(implement me) Show total yearly income',
  function() {
      // Note: only rented units produce income
      var income = 0;
      building.units.forEach(function(unit){
        if (unit.tenant !== null){
          income += unit.rent;
        }
      });
    }
);

menu.addItem('(Add your own feature ...)',
  function() {
      console.log("Implement a feature that you find is useful");
    }
);

// *******************************
menu.addDelimiter('*', 40);

menu.start();