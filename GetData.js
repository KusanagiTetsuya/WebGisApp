const webgisData = require('./assets/db_itabashi.json');

webgisData.forEach(function(elem){
    console.log(elem.did);
})

// for (let i = 0; i < array.length; i++) {
//     const obj = array[i];
//     const getDid = (obj.did != undefined) ? obj.did : null;
// }