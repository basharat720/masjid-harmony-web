
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { DonationOptionForm } from './DonationOptionForm';
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
import { Heart, Pencil, Plus, Trash2, RefreshCw, Check, X } from 'lucide-react';

type DonationOption = {
  id: string;
  title: string;
  description: string;
  amount: number | null;
  custom_amount: boolean;
  payment_info: string;
  featured: boolean;
  created_at: string;
  updated_at: string;
};

const DonationOptionsManager = () => {
  const [donationOptions, setDonationOptions] = useState<DonationOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [editDonationOption, setEditDonationOption] = useState<DonationOption | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchDonationOptions = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('donation_options')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDonationOptions(data || []);
    } catch (error) {
      console.error('Error fetching donation options:', error);
      toast({
        title: 'Error',
        description: 'Failed to load donation options',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonationOptions();
  }, []);

  const handleEdit = (option: DonationOption) => {
    setEditDonationOption(option);
    setIsEditDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('donation_options')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setDonationOptions(donationOptions.filter(option => option.id !== id));
      toast({
        title: 'Donation option deleted',
        description: 'The donation option has been deleted successfully.',
      });
    } catch (error) {
      console.error('Error deleting donation option:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete donation option',
        variant: 'destructive',
      });
    } finally {
      setDeleteId(null);
    }
  };

  const handleAddSuccess = () => {
    setIsAddDialogOpen(false);
    fetchDonationOptions();
  };

  const handleEditSuccess = () => {
    setIsEditDialogOpen(false);
    setEditDonationOption(null);
    fetchDonationOptions();
  };

  const formatAmount = (amount: number | null, customAmount: boolean) => {
    if (customAmount) return 'Custom Amount';
    if (amount === null) return 'N/A';
    return `$${amount.toFixed(2)}`;
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-2xl">Donation Options</CardTitle>
          <CardDescription>
            Manage donation options for the masjid
          </CardDescription>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={fetchDonationOptions} 
            title="Refresh"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Add Donation Option
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Donation Option</DialogTitle>
              </DialogHeader>
              <DonationOptionForm onSuccess={handleAddSuccess} />
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-masjid-primary"></div>
          </div>
        ) : donationOptions.length === 0 ? (
          <div className="text-center py-8">
            <Heart className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
            <p className="text-muted-foreground">No donation options found</p>
            <p className="text-sm text-muted-foreground mt-1">Add your first donation option to display it on the website</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Featured</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {donationOptions.map((option) => (
                <TableRow key={option.id}>
                  <TableCell className="font-medium">{option.title}</TableCell>
                  <TableCell>{formatAmount(option.amount, option.custom_amount)}</TableCell>
                  <TableCell className="max-w-xs truncate">{option.description}</TableCell>
                  <TableCell>
                    {option.featured ? 
                      <Check className="h-4 w-4 text-green-500" /> : 
                      <X className="h-4 w-4 text-muted-foreground" />
                    }
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleEdit(option)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <AlertDialog open={deleteId === option.id} onOpenChange={(open) => !open && setDeleteId(null)}>
                        <AlertDialogTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => setDeleteId(option.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Donation Option</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete "{option.title}"? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={() => handleDelete(option.id)}
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
              <DialogTitle>Edit Donation Option</DialogTitle>
            </DialogHeader>
            {editDonationOption && (
              <DonationOptionForm 
                donationOption={editDonationOption} 
                onSuccess={handleEditSuccess} 
              />
            )}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default DonationOptionsManager;
