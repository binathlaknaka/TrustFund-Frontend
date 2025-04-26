import React, { createContext, useState, useContext } from 'react';
import CharityImageTemp from '../assets/charity.png';
const initialCharities = [
  {
    id: 1,
    name: "World Health Fund",
    imageSrc: CharityImageTemp,
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the",
    ongoingCharities: [
      {
        id: 101,
        name: "Organization Name",
        imageSrc: CharityImageTemp,
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the",
        raised: 600,
        goal: 1000
      },
      {
        id: 102,
        name: "Organization Name",
        imageSrc: CharityImageTemp,
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the",
        raised: 750,
        goal: 1000
      }
    ]
  },
  {
    id: 2,
    name: "Education For All",
    imageSrc: CharityImageTemp,
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the",
    ongoingCharities: [
      {
        id: 201,
        name: "Organization Name",
        imageSrc: CharityImageTemp,
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the",
        raised: 400,
        goal: 1000
      },
      {
        id: 202,
        name: "Organization Name",
        imageSrc: CharityImageTemp,
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the",
        raised: 850,
        goal: 1000
      }
    ]
  },
  {
    id: 3,
    name: "Clean Water Project",
    imageSrc: CharityImageTemp,
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the",
    ongoingCharities: [
      {
        id: 301,
        name: "Organization Name",
        imageSrc: CharityImageTemp,
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the",
        raised: 300,
        goal: 1000
      },
      {
        id: 302,
        name: "Organization Name",
        imageSrc: CharityImageTemp,
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the",
        raised: 500,
        goal: 1000
      }
    ]
  },
  {
    id: 4,
    name: "Animal Rescue League",
    imageSrc: CharityImageTemp,
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the",
    ongoingCharities: [
      {
        id: 401,
        name: "Organization Name",
        imageSrc: CharityImageTemp,
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the",
        raised: 700,
        goal: 1000
      },
      {
        id: 402,
        name: "Organization Name",
        imageSrc: CharityImageTemp,
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the",
        raised: 900,
        goal: 1000
      }
    ]
  },
  {
    id: 5,
    name: "Hunger Relief Network",
    imageSrc: CharityImageTemp,
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the",
    ongoingCharities: [
      {
        id: 501,
        name: "Organization Name",
        imageSrc: CharityImageTemp,
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the",
        raised: 350,
        goal: 1000
      },
      {
        id: 502,
        name: "Organization Name",
        imageSrc: CharityImageTemp,
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the",
        raised: 800,
        goal: 1000
      }
    ]
  },
  {
    id: 6,
    name: "Climate Action Now",
    imageSrc: CharityImageTemp,
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the",
    ongoingCharities: [
      {
        id: 601,
        name: "Organization Name",
        imageSrc: CharityImageTemp,
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the",
        raised: 450,
        goal: 1000
      },
      {
        id: 602,
        name: "Organization Name",
        imageSrc: CharityImageTemp,
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the",
        raised: 650,
        goal: 1000
      }
    ]
  }
];

const DonationContext = createContext();

export const DonationProvider = ({ children }) => {
  const [charities, setCharities] = useState(initialCharities);

  const updateDonation = (charityId, orgId, amount) => {
    setCharities(prevCharities => {
      return prevCharities.map(charity => {
        if (charity.id === parseInt(charityId)) {
          return {
            ...charity,
            ongoingCharities: charity.ongoingCharities.map(org => {
              if (org.id === orgId) {
                return {
                  ...org,
                  raised: org.raised + amount
                };
              }
              return org;
            })
          };
        }
        return charity;
      });
    });
  };

  return (
    <DonationContext.Provider value={{ charities, updateDonation }}>
      {children}
    </DonationContext.Provider>
  );
};

export const useDonation = () => useContext(DonationContext);