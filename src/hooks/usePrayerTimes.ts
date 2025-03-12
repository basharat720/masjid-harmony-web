
import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';

type PrayerTime = {
  name: string;
  time: string;
  adhan: string;
  iqamah: string;
  arabicName: string;
  fiqa_type: string;
  id: string;
};

export const usePrayerTimes = () => {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTime[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        setLoading(true);
        
        // Try to fetch from Supabase
        const { data, error } = await supabase
          .from('prayer_times')
          .select('*')
          .order('id');
        
        if (error) throw error;
        
        if (data && data.length > 0) {
          // Format the data from Supabase
          const formattedTimes = data.map(prayer => ({
            id: prayer.id,
            name: prayer.name,
            arabicName: prayer.arabic_name,
            time: formatTimeString(prayer.adhan_time),
            adhan: formatTimeString(prayer.adhan_time),
            iqamah: formatTimeString(prayer.iqamah_time),
            fiqa_type: prayer.fiqa_type || 'Jafferia'
          }));
          
          setPrayerTimes(formattedTimes);
        } else {
          // Fallback to default times if no data in Supabase
          setPrayerTimes([
            { id: '1', name: 'Fajr', time: '5:30 AM', adhan: '5:20 AM', iqamah: '5:40 AM', arabicName: 'الفجر', fiqa_type: 'Jafferia' },
            { id: '2', name: 'Dhuhr', time: '1:15 PM', adhan: '1:05 PM', iqamah: '1:25 PM', arabicName: 'الظهر', fiqa_type: 'Jafferia' },
            { id: '3', name: 'Asr', time: '4:45 PM', adhan: '4:35 PM', iqamah: '4:55 PM', arabicName: 'العصر', fiqa_type: 'Jafferia' },
            { id: '4', name: 'Maghrib', time: '7:05 PM', adhan: '7:05 PM', iqamah: '7:15 PM', arabicName: 'المغرب', fiqa_type: 'Jafferia' },
            { id: '5', name: 'Isha', time: '8:30 PM', adhan: '8:20 PM', iqamah: '8:40 PM', arabicName: 'العشاء', fiqa_type: 'Jafferia' },
          ]);
        }
      } catch (err) {
        console.error("Error fetching prayer times:", err);
        setError("Could not load prayer times. Using default times.");
        
        // Set default prayer times as fallback
        setPrayerTimes([
          { id: '1', name: 'Fajr', time: '5:30 AM', adhan: '5:20 AM', iqamah: '5:40 AM', arabicName: 'الفجر', fiqa_type: 'Jafferia' },
          { id: '2', name: 'Dhuhr', time: '1:15 PM', adhan: '1:05 PM', iqamah: '1:25 PM', arabicName: 'الظهر', fiqa_type: 'Jafferia' },
          { id: '3', name: 'Asr', time: '4:45 PM', adhan: '4:35 PM', iqamah: '4:55 PM', arabicName: 'العصر', fiqa_type: 'Jafferia' },
          { id: '4', name: 'Maghrib', time: '7:05 PM', adhan: '7:05 PM', iqamah: '7:15 PM', arabicName: 'المغرب', fiqa_type: 'Jafferia' },
          { id: '5', name: 'Isha', time: '8:30 PM', adhan: '8:20 PM', iqamah: '8:40 PM', arabicName: 'العشاء', fiqa_type: 'Jafferia' },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchPrayerTimes();
  }, []);

  // Helper function to format time strings
  const formatTimeString = (timeStr: string) => {
    if (!timeStr) return "N/A";
    
    try {
      // If it's already in AM/PM format, return as is
      if (timeStr.includes('AM') || timeStr.includes('PM')) {
        return timeStr;
      }
      
      // Parse time string (expected format from DB: "HH:MM:SS")
      const [hours, minutes] = timeStr.split(':').map(Number);
      
      // Convert to 12-hour format
      const period = hours >= 12 ? 'PM' : 'AM';
      const hours12 = hours % 12 || 12;
      
      return `${hours12}:${minutes.toString().padStart(2, '0')} ${period}`;
    } catch (error) {
      console.error("Error formatting time:", error);
      return timeStr;
    }
  };

  return { prayerTimes, loading, error };
};
