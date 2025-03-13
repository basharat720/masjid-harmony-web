
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { ContactInfoForm } from './ContactInfoForm';
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
import { MessageSquare, Pencil, Plus, Trash2, RefreshCw, MoveUp, MoveDown } from 'lucide-react';

type ContactInfo = {
  id: string;
  type: string;
  value: string;
  icon: string;
  display_order: number;
  created_at: string;
  updated_at: string;
};

const ContactInfoManager = () => {
  const [contactInfos, setContactInfos] = useState<ContactInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [editContactInfo, setEditContactInfo] = useState<ContactInfo | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchContactInfos = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('contact_info')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setContactInfos(data || []);
    } catch (error) {
      console.error('Error fetching contact info:', error);
      toast({
        title: 'Error',
        description: 'Failed to load contact information',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContactInfos();
  }, []);

  const handleEdit = (contactInfo: ContactInfo) => {
    setEditContactInfo(contactInfo);
    setIsEditDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('contact_info')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setContactInfos(contactInfos.filter(info => info.id !== id));
      toast({
        title: 'Contact info deleted',
        description: 'The contact information has been deleted successfully.',
      });
    } catch (error) {
      console.error('Error deleting contact info:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete contact information',
        variant: 'destructive',
      });
    } finally {
      setDeleteId(null);
    }
  };

  const handleAddSuccess = () => {
    setIsAddDialogOpen(false);
    fetchContactInfos();
  };

  const handleEditSuccess = () => {
    setIsEditDialogOpen(false);
    setEditContactInfo(null);
    fetchContactInfos();
  };

  const handleMoveUp = async (id: string, currentOrder: number) => {
    const previousItem = contactInfos.find(item => item.display_order === currentOrder - 1);
    if (!previousItem) return;

    try {
      // Update the current item's order
      await supabase
        .from('contact_info')
        .update({ display_order: currentOrder - 1, updated_at: new Date().toISOString() })
        .eq('id', id);
      
      // Update the previous item's order
      await supabase
        .from('contact_info')
        .update({ display_order: currentOrder, updated_at: new Date().toISOString() })
        .eq('id', previousItem.id);
      
      fetchContactInfos();
    } catch (error) {
      console.error('Error reordering items:', error);
      toast({
        title: 'Error',
        description: 'Failed to reorder items',
        variant: 'destructive',
      });
    }
  };

  const handleMoveDown = async (id: string, currentOrder: number) => {
    const nextItem = contactInfos.find(item => item.display_order === currentOrder + 1);
    if (!nextItem) return;

    try {
      // Update the current item's order
      await supabase
        .from('contact_info')
        .update({ display_order: currentOrder + 1, updated_at: new Date().toISOString() })
        .eq('id', id);
      
      // Update the next item's order
      await supabase
        .from('contact_info')
        .update({ display_order: currentOrder, updated_at: new Date().toISOString() })
        .eq('id', nextItem.id);
      
      fetchContactInfos();
    } catch (error) {
      console.error('Error reordering items:', error);
      toast({
        title: 'Error',
        description: 'Failed to reorder items',
        variant: 'destructive',
      });
    }
  };

  // Helper function to display icon name nicely
  const formatIconName = (iconName: string) => {
    if (!iconName) return 'None';
    return iconName.charAt(0).toUpperCase() + iconName.slice(1);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-2xl">Contact Information</CardTitle>
          <CardDescription>
            Manage contact details for the masjid
          </CardDescription>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={fetchContactInfos} 
            title="Refresh"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Add Contact Info
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Contact Information</DialogTitle>
              </DialogHeader>
              <ContactInfoForm 
                onSuccess={handleAddSuccess} 
                nextOrder={contactInfos.length > 0 ? Math.max(...contactInfos.map(item => item.display_order)) + 1 : 1}
              />
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-masjid-primary"></div>
          </div>
        ) : contactInfos.length === 0 ? (
          <div className="text-center py-8">
            <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
            <p className="text-muted-foreground">No contact information found</p>
            <p className="text-sm text-muted-foreground mt-1">Add your first contact details to display them on the website</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">Order</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Icon</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contactInfos.map((info) => (
                <TableRow key={info.id}>
                  <TableCell className="font-medium">{info.display_order}</TableCell>
                  <TableCell className="font-medium">{info.type}</TableCell>
                  <TableCell>{info.value}</TableCell>
                  <TableCell>{formatIconName(info.icon)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        disabled={info.display_order === 1}
                        onClick={() => handleMoveUp(info.id, info.display_order)}
                      >
                        <MoveUp className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        disabled={info.display_order === contactInfos.length}
                        onClick={() => handleMoveDown(info.id, info.display_order)}
                      >
                        <MoveDown className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleEdit(info)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <AlertDialog open={deleteId === info.id} onOpenChange={(open) => !open && setDeleteId(null)}>
                        <AlertDialogTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => setDeleteId(info.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Contact Information</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete this contact information? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={() => handleDelete(info.id)}
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
              <DialogTitle>Edit Contact Information</DialogTitle>
            </DialogHeader>
            {editContactInfo && (
              <ContactInfoForm 
                contactInfo={editContactInfo} 
                onSuccess={handleEditSuccess} 
              />
            )}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default ContactInfoManager;
