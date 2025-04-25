
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export interface Doctor {
  id: string; // Change to string as API returns string IDs
  name: string;
  photo: string; // Updated from image to photo
  speciality?: string[]; // For compatibility with older code
  specialty?: string[]; // New field to store mapped specialties
  experience: string; // Changed to string as API returns "X Years of experience"
  ratings?: number; // Optional as it might not be in API
  clinic: string; // Will store clinic name
  fees: string; // Changed to string as API returns "₹ XXX"
  address: string; // Will store formatted address
  moc: string; // Mode of consultation - "Video Consult" or "In Clinic"
}

type SortOption = "fees" | "experience" | null;
type ConsultationType = "Video Consult" | "In Clinic" | null;

interface APIDoctor {
  id: string;
  name: string;
  photo: string;
  specialities: Array<{name: string}>;
  experience: string;
  fees: string;
  clinic: {
    name: string;
    address: {
      locality: string;
      city: string;
      address_line1: string;
    }
  };
  video_consult: boolean;
  in_clinic: boolean;
}

export const useDoctorFiltering = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [allDoctors, setAllDoctors] = useState<Doctor[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [searchText, setSearchText] = useState("");
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [consultationType, setConsultationType] = useState<ConsultationType>(null);
  const [sortOption, setSortOption] = useState<SortOption>(null);
  const [allSpecialties, setAllSpecialties] = useState<string[]>([]);
  const [searchSuggestions, setSearchSuggestions] = useState<Doctor[]>([]);

  // Load doctors data from API
  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json");
        const data: APIDoctor[] = await response.json();
        
        // Map the API response to our Doctor interface
        const mappedDoctors: Doctor[] = data.map(doctor => {
          // Extract specialties from the specialities array
          const specialtyNames = doctor.specialities.map(spec => spec.name);
          
          // Determine mode of consultation
          let moc = "";
          if (doctor.video_consult && doctor.in_clinic) {
            moc = "Video Consult"; // Default to video if both are available
          } else if (doctor.video_consult) {
            moc = "Video Consult";
          } else if (doctor.in_clinic) {
            moc = "In Clinic";
          }
          
          // Format address
          const address = `${doctor.clinic.address.address_line1}, ${doctor.clinic.address.locality}, ${doctor.clinic.address.city}`;
          
          return {
            id: doctor.id,
            name: doctor.name,
            photo: doctor.photo,
            specialty: specialtyNames,
            speciality: specialtyNames, // For backward compatibility
            experience: doctor.experience,
            clinic: doctor.clinic.name,
            fees: doctor.fees,
            address: address,
            moc: moc
          };
        });
        
        setAllDoctors(mappedDoctors);
        
        // Extract all unique specialties
        const specialtiesSet = new Set<string>();
        mappedDoctors.forEach((doctor: Doctor) => {
          if (doctor.specialty) {
            doctor.specialty.forEach(spec => specialtiesSet.add(spec));
          }
        });
        setAllSpecialties(Array.from(specialtiesSet).sort());
        
        // Apply filters from URL
        applyFiltersFromURL(mappedDoctors);
      } catch (error) {
        console.error("Error fetching doctor data:", error);
        setAllDoctors([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  // Apply filters from URL params when component loads
  const applyFiltersFromURL = (doctors: Doctor[]) => {
    const querySearch = searchParams.get("search");
    const querySpecialties = searchParams.get("specialties")?.split(",").filter(Boolean);
    const queryConsultType = searchParams.get("consultationType") as ConsultationType;
    const querySortBy = searchParams.get("sortBy") as SortOption;

    if (querySearch) setSearchText(querySearch);
    if (querySpecialties) setSelectedSpecialties(querySpecialties);
    if (queryConsultType) setConsultationType(queryConsultType);
    if (querySortBy) setSortOption(querySortBy);
  };

  // Generate search suggestions based on input
  useEffect(() => {
    if (searchText.trim() === "") {
      setSearchSuggestions([]);
      return;
    }
    
    const filtered = allDoctors
      .filter(doctor => 
        doctor.name.toLowerCase().includes(searchText.toLowerCase()))
      .slice(0, 3);
    
    setSearchSuggestions(filtered);
  }, [searchText, allDoctors]);

  // Apply all filters and sort options to doctors list
  useEffect(() => {
    if (allDoctors.length === 0) return;

    let filtered = [...allDoctors];

    // Apply search filter
    if (searchText) {
      filtered = filtered.filter(doctor => 
        doctor.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // Apply consultation type filter
    if (consultationType) {
      filtered = filtered.filter(doctor => doctor.moc === consultationType);
    }

    // Apply specialty filters
    if (selectedSpecialties.length > 0) {
      filtered = filtered.filter(doctor => 
        doctor.specialty && selectedSpecialties.some(specialty => doctor.specialty?.includes(specialty))
      );
    }

    // Apply sorting
    if (sortOption === "fees") {
      filtered.sort((a, b) => {
        const feeA = parseInt(a.fees.replace(/[^\d]/g, '')) || 0;
        const feeB = parseInt(b.fees.replace(/[^\d]/g, '')) || 0;
        return feeA - feeB;
      });
    } else if (sortOption === "experience") {
      filtered.sort((a, b) => {
        const expA = parseInt(a.experience.replace(/[^\d]/g, '')) || 0;
        const expB = parseInt(b.experience.replace(/[^\d]/g, '')) || 0;
        return expB - expA; // Higher experience first
      });
    }

    setFilteredDoctors(filtered);

    // Update URL params
    const newParams = new URLSearchParams();
    
    if (searchText) newParams.set("search", searchText);
    if (selectedSpecialties.length > 0) newParams.set("specialties", selectedSpecialties.join(","));
    if (consultationType) newParams.set("consultationType", consultationType);
    if (sortOption) newParams.set("sortBy", sortOption);

    setSearchParams(newParams);
  }, [searchText, consultationType, selectedSpecialties, sortOption, allDoctors]);

  return {
    allDoctors,
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
  };
};
