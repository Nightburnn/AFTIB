import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getClientAccounts } from '../../../../utils/adminOpsRequests'; 
import './Vca.css';

const Vca = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1); // State to keep track of current page
  const [hasMore, setHasMore] = useState(true); // State to keep track if there are more results to load

  const fetchClientAccounts = async (page) => {
    try {
      const data = await getClientAccounts(page);
      console.log('Client accounts retrieved:', data); // Log client data to console
      setClients((prevClients) => [...prevClients, ...data]);
      if (data.length < 30) {
        setHasMore(false); // No more results if less than 30 are returned
      }
    } catch (error) {
      console.error("Error fetching client accounts:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClientAccounts(page);
  }, [page]);

  const handleShowMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  if (loading && page === 1) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container client">
      <div className="py-4">
        <h1 className="text-center">All Clients</h1>
        <h3 className="text-center">Below are the list of Clients.</h3>
      </div>
      <div className="row mt-4">
        {Array.isArray(clients) && clients.length > 0 ? (
          clients.map((client) => (
            <div className="col-md-6 mb-4" key={client._id}>
              <div className="card text-center">
                <div className="card-body">
                 
                  <div className="client-info">
                    <h5>Client Name</h5>
                    <p>{client.name}</p>
                    <h5>Phone Number:</h5>
                    <p>{client.mobileNumber}</p>
                  </div>
                  <Link to={`/Vcadetails/${client._id}`} className="btn blue btn-block">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>No Clients.</div>
        )}
      </div>
      {hasMore && (
        <div className="text-center mt-4">
          <button className="btn blue btn-block" onClick={handleShowMore}>
            Show More
          </button>
        </div>
      )}
    </div>
  );
};

export default Vca;
