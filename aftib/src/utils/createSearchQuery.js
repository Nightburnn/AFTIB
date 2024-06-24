import axios from "axios";
// Transform Parameters
// location is fine the way it is.
// saleType is given in the raw format of Buy, Rent, Checkout, and Hotel. all options are okay, but the 'Buy' should be transformed to 'Sale'
// property type has raw format of 'House', 'Apartment', 'Condo', 'Land'
// bedroom raw format '1 Bedroom', '2 Bedrooms', '3 Bedrooms', '4 Bedrooms', '5 Bedrooms', '6 Bedrooms', '7 Bedroom', '8 Bedrooms', '9 Bedrooms', '10 Bedrooms'. Values should be transformmed to only numbers. 1,2,3.... and so on.
// bathroom raw format has a similar format to bedroom such as '1 bathroom'. also transform to a number.
// minPrice raw format if it is a saleType other than Rent, then the returned object should include the minPrice and Max.
// maxPrice raw format 'Number' so to convert it to number, call Number('Number')
// note if the type is rent, then the returned object should not have minPrice and maxPrice, instead the returned object should have minMonthlyPayment and maxMonthlyPaymen

export function transformSearchOptions({ location, saleType, propertyType, bedroom, bathroom, minPrice, maxPrice }) {
    // Transform saleType: 'Buy' should become 'Sale'
    let transformedSaleType = saleType === 'buy' ? 'sale' : saleType;
    
    // Transform bedroom: extract the number from the string
    let transformedBedroom = parseInt(bedroom);
    if(Number.isNaN(transformedBedroom)){
        transformedBedroom = 1
    }
    
    // Transform bathroom: extract the number from the string
    let transformedBathroom = parseInt(bathroom);
    if(Number.isNaN(transformedBathroom)){
        transformedBathroom = 1
    }
    // Transform minPrice and maxPrice if the saleType is not 'Rent'
    if(minPrice.indexOf('million') !== -1) {
        minPrice = parseInt(minPrice) * 1000000
    }
    else if(minPrice == ''){
        minPrice = ''
    }
    else {
        minPrice = Number(minPrice.split(',').join(''))
    }
    if(maxPrice.indexOf('million') !== -1) {
        maxPrice = parseInt(maxPrice) * 1000000
    }
    else if(maxPrice == ''){
        maxPrice = ''
    }
    else {
        maxPrice = Number(maxPrice.split(',').join(''))
    }

    // Build the transformed object
    let transformedObject = {
        location: location,
        saleType: transformedSaleType,
        propertyType: propertyType,
        bedroom: transformedBedroom,
        bathroom: transformedBathroom
    }

    // Include minPrice and maxPrice if not Rent
    if (transformedSaleType !== 'rent') {
        transformedObject.minPrice = minPrice;
        transformedObject.maxPrice = maxPrice;
    } else {
        transformedObject.minMonthlyPayment = minPrice;
        transformedObject.maxMonthlyPayment = maxPrice;
    }
    return transformedObject;
}

export function createSearchQuery (params) {
    let {location,saleType,propertyType,bedroom,bathroom,minPrice,maxPrice,minMonthlyPayment,maxMonthlyPayment} = params
    let queryArr = []
    const createQuery = (option, value) =>{
      let bool  = !!value && value !== 'NaN'
       return bool ? `${option}=${value}` : null
      };
      for(let each of Object.keys(params)){
        queryArr.push(createQuery(each,params[each]))
      }
      return queryArr.filter(x=> x ).join('&')
  }

  export async function searchRequest (query){
    return axios.get(`http://127.0.0.1:8080/listing/searchListings?${query}`)
  }