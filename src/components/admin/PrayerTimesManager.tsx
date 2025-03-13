
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { PrayerTimeForm } from './PrayerTimeForm';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Clock, Pencil, Plus, Trash2, RefreshCw } from 'lucide-react';

type PrayerTime = {
  id: string;
  name: string;
  arabic_name: string;
  adhan_time: string;
  iqamah_time: string;
  fiqa_type: string;
  created_at: string;
  updated_at: string;
};

const PrayerTimesManager = () => {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTime[]>([]);
  const [loading, setLoading] = useState(true);
  const [editPrayerTime, setEditPrayerTime] = useState<PrayerTime | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchPrayerTimes = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('prayer_times')
        .select('*')
        .order('name');

      if (error) throw error;
      setPrayerTimes(data || []);
    } catch (error) {
      console.error('Error fetching prayer times:', error);
      toast({
        title: 'Error',
        description: 'Failed to load prayer times',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrayerTimes();
  }, []);

  const handleEdit = (prayerTime: PrayerTime) => {
    setEditPrayerTime(prayerTime);
    setIsEditDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('prayer_times')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setPrayerTimes(prayerTimes.filter(pt => pt.id !== id));
      toast({
        title: 'Prayer time deleted',
        description: 'The prayer time has been deleted successfully.',
      });
    } catch (error) {
      console.error('Error deleting prayer time:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete prayer time',
        variant: 'destructive',
      });
    } finally {
      setDeleteId(null);
    }
  };

  const handleAddSuccess = () => {
    setIsAddDialogOpen(false);
    fetchPrayerTimes();
  };

  const handleEditSuccess = () => {
    setIsEditDialogOpen(false);
    setEditPrayerTime(null);
    fetchPrayerTimes();
  };

  // Helper function to format time for display
  const formatTime = (timeStr: string) => {
    if (!timeStr) return 'N/A';
    
    // If it's already in 'HH:MM' or 'HH:MM:SS' format, convert to 12-hour format
    if (timeStr.includes(':')) {
      try {
        const [hours, minutes] = timeStr.split(':').map(Number);
        const period = hours >= 12 ? 'PM' : 'AM';
        const hours12 = hours % 12 || 12;
        return `${hours12}:${minutes.toString().padStart(2, '0')} ${period}`;
      } catch (error) {
        return timeStr;
      }
    }
    
    return timeStr;
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-2xl">Prayer Times</CardTitle>
          <CardDescription>
            Manage prayer times displayed on the website
          </CardDescription>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={fetchPrayerTimes} 
            title="Refresh"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Add Prayer Time
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Prayer Time</DialogTitle>
              </DialogHeader>
              <PrayerTimeForm onSuccess={handleAddSuccess} />
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-masjid-primary"></div>
          </div>
        ) : prayerTimes.length === 0 ? (
          <div className="text-center py-8">
            <Clock className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
            <p className="text-muted-foreground">No prayer times found</p>
            <p className="text-sm text-muted-foreground mt-1">Add your first prayer time to display it on the website</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Arabic Name</TableHead>
                <TableHead>Adhan Time</TableHead>
                <TableHead>Iqamah Time</TableHead>
                <TableHead>Fiqa Type</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {prayerTimes.map((prayerTime) => (
                <TableRow key={prayerTime.id}>
                  <TableCell className="font-medium">{prayerTime.name}</TableCell>
                  <TableCell className="font-arabic">{prayerTime.arabic_name}</TableCell>
                  <TableCell>{formatTime(prayerTime.adhan_time)}</TableCell>
                  <TableCell>{formatTime(prayerTime.iqamah_time)}</TableCell>
                  <TableCell>{prayerTime.fiqa_type}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleEdit(prayerTime)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <AlertDialog open={deleteId === prayerTime.id} onOpenChange={(open) => !open && setDeleteId(null)}>
                        <AlertDialogTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => setDeleteId(prayerTime.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Prayer Time</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete the {prayerTime.name} prayer time? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={() => handleDelete(prayerTime.id)}
                              className="bg-red-500 hover:bg-red-600"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Prayer Time</DialogTitle>
            </DialogHeader>
            {editPrayerTime && (
              <PrayerTimeForm 
                prayerTime={editPrayerTime} 
                onSuccess={handleEditSuccess} 
              />
            )}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default PrayerTimesManager;
