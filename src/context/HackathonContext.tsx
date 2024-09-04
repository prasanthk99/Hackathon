import React, { createContext, useState, ReactNode, ReactElement, useContext } from 'react';


import CardImage1 from '../assets/cardimage/Group 1000002466.png'
import CardImage2 from '../assets/cardimage/Group 1000002766.png'
import CardImage3 from '../assets/cardimage/Group 1000002767.png'
import CardImage4 from '../assets/cardimage/Group 1000002771.png'


interface Hackathon {
  id: string;
  name: string;
  description: string;
  level: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  image: File | string;
  status: string | undefined;
}

interface HackathonContextType {
  hackathons: Hackathon[];
  addHackathon: (data: Hackathon) => void;
  deleteHackathon: (id: string) => void;
  updateHackathon: (id: string, data: Hackathon) => void;
  getHackathonStatus : (hackathon:Hackathon) => string;
}

const HackathonContext = createContext<HackathonContextType | undefined>(undefined);

// Sample Data
let sampleData = [
    {
        id: "1",
        name: "Hackhounds",
        description: "Butterflies are the adult flying stage of certain insects belonging to an order or group called Lepidoptera. The word Lepidoptera means scaly wings in Greek. This name perfectly suits the insects in this group because their wings are covered with thousands of tiny scales overlapping in rows",
        level: "Easy",
        startDate: "2024-09-05",
        endDate: "2024-06-10",
        startTime:"17:39",
        endTime: "08:39",
        image: CardImage1,
        status: "Active",
    },
    {
        id: "2",
        name: "Creative Tech Brains",
        description: "Butterflies are the adult flying stage of certain insects belonging to an order or group called Lepidoptera. The word Lepidoptera means scaly wings in Greek. This name perfectly suits the insects in this group because their wings are covered with thousands of tiny scales overlapping in rows",
        level: "Medium",
        startDate: "2024-09-02",
        endDate: "2024-01-15",
        startTime:"17:39",
        endTime: "22:24",
        image: CardImage2,
        status: "Upcoming",
    },
    {
        id: "3",
        name: "The Code Rangers",
        description: "Butterflies are the adult flying stage of certain insects belonging to an order or group called Lepidoptera. The word Lepidoptera means scaly wings in Greek. This name perfectly suits the insects in this group because their wings are covered with thousands of tiny scales overlapping in rows",
        level: "Hard",
        startDate: "2024-09-10",
        endDate: "2024-10-10",
        startTime:"17:39",
        endTime: "08:39",
        image: CardImage3,
        status: "Past",
    },
    {
        id: "4",
        name: "Marathon Hackers",
        description: "Butterflies are the adult flying stage of certain insects belonging to an order or group called Lepidoptera. The word Lepidoptera means scaly wings in Greek. This name perfectly suits the insects in this group because their wings are covered with thousands of tiny scales overlapping in rows",
        level: "Medium",
        startDate: "2024-09-05",
        endDate: "2024-10-25",
        startTime:"17:39",
        endTime: "08:39",
        image: CardImage4,
        status: "Past",
    },
    {
      id: "5",
      name: "Active Challenge",
      description: "Butterflies are the adult flying stage of certain insects belonging to an order or group called Lepidoptera. The word Lepidoptera means scaly wings in Greek. This name perfectly suits the insects in this group because their wings are covered with thousands of tiny scales overlapping in rows",
      level: "Medium",
      startDate: "2024-09-03",
      endDate: "2024-09-25",
      startTime:"17:39",
      endTime: "08:39",
      image: CardImage4,
      status: "Past",
  }
]

const HackathonProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [hackathons, setHackathons] = useState<Hackathon[]>(sampleData || []);

  // Function to Add hackathon
  function addHackathon(data: Hackathon) {
    setHackathons((prev) => [...prev, data]);
  }

  // Function to Delete hackathon
  function deleteHackathon(id: string) {
    setHackathons((prev) => prev.filter((hackathon) => hackathon.id !== id));
  }

  // Function to Update hackathon
  function updateHackathon(id: string, data: Hackathon) {
    setHackathons((prev) => prev.map((hackathon) =>
      hackathon.id === id ? { ...hackathon, ...data } : hackathon
    ));
  }

  // Function to get hackathon current status
  const getHackathonStatus = (hackathon:Hackathon) => {
    const startDateTime = new Date(
      `${hackathon.startDate}T${hackathon.startTime}`
    );
    const endDateTime = new Date(`${hackathon.endDate}T${hackathon.endTime}`);
    const Now = new Date().getTime();
    let diff = startDateTime.getTime() - Now;
    if (endDateTime.getTime() < Now) {
      return "Past";
    } else if (startDateTime.getTime() > Now) {
      return "Upcoming";
    } else {
      return "Active";
    }
  };

  return (
    <HackathonContext.Provider value={{ hackathons, addHackathon, deleteHackathon, updateHackathon, getHackathonStatus }}>
      {children}
    </HackathonContext.Provider>
  );
}

// Create a custom hook for easy context access
const useHackathonContext = (): HackathonContextType => {
    const context = useContext(HackathonContext);
    if (context === undefined) {
      throw new Error('useHackathonContext must be used within a HackathonProvider');
    }
    return context;
  };
  

export { HackathonProvider, useHackathonContext };
