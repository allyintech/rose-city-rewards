"use client";

import React, { useState, useEffect } from "react";
import { Filter, MapPin, Phone } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { businesses, sampleTransactions, sampleVolunteers } from "@/data/sampleData";
import { Business, TransactionRecord, Volunteer } from "@/types/dataTypes";

// Get logged-in volunteer (vol-001)
const currentVolunteer: Volunteer = sampleVolunteers.find(v => v.id === 'vol-001') || {
  id: 'vol-001',
  name: 'Sarah Chen',
  email: 'sarah.chen@email.com',
  joinDate: new Date(),
  totalHours: 0,
  balance: 100,
  totalEarned: 200,
  totalSpent: 100,
  impactScore: 85,
  streak: 4,
};

export default function SpendPage() {
  const [transactions, setTransactions] = useState<TransactionRecord[]>([]);
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [balance, setBalance] = useState(currentVolunteer.balance); // Uses logged-in volunteer balance

  // Load transactions for the logged-in user
  useEffect(() => {
    setTransactions(sampleTransactions.filter(txn => txn.volunteerId === currentVolunteer.id));
  }, []);

  const generateUniqueCode = () => {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 5);
    return `${timestamp}${random}`.toUpperCase();
  };

  const handleRedeemClick = (business: Business) => {
    if (balance < business.credits) {
      alert("Insufficient credits available");
      return;
    }
    setSelectedBusiness(business);
    setShowConfirmDialog(true);
  };

  const handleConfirmRedeem = () => {
    if (selectedBusiness) {
      const newTransaction: TransactionRecord = {
        id: `txn-${Date.now()}`,
        type: "spent", 
        amount: selectedBusiness.credits,
        description: `Spent at ${selectedBusiness.name}`,
        date: new Date(),
        businessName: selectedBusiness.name,
        volunteerId: currentVolunteer.id || 'default-volunteer-id',
      };

      // Update transactions and balance
      setTransactions(prev => [...prev, newTransaction]);
      setBalance(prevBalance => prevBalance - selectedBusiness.credits);
      setShowConfirmDialog(false);
    }
  };

  const filteredBusinesses = businesses.filter((business) =>
    business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    business.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    business.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6 max-w-lg mx-auto p-4">
      {/* Search & Filter */}
      <div className="flex gap-2">
        <Input
          placeholder="Search businesses..."
          className="flex-1"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Search businesses"
        />
        <Button variant="outline">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      {/* Businesses List */}
      <div className="space-y-4">
        {filteredBusinesses.map((business) => {
          const spentTransaction = transactions.find(txn => txn.businessName === business.name);
          
          return (
            <Card key={business.id} className="bg-white">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <span>{business.emoji}</span>
                      {business.name}
                    </CardTitle>
                    <CardDescription>{business.description}</CardDescription>
                  </div>
                  <Badge variant="secondary" className="bg-slate-900 text-white">
                    {business.credits} credits
                  </Badge>
                </div>
              </CardHeader>

              <CardContent>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 flex-shrink-0" />
                    <span>{`${business.address.street}, ${business.address.city}, ${business.address.state} ${business.address.postalCode}`}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 flex-shrink-0" />
                    {business.phone}
                  </div>
                  <div className="flex gap-2 mt-2 flex-wrap">
                    {business.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="bg-gray-100">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>

              <CardFooter className="flex flex-col gap-2">
                <Button
                  className="w-full bg-red-600 hover:bg-red-700 text-white"
                  onClick={() => handleRedeemClick(business)}
                  disabled={!!spentTransaction || balance < business.credits}
                >
                  {spentTransaction
                    ? "Credits Spent"
                    : balance < business.credits
                    ? "Insufficient Credits"
                    : "Redeem Credits"}
                </Button>

                {spentTransaction && (
                  <div className="text-center text-green-600 font-semibold">
                    Redemption Code: {generateUniqueCode()}
                  </div>
                )}
              </CardFooter>
            </Card>
          );
        })}
      </div>

      {/* Confirmation Dialog */}
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Redemption</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to spend {selectedBusiness?.credits} credits at {selectedBusiness?.name}?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmRedeem}>
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* No Businesses Found */}
      {filteredBusinesses.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No businesses found matching your search.
        </div>
      )}
    </div>
  );
}
