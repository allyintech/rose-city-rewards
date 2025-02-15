"use client";

import React, { useState, useEffect } from "react";
import { Filter, MapPin, Phone, Globe, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Business } from "@/types/dataTypes";
import { businesses } from "@/data/sampleData";

export default function BusinessesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBusinesses, setFilteredBusinesses] = useState<Business[]>(businesses);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Extract unique categories from businesses
  const categories = ["all", ...new Set(businesses.map((b) => b.category))];

  useEffect(() => {
    filterBusinesses(searchTerm, selectedCategory);
  }, [searchTerm, selectedCategory]);

  const filterBusinesses = (term: string, category: string) => {
    let filtered = businesses;

    // Apply search term filter
    if (term) {
      filtered = filtered.filter(
        (business) =>
          business.name.toLowerCase().includes(term) ||
          business.description.toLowerCase().includes(term) ||
          business.tags?.some((tag) => tag.toLowerCase().includes(term))
      );
    }

    // Apply category filter
    if (category !== "all") {
      filtered = filtered.filter((business) => business.category === category);
    }

    setFilteredBusinesses(filtered);
  };

  return (
    <div className="space-y-6">
      {/* Search & Filter */}
      <div className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Search businesses..."
            className="flex-1"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          />
          <Button variant="outline">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className="whitespace-nowrap"
              onClick={() => setSelectedCategory(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      {/* Businesses List */}
      <div className="space-y-4">
        {filteredBusinesses.length > 0 ? (
          filteredBusinesses.map((business) => (
            <Card key={business.id} className="bg-white">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <CardTitle className="flex items-center gap-2">
                      <span>{business.emoji}</span>
                      {business.name}
                      {business.active !== undefined && (
                        <Badge
                          variant={business.active ? "secondary" : "destructive"}
                          className={business.active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                        >
                          {business.active ? "Active" : "Inactive"}
                        </Badge>
                      )}
                    </CardTitle>
                    <CardDescription>{business.description}</CardDescription>
                  </div>
                  <Badge>{business.credits ? `${business.credits} credits` : "No credits available"}</Badge>
                </div>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  <div className="grid gap-2 text-sm text-gray-600">
                    {business.address && (
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{`${business.address.street}, ${business.address.city}, ${business.address.state} ${business.address.postalCode}`}</span>
                      </div>
                    )}
                    {business.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        {business.phone}
                      </div>
                    )}
                    {business.website && (
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        <a href={business.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          {business.website}
                        </a>
                      </div>
                    )}
                    {business.email && (
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        <a href={`mailto:${business.email}`} className="text-blue-600 hover:underline">
                          {business.email}
                        </a>
                      </div>
                    )}
                  </div>

                  <div>
                    <div className="text-sm text-red-600">
                      {business.rewards || `Redeem with ${business.credits} credits`}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">{business.category}</Badge>
                    {business.tags?.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">No businesses found.</div>
        )}
      </div>
    </div>
  );
}
