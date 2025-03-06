
import React from 'react';
import { Heart, DollarSign, Calendar, Users } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const donationCauses = [
  {
    id: 'masjid-expansion',
    title: 'Masjid Expansion Project',
    description: 'Help us expand our prayer facilities to accommodate more worshippers.',
    target: 150000,
    raised: 87500,
    icon: <Users className="h-8 w-8 text-masjid-primary" />,
  },
  {
    id: 'education-center',
    title: 'Education Center',
    description: 'Support our Islamic education programs for children and adults.',
    target: 75000,
    raised: 42000,
    icon: <Calendar className="h-8 w-8 text-masjid-primary" />,
  },
  {
    id: 'community-aid',
    title: 'Community Aid Fund',
    description: 'Support for families in need within our community.',
    target: 50000,
    raised: 38500,
    icon: <Heart className="h-8 w-8 text-masjid-primary" />,
  }
];

const donationAmounts = [25, 50, 100, 250, 500, 1000];

const Donation = () => {
  const [selectedCause, setSelectedCause] = React.useState(donationCauses[0].id);
  const [customAmount, setCustomAmount] = React.useState('');
  const [selectedAmount, setSelectedAmount] = React.useState<number | null>(50);
  const [donationType, setDonationType] = React.useState('one-time');
  
  const handleAmountSelection = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };
  
  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value);
    setSelectedAmount(null);
  };
  
  return (
    <section id="donate" className="py-16 bg-gradient-to-br from-masjid-primary to-masjid-dark text-white">
      <div className="section-container">
        <h2 className="section-title text-white">
          Support Our Masjid
        </h2>
        <p className="text-center text-masjid-light max-w-2xl mx-auto mb-10">
          Your generous donations help us maintain our facilities, run educational programs, and support our community initiatives.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Donation Causes */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-masjid-gold mb-4">Current Fundraising Campaigns</h3>
            
            {donationCauses.map((cause) => (
              <Card key={cause.id} 
                className={`bg-white/10 backdrop-blur-sm border-none hover:bg-white/20 transition-colors cursor-pointer ${selectedCause === cause.id ? 'ring-2 ring-masjid-gold' : ''}`}
                onClick={() => setSelectedCause(cause.id)}
              >
                <CardHeader className="pb-2 flex flex-row items-start space-x-4">
                  <div className="mt-1">{cause.icon}</div>
                  <div>
                    <CardTitle className="text-white">{cause.title}</CardTitle>
                    <CardDescription className="text-masjid-light">{cause.description}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Raised: ${cause.raised.toLocaleString()}</span>
                      <span>Goal: ${cause.target.toLocaleString()}</span>
                    </div>
                    <Progress 
                      value={(cause.raised / cause.target) * 100} 
                      className="h-2 bg-white/20" 
                    />
                    <p className="text-right text-sm text-masjid-light">
                      {Math.round((cause.raised / cause.target) * 100)}% Complete
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Donation Form */}
          <div className="bg-white rounded-xl shadow-xl p-6 text-masjid-navy">
            <h3 className="text-xl font-bold text-masjid-primary mb-6">Make a Donation</h3>
            
            <div className="space-y-6">
              {/* Donation Type */}
              <div>
                <h4 className="font-medium mb-2">Donation Type</h4>
                <RadioGroup 
                  defaultValue="one-time" 
                  className="flex"
                  value={donationType}
                  onValueChange={setDonationType}
                >
                  <div className="flex items-center space-x-2 mr-6">
                    <RadioGroupItem value="one-time" id="one-time" />
                    <Label htmlFor="one-time">One-time</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="monthly" id="monthly" />
                    <Label htmlFor="monthly">Monthly</Label>
                  </div>
                </RadioGroup>
              </div>
              
              {/* Amount Selection */}
              <div>
                <h4 className="font-medium mb-2">Select Amount</h4>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {donationAmounts.map((amount) => (
                    <Button
                      key={amount}
                      type="button"
                      variant={selectedAmount === amount ? "default" : "outline"}
                      className={`${selectedAmount === amount ? 'bg-masjid-primary text-white' : 'text-masjid-primary'}`}
                      onClick={() => handleAmountSelection(amount)}
                    >
                      ${amount}
                    </Button>
                  ))}
                </div>
                <div className="relative">
                  <DollarSign size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-masjid-navy/60" />
                  <Input
                    type="text"
                    placeholder="Custom Amount"
                    className="pl-10"
                    value={customAmount}
                    onChange={handleCustomAmountChange}
                  />
                </div>
              </div>
              
              {/* Donation Button */}
              <Button className="w-full bg-masjid-primary hover:bg-masjid-dark text-white py-6 text-lg">
                <Heart size={18} className="mr-2" /> Donate Now
              </Button>
              
              <p className="text-xs text-center text-masjid-navy/60 mt-4">
                All donations are tax-deductible. You will receive a receipt for your records.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Donation;
