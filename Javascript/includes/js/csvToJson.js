var Converter = require("csvtojson").Converter;
var converter = new Converter({});
converter.fromFile("includes/data/Production-Department_of_Agriculture_and_Cooperation_1.csv",
  function(err,result){
len=result.length;
//console.log(result);
var fs = require('fs');
var key = '3-2013';
var oilseeds = new Array();
var foodGrains = new Array();
var commercial = new Array();
var riceSouth = new Array();

var searchVariable = ["Agricultural Production Oilseeds","Agricultural Production Commercial Crops",
                        "Agricultural Production Foodgrains Rice Area"];

var southStates = ["Andhra Pradesh","Karnataka","Kerala","Tamil Nadu"];

var obj;
var str;
for(var i=0;i<len;i++){
  obj = result[i];
  if(obj.Particulars.indexOf(searchVariable[0]) > -1){
    //console.log(obj[key]);
      String.prototype.replaceBetween = function(start, end, what) {
        return this.substring(0, start) + what + this.substring(end);
      };

    oilseeds.push({
      "Particulars" : obj.Particulars.replaceBetween(0, 33, ""),
      "Production" : obj[key]
    });
  }
}

for(var i=0;i<len;i++){
  obj = result[i];
  if(obj.Particulars == 'Agricultural Production Foodgrains Rice' ||
      obj.Particulars == 'Agricultural Production Foodgrains Wheat Rabi' ||
      obj.Particulars == 'Agricultural Production Foodgrains Jowar' ||
      obj.Particulars == 'Agricultural Production Foodgrains Bajra Kharif' ||
      obj.Particulars == 'Agricultural Production Foodgrains Maize' ||
      obj.Particulars == 'Agricultural Production Foodgrains Ragi Kharif' ||
      obj.Particulars == 'Agricultural Production Foodgrains Small Millets Kharif' ||
      obj.Particulars == 'Agricultural Production Foodgrains Barley Rabi' ||
      obj.Particulars == 'Agricultural Production Foodgrains Coarse Cereals' ||
      obj.Particulars == 'Agricultural Production Foodgrains Cereals' ||
      obj.Particulars == 'Agricultural Production Foodgrains Tur Kharif' ||
      obj.Particulars == 'Agricultural Production Foodgrains Other Kharif Pulses Kharif' ||
      obj.Particulars == 'Agricultural Production Foodgrains Gram Rabi' ||
      obj.Particulars == 'Agricultural Production Foodgrains Pulses'){
    //console.log(obj[key]);
    foodGrains.push({
      "Particulars" : obj.Particulars.replaceBetween(0, 35, ""),
      "Production" : obj[key]
    });
  }
}



var x = result[0];
var keys = Object.keys(x);
for(var j in keys){
  var sum = 0;
  for(var i=0;i<len;i++){
    obj = result[i];
    if(obj.Particulars.indexOf(searchVariable[1]) > -1){
        if ( keys[j] !== "Particulars" && keys[j] !== "Unit" && keys[j] !== "Frequency" ) {
          if(obj[keys[j]]!=="NA") {
            sum += parseFloat (obj[keys[j]]);
          }
        }
    }

  }
  if ( keys[j] !== "Particulars" && keys[j] !== "Unit" && keys[j] !== "Frequency" ) {
    commercial.push({
      "Year" : keys[j],
      "Production" : sum
    });
  }
}

var southlen = southStates.length;

for(var j in keys){
  var rice = new Array();
  for(var i=0;i<len;i++){
    obj = result[i];
    for(var k=0;k<southlen;k++){
      if(obj.Particulars.indexOf(searchVariable[0]) > -1 && obj.Particulars.indexOf(southStates[k])){
        //console.log(obj);
          if ( keys[j] !== "Particulars" && keys[j] !== "Unit" && keys[j] !== "Frequency" ) {
            if(obj[keys[j]]=="NA") {
              rice.push(0);
            }
            else {
              rice.push(obj[keys[j]]);
            }
          }
      }
    }

  }
  if ( keys[j] !== "Particulars" && keys[j] !== "Unit" && keys[j] !== "Frequency" ) {
    riceSouth.push({
      "Year" : keys[j],
      "Andhra Pradesh" : rice[0],
      "Karnataka" : rice[1],
      "Kerala" : rice[2],
      "Tamil Nadu" : rice[3]
    });
  }
}

fs.writeFile(

    './includes/json/oilseeds.json',

    JSON.stringify(oilseeds),

    function (err) {
        if (err) {
            console.error('Error in file Writing');
        }
    }
);

fs.writeFile(

    './includes/json/foodGrains.json',

    JSON.stringify(foodGrains),

    function (err) {
        if (err) {
            console.error('Error in file Writing');
        }
    }
);

fs.writeFile(

    './includes/json/commercial.json',

    JSON.stringify(commercial),

    function (err) {
        if (err) {
            console.error('Error in file Writing');
        }
    }
);

fs.writeFile(

    './includes/json/riceSouth.json',

    JSON.stringify(riceSouth),

    function (err) {
        if (err) {
            console.error('Error in file Writing');
        }
    }
);


});
