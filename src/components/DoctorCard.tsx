
import React from 'react';
import { Doctor } from '../hooks/useDoctorFiltering';
import { Card, CardHeader, CardContent, CardFooter } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  return (
    <Card className="w-full transition-all duration-300 hover:shadow-lg animate-fade-in mb-4 hover:scale-[1.02]">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <Avatar className="h-24 w-24 rounded-full">
            <AvatarImage
              src={doctor.photo || '/placeholder.svg'}
              alt={doctor.name}
              className="object-cover"
              onError={(e) => {
                e.currentTarget.src = '/placeholder.svg';
              }}
            />
            <AvatarFallback>{doctor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>

          <div className="flex-1 space-y-4">
            <div className="flex flex-col md:flex-row md:justify-between gap-2">
              <div>
                <h3 className="text-xl font-bold text-gray-900" data-testid="doctor-name">
                  {doctor.name}
                </h3>
                <p className="text-sm text-gray-600" data-testid="doctor-specialty">
                  {doctor.specialty?.join(', ') || ''}
                </p>
              </div>
              <Badge variant="secondary" className="w-fit h-fit">
                {doctor.moc}
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-500">Experience</p>
                <p className="font-medium" data-testid="doctor-experience">{doctor.experience}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Consultation Fee</p>
                <p className="font-medium" data-testid="doctor-fee">{doctor.fees}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Clinic</p>
                <p className="font-medium">{doctor.clinic}</p>
              </div>
            </div>

            <p className="text-sm text-gray-600">{doctor.address}</p>

            <Button className="w-full md:w-auto">
              Book Appointment
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DoctorCard;
