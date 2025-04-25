import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Checkbox } from './ui/checkbox';
import { ScrollArea } from './ui/scroll-area';

interface FilterPanelProps {
  allSpecialties: string[];
  selectedSpecialties: string[];
  setSelectedSpecialties: (specialties: string[]) => void;
  consultationType: "Video Consult" | "In Clinic" | null;
  setConsultationType: (type: "Video Consult" | "In Clinic" | null) => void;
  sortOption: "fees" | "experience" | null;
  setSortOption: (option: "fees" | "experience" | null) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  allSpecialties,
  selectedSpecialties,
  setSelectedSpecialties,
  consultationType,
  setConsultationType,
  sortOption,
  setSortOption
}) => {
  const handleSpecialtyChange = (specialty: string) => {
    if (selectedSpecialties.includes(specialty)) {
      setSelectedSpecialties(selectedSpecialties.filter(s => s !== specialty));
    } else {
      setSelectedSpecialties([...selectedSpecialties, specialty]);
    }
  };

  return (
    <Card className="animate-fade-in">
      <CardContent className="p-6 space-y-6">
        {/* Consultation Type Filter */}
        <div className="space-y-3">
          <CardHeader className="p-0">
            <CardTitle className="text-lg font-semibold" data-testid="filter-header-moc">
              Consultation Mode
            </CardTitle>
          </CardHeader>
          <RadioGroup
            value={consultationType || ""}
            onValueChange={(value) => setConsultationType(value as "Video Consult" | "In Clinic" | null)}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Video Consult" id="video-consult" data-testid="filter-video-consult" />
              <Label htmlFor="video-consult">Video Consult</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="In Clinic" id="in-clinic" data-testid="filter-in-clinic" />
              <Label htmlFor="in-clinic">In Clinic</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Sort Options */}
        <div className="space-y-3">
          <CardHeader className="p-0">
            <CardTitle className="text-lg font-semibold" data-testid="filter-header-sort">
              Sort By
            </CardTitle>
          </CardHeader>
          <RadioGroup
            value={sortOption || ""}
            onValueChange={(value) => setSortOption(value as "fees" | "experience" | null)}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="fees" id="sort-fees" data-testid="sort-fees" />
              <Label htmlFor="sort-fees">Fees (Low to High)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="experience" id="sort-experience" data-testid="sort-experience" />
              <Label htmlFor="sort-experience">Experience (High to Low)</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Specialties Filter */}
        <div className="space-y-3">
          <CardHeader className="p-0">
            <CardTitle className="text-lg font-semibold" data-testid="filter-header-speciality">
              Speciality
            </CardTitle>
          </CardHeader>
          <ScrollArea className="h-[300px] pr-4">
            <div className="space-y-2">
              {allSpecialties.map(specialty => (
                <div key={specialty} className="flex items-center space-x-2">
                  <Checkbox
                    id={`specialty-${specialty}`}
                    checked={selectedSpecialties.includes(specialty)}
                    onCheckedChange={() => handleSpecialtyChange(specialty)}
                    data-testid={`filter-specialty-${specialty.replace('/', '-')}`}
                  />
                  <Label htmlFor={`specialty-${specialty}`}>{specialty}</Label>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  );
};

export default FilterPanel;
