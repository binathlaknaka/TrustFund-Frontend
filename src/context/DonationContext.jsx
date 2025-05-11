import React, { createContext, useState, useContext, useEffect } from 'react';

const DonationContext = createContext();

export const DonationProvider = ({ children }) => {
  const [charities, setCharities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCharities = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/users?role=charity');
        if (!response.ok) {
          throw new Error('Failed to fetch charities');
        }
        const data = await response.json();

        // OPTIONAL: Attach an empty ongoingCharities array if not present
        const formattedData = data.map(charity => ({
          ...charity,
          ongoingCharities: charity.ongoingCharities || [],
        }));

        setCharities(formattedData);
      } catch (error) {
        console.error('Error fetching charities:', error);
        setCharities([]);  // fallback to empty list on error
      } finally {
        setLoading(false);
      }
    };

    fetchCharities();
  }, []);

  const updateDonation = (charityId, orgId, amount) => {
    setCharities(prev =>
      prev.map(charity =>
        charity._id === charityId
          ? {
              ...charity,
              ongoingCharities: charity.ongoingCharities.map(org =>
                org.id === orgId ? { ...org, raised: (org.raised || 0) + amount } : org
              ),
            }
          : charity
      )
    );
  };

  return (
    <DonationContext.Provider value={{ charities, updateDonation, loading }}>
      {children}
    </DonationContext.Provider>
  );
};

export const useDonation = () => useContext(DonationContext);
