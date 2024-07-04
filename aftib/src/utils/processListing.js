export function checkRequiredData(listingData) {
  let requiredInputs = [
    "title",
    "description",
    "saleType",
    "propertyType",
    "size",
    "bedrooms",
    "bathrooms",
    "location",
    "state",
    "LGA",
    "ownerName",
    "ownerPhone",
    "ownerEmail",
    "propertyStatus"
  ];
  let pricingInputs = ["price", "monthlyRentPayment", "dailyShortLetPrice"];
  let success = { valid: true, message: "All required data are filled" };
  let failed = { valid: false, message: "" };
  let saleType = listingData["saleType"];
  if (
    (saleType == "For Sale" && listingData.price == "") ||
    (saleType == "For Rent" && listingData.monthlyRentPayment == "") ||
    (saleType == "Short Let" && listingData.dailyShortLetPrice == "")
  ) {
    failed.message = `${saleType} Pricing information has not been added`;
    return failed;
  }
  for (let each of requiredInputs) {
    if (listingData[each] == "") {
      failed.message = `${each} has not been added. Please check again`;
      return failed;
    }
  }
  return success;
}
