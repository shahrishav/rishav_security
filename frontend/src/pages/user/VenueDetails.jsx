import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getVenuesByCategory } from '../../apis/Api';
import VenueCard from '../../components/VenueCard';

const VenueDetails = () => {
    const { categoryId } = useParams(); // Get the categoryId from the URL params
    const [venues, setVenues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const limit = 3; // Only one venue per page
    const [totalPages, setTotalPages] = useState(1); // Total number of pages

    useEffect(() => {
        fetchVenues();
    }, [categoryId, page]);

    const fetchVenues = async () => {
        setLoading(true);
        try {
            const res = await getVenuesByCategory(categoryId, page, limit);
            setVenues(res.data.data); // Assuming your API returns the list in res.data.data
            const totalItems = res.data.totalItems || 0; // Assuming API provides total items count
            setTotalPages(Math.ceil(totalItems / limit));
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch venues:', error);
            setLoading(false);
        }
    };

    const handlePreviousPage = () => {
        if (page > 1) setPage(page - 1);
    };

    const handleNextPage = () => {
        if (page < totalPages) setPage(page + 1);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Venues in This Category</h2>
            <div className="row row-cols-1 row-cols-md-4 g-4">
                {
                    venues.length > 0 ? (
                        venues.map((venue) => (
                            <div className="col" key={venue._id}>
                                <VenueCard venueInformation={venue} />
                            </div>
                        ))
                    ) : (
                        <p>No venues found for this category.</p>
                    )
                }
            </div>
            <div style={styles.pagination}>
                <button 
                    onClick={handlePreviousPage} 
                    disabled={page === 1}
                    style={styles.paginationButton}
                >
                    Previous
                </button>
                <span>Page {page} of {totalPages}</span>
                <button 
                    onClick={handleNextPage} 
                    disabled={page === totalPages}
                    style={styles.paginationButton}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

const styles = {
  container: {
    padding: '20px',
    background: '#f4f7fa',
    fontFamily: "'Roboto', sans-serif",
    color: '#333'
  },
  title: {
    fontSize: '28px',
    marginBottom: '20px',
    color: '#333',
    borderBottom: '2px solid #ff9900',
    paddingBottom: '5px'
  },
  venueList: {
    listStyle: 'none',
    padding: 0
  },
  venueItem: {
    padding: '15px',
    marginBottom: '10px',
    borderRadius: '8px',
    background: '#fff',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  venueImage: {
    marginTop: '10px',
    width: '100%',
    height: 'auto',
    borderRadius: '8px'
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '20px',
  },
  paginationButton: {
    padding: '10px 15px',
    margin: '0 10px',
    background: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background 0.3s',
    disabled: {
      background: '#ccc',
      cursor: 'not-allowed',
    }
  }
};

export default VenueDetails;
