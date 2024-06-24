import React from 'react';
import { useAuth } from '../../AuthContext';
import ListingReview from './ListingReview';
import AdminListings from './AdminDashboard';

const RoleListing = () => {
  const { user } = useAuth();

  if (!user) {
    return <div>Please log in</div>;
  }

  if (user.role === 'admin') {
    return <AdminListings />;
  }

  return <ListingReview />;
};

export default RoleListing;
