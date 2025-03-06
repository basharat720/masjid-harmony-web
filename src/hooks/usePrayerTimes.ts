
import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";

type PrayerTime = {
  name: string;
  time: string;
  adhan: string;
  iqamah: string;
  arabicName: string;
};

type Coordinates = {
  latitude: number;
  longitude: number;
};

const calculatePrayerTimes = (coords: Coordinates): PrayerTime[] => {
  // This is a placeholder for an actual calculation
  // In a real application, you would use a library like adhan-js
  // or make an API call to a prayer time service
  
  // For now, we'll return mock data that shifts slightly based on location
  const minuteOffset = Math.floor((coords.latitude + coords.longitude) % 30);
  
  return [
    { 
      name: 'Fajr', 
      time: `${5 + Math.floor(minuteOffset/15)}:${30 + (minuteOffset % 15)} AM`, 
      adhan: `${5 + Math.floor(minuteOffset/15)}:${20 + (minuteOffset % 15)} AM`, 
      iqamah: `${5 + Math.floor(minuteOffset/15)}:${40 + (minuteOffset % 15)} AM`, 
      arabicName: 'الفجر' 
    },
    { 
      name: 'Dhuhr', 
      time: `${1 + Math.floor(minuteOffset/20)}:${15 + (minuteOffset % 10)} PM`, 
      adhan: `${1 + Math.floor(minuteOffset/20)}:${5 + (minuteOffset % 10)} PM`, 
      iqamah: `${1 + Math.floor(minuteOffset/20)}:${25 + (minuteOffset % 10)} PM`, 
      arabicName: 'الظهر' 
    },
    { 
      name: 'Asr', 
      time: `${4 + Math.floor(minuteOffset/30)}:${45 + (minuteOffset % 5)} PM`, 
      adhan: `${4 + Math.floor(minuteOffset/30)}:${35 + (minuteOffset % 5)} PM`, 
      iqamah: `${4 + Math.floor(minuteOffset/30)}:${55 + (minuteOffset % 5)} PM`, 
      arabicName: 'العصر' 
    },
    { 
      name: 'Maghrib', 
      time: `${7 + Math.floor(minuteOffset/40)}:${5 + (minuteOffset % 10)} PM`, 
      adhan: `${7 + Math.floor(minuteOffset/40)}:${5 + (minuteOffset % 10)} PM`, 
      iqamah: `${7 + Math.floor(minuteOffset/40)}:${15 + (minuteOffset % 5)} PM`, 
      arabicName: 'المغرب' 
    },
    { 
      name: 'Isha', 
      time: `${8 + Math.floor(minuteOffset/30)}:${30 + (minuteOffset % 10)} PM`, 
      adhan: `${8 + Math.floor(minuteOffset/30)}:${20 + (minuteOffset % 10)} PM`, 
      iqamah: `${8 + Math.floor(minuteOffset/30)}:${40 + (minuteOffset % 5)} PM`, 
      arabicName: 'العشاء' 
    },
  ];
};

export const usePrayerTimes = () => {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTime[]>([]);
  const [location, setLocation] = useState<Coordinates | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        setLoading(true);
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            });
            setLoading(false);
          },
          (err) => {
            console.error("Error getting location:", err);
            toast({
              title: "Location Error",
              description: "Could not get your location. Using default prayer times.",
              variant: "destructive",
            });
            // Fall back to default coordinates (e.g., Mecca)
            setLocation({ latitude: 21.4225, longitude: 39.8262 });
            setLoading(false);
          }
        );
      } else {
        setError("Geolocation is not supported by this browser.");
        // Fall back to default coordinates
        setLocation({ latitude: 21.4225, longitude: 39.8262 });
        setLoading(false);
      }
    };

    getLocation();
  }, [toast]);

  useEffect(() => {
    if (location) {
      const times = calculatePrayerTimes(location);
      setPrayerTimes(times);
    }
  }, [location]);

  return { prayerTimes, loading, error, location };
};
