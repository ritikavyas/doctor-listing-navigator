
import React, { useRef, useState } from 'react';
import { Doctor } from '../hooks/useDoctorFiltering';
import { Card } from './ui/card';
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from './ui/command';
import { Search } from 'lucide-react';

interface SearchHeaderProps {
  searchText: string;
  setSearchText: (text: string) => void;
  suggestions: Doctor[];
}

const SearchHeader: React.FC<SearchHeaderProps> = ({ searchText, setSearchText, suggestions }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (doctorName: string) => {
    setSearchText(doctorName);
    setShowSuggestions(false);
    inputRef.current?.blur();
  };

  return (
    <div className="bg-gradient-to-r from-medical-primary to-medical-dark py-8 px-4 sm:px-6 md:px-8 shadow-lg relative z-20 animate-fade-in">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-white text-2xl md:text-3xl font-bold mb-6 animate-slide-in-right">
          Find and book the best doctors near you
        </h1>
        
        <Card className="bg-white/95 backdrop-blur-sm border-none shadow-xl animate-scale-in">
          <Command className="rounded-lg border-none">
            <div className="flex items-center px-3 border-b">
              <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
              <CommandInput
                ref={inputRef}
                placeholder="Search for doctors by name"
                value={searchText}
                onValueChange={setSearchText}
                className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                data-testid="autocomplete-input"
              />
            </div>

            {showSuggestions && suggestions.length > 0 && (
              <CommandList className="max-h-[300px] overflow-y-auto p-2">
                <CommandGroup>
                  {suggestions.map((doctor) => (
                    <CommandItem
                      key={doctor.id}
                      value={doctor.name}
                      onSelect={() => handleSuggestionClick(doctor.name)}
                      className="flex flex-col items-start px-4 py-2 hover:bg-accent cursor-pointer animate-fade-in"
                      data-testid="suggestion-item"
                    >
                      <p className="font-medium">{doctor.name}</p>
                      <p className="text-sm text-muted-foreground">{doctor.specialty.join(', ')}</p>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            )}
          </Command>
        </Card>
      </div>
    </div>
  );
};

export default SearchHeader;
