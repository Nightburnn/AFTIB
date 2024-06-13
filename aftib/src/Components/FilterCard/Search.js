import axios from 'axios';

function searchRequest({ location, minPrice, maxPrice, beds, baths }) {
  const endpoint = 'http://localhost:8080/listing/searchListings';

  // Create query parameters
  const createQuery = (option, value) => (value ? `${option}=${value}` : '');

  const queryParams = [
    createQuery('location', location),
    createQuery('priceRangeMin', minPrice),
    createQuery('priceRangeMax', maxPrice),
    createQuery('bedRooms', beds),
    createQuery('bathRooms', baths)
  ].filter(param => param !== '');

  // Build the full query string
  const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';

  // Send the request with axios
  axios.get(`${endpoint}${queryString}`)
    .then(response => {
      console.log('Search results:', response.data);
      // Handle response data as needed
    })
    .catch(error => {
      console.error('There was an error with the search request:', error);
    });
}
