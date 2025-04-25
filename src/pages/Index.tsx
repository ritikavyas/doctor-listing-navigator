
import React from 'react';
import SearchHeader from '../components/SearchHeader';
import FilterPanel from '../components/FilterPanel';
import DoctorList from '../components/DoctorList';
import { useDoctorFiltering } from '../hooks/useDoctorFiltering';

const Index = () => {
  const {
    filteredDoctors,
    loading,
    searchText,
    setSearchText,
    searchSuggestions,
    allSpecialties,
    selectedSpecialties,
    setSelectedSpecialties,
    consultationType,
    setConsultationType,
    sortOption,
    setSortOption
  } = useDoctorFiltering();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <SearchHeader 
        searchText={searchText}
        setSearchText={setSearchText}
        suggestions={searchSuggestions}
      />
      
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filter sidebar */}
          <div className="lg:w-1/4 w-full">
            <FilterPanel 
              allSpecialties={allSpecialties}
              selectedSpecialties={selectedSpecialties}
              setSelectedSpecialties={setSelectedSpecialties}
              consultationType={consultationType}
              setConsultationType={setConsultationType}
              sortOption={sortOption}
              setSortOption={setSortOption}
            />
          </div>
          
          {/* Doctor listing */}
          <div className="lg:w-3/4 w-full">
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-gray-800">
                {loading ? 'Finding doctors...' : 
                  `${filteredDoctors.length} Doctor${filteredDoctors.length !== 1 ? 's' : ''} Found`
                }
              </h2>
              {selectedSpecialties.length > 0 && (
                <p className="text-sm text-gray-600 mt-1">
                  Filtered by: {selectedSpecialties.join(', ')}
                  {consultationType && ` • ${consultationType}`}
                  {sortOption && ` • Sorted by ${sortOption === 'fees' ? 'fees (low to high)' : 'experience (high to low)'}`}
                </p>
              )}
            </div>
            
            <DoctorList doctors={filteredDoctors} loading={loading} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
