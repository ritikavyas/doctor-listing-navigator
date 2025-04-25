
import React from 'react';
import DoctorCard from './DoctorCard';
import { Doctor } from '../hooks/useDoctorFiltering';
import { Progress } from './ui/progress';

interface DoctorListProps {
  doctors: Doctor[];
  loading: boolean;
}

const DoctorList: React.FC<DoctorListProps> = ({ doctors, loading }) => {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-48 animate-fade-in">
        <Progress value={30} className="w-[60%] animate-pulse" />
        <p className="text-medical-primary mt-4">Loading doctors...</p>
      </div>
    );
  }

  if (doctors.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center animate-fade-in">
        <h3 className="text-xl font-semibold mb-2">No doctors found</h3>
        <p className="text-gray-500">Try adjusting your search or filters to find more doctors.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {doctors.map((doctor, index) => (
        <div key={doctor.id} style={{ animationDelay: `${index * 100}ms` }}>
          <DoctorCard doctor={doctor} />
        </div>
      ))}
    </div>
  );
};

export default DoctorList;
