"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { QrCode, MapPin, Calendar, Filter } from "lucide-react";
import ActivityCard from "@/app/volunteer/components/ActivityCard";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/lib/supabaseClient";
import { volunteerActivities, sampleTransactions, sampleEventRegistrations } from "@/data/sampleData";

// Simulated user authentication (replace with real authentication logic)
const userId = "sample-volunteer-id";

// Function to calculate spots filled dynamically from sample data
const calculateSpotsFilled = (eventId: string) => {
  return sampleEventRegistrations.filter(
    (registration) => registration.eventId === eventId && registration.status === "registered"
  ).length;
};

export default function EventsPage() {
  const [events, setEvents] = useState(
    volunteerActivities.map(event => ({ ...event, spots_filled: calculateSpotsFilled(event.id ?? "") }))
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [earnedTransactions, setEarnedTransactions] = useState(sampleTransactions);

  useEffect(() => {
    async function fetchEvents() {
      const { data: eventsData, error } = await supabase
        .from("events_with_spots") // ✅ Query the new Supabase view
        .select("*");

      if (error) {
        console.error("❌ Error fetching events:", error.message || error);
        setEvents(volunteerActivities.map(event => ({ ...event, spots_filled: calculateSpotsFilled(event.id ?? "") })));
      } else {
        setEvents(eventsData);
      }
    }

    async function fetchTransactions() {
      const { data: transactionsData, error } = await supabase
        .from("transactions")
        .select("*")
        .eq("type", "earned");

      if (!error) setEarnedTransactions(transactionsData);
    }

    fetchEvents();
    fetchTransactions();
  }, []);

  // Function to handle sign-up and decrease available spots
  const handleSignUp = async (eventId: string) => {
    if (!userId) {
      console.error("❌ User not authenticated!");
      return;
    }

    try {
      // Find the event being updated
      const eventIndex = events.findIndex(event => event.id === eventId);
      if (eventIndex === -1) return;

      // Prevent duplicate sign-ups
      const isAlreadyRegistered = sampleEventRegistrations.some(
        (registration) => registration.eventId === eventId && registration.volunteerId === userId
      );
      if (isAlreadyRegistered) {
        console.warn("⚠️ User already registered for this event.");
        return;
      }

      // Optimistically update UI (but store original value in case of rollback)
      const updatedEvents = [...events];
      const originalSpotsFilled = updatedEvents[eventIndex].spots_filled;

      updatedEvents[eventIndex] = {
        ...updatedEvents[eventIndex],
        spots_filled: Math.min(updatedEvents[eventIndex].spots_filled + 1, updatedEvents[eventIndex].spots_total),
      };

      setEvents(updatedEvents);

      // Persist change in Supabase
      const { error } = await supabase
        .from("public.event_registrations")
        .insert([{ eventId, volunteerId: userId, status: "registered" }]);

      if (error) {
        console.error("❌ Error signing up:", error.message || error);
        // Revert UI change **only if it was increased before**
        setEvents(prevEvents => prevEvents.map(event =>
          event.id === eventId ? { ...event, spots_filled: originalSpotsFilled } : event
        ));
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Search & Filter - Adjusted for Better UI */}
      <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
        <Input
          placeholder="Search events..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-1/2"
        />
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Filter className="h-5 w-5" /> Filter
          </Button>
          <Button onClick={() => document.getElementById('earn-credits')?.scrollIntoView({ behavior: 'smooth' })}>
            Have a QR or verification code?
          </Button>
        </div>
      </div>

      {/* Events List */}
      <div className="space-y-4">
        {events.length > 0 ? (
          events.map((event) => (
            <Card key={event.id ?? ""} className="bg-white">
              <CardHeader>
                <CardTitle>{event.name}</CardTitle>
                <CardDescription>{event.organization}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center space-x-2 text-sm">
                  <Calendar className="h-4 w-4" /> <span>{new Date(event.date).toDateString()} | {event.time}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <MapPin className="h-4 w-4" /> <span>{event.address.street}, {event.address.city}</span>
                </div>
                <p className="text-sm">{event.description}</p>
                <div className="text-sm text-gray-600">Impact: {event.impact}</div>
                <div className="text-sm text-gray-600">Supervisor: {event.supervisorName}</div>
                <div className="text-sm text-gray-600">Credits: {event.credits}</div>
                <Progress value={(event.spots_filled / event.spots_total) * 100} />
                <p className="text-xs text-gray-500">{event.spots_filled}/{event.spots_total} spots filled</p>
              </CardContent>
              <CardContent>
                <Button
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={() => handleSignUp(event.id ?? "")}
                  disabled={event.spots_filled >= event.spots_total}
                >
                  {event.spots_filled >= event.spots_total ? "Full" : "Sign Up"}
                </Button>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-gray-600">No events found.</p>
        )}
      </div>

      {/* Earn Credits Section */}
      <Card id="earn-credits" className="bg-white">
        <CardHeader>
          <CardTitle>Earn Credits</CardTitle>
          <CardDescription>Scan a QR code or enter a verification code to earn credits.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button className="w-full bg-red-600 hover:bg-red-700">
            <QrCode className="mr-2 h-4 w-4" /> Scan QR Code
          </Button>
          <div className="space-y-2">
            <Input placeholder="Enter verification code" />
            <Button className="w-full bg-red-600 hover:bg-red-700">
              Submit Code
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
