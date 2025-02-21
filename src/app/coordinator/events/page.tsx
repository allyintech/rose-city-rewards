"use client";

import React, { useState, useEffect } from "react";
import {
  Plus,
  Edit,
  Calendar,
  Users,
  Trash2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QRCodeCanvas } from "qrcode.react";
import { supabase } from "@/lib/supabaseClient";
import CoordinatorTable from "@/app/coordinator/components/CoordinatorTable";
import { VolunteerActivity, EventFormData, EventRegistration } from "@/types/dataTypes";
import { generateNewCode } from "@/utils/helpers";
import { volunteerActivities } from "@/data/sampleData"; 

// Initial form data
const initialFormData: EventFormData = {
  name: "",
  organization: "Central City Concern",
  category: "",
  hours: 0,
  date: new Date(),
  time: "",
  description: "",
  impact: "",
  supervisorName: "",
  supervisorEmail: "",
  address: {
    street: "",
    city: "",
    state: "",
    postalCode: "",
  },
  credits: 0,
  spots_total: 20,
};

export default function EventsPage() {
  const [events, setEvents] = useState<VolunteerActivity[]>([]);
  const [registrations, setRegistrations] = useState<EventRegistration[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState<EventFormData>(initialFormData);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  /** Fetch events from Supabase */
  const fetchEvents = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from("events").select("*");

      if (error) {
        console.error("Error fetching events:", error.message);
        setEvents(volunteerActivities); // Fallback to sample events
      } else {
        setEvents(data.length > 0 ? data : volunteerActivities);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      setEvents(volunteerActivities); // Fallback in case of unexpected error
    } finally {
      setLoading(false);
    }
  };

  /** Add event to Supabase */
  const handleAddEvent = async () => {
    if (!formData.name || !formData.category || !formData.date || !formData.time) {
      alert("Please fill in all required fields.");
      return;
    }

    setLoading(true);

    const newEvent = {
      ...formData,
      code: generateNewCode(),
      date: formData.date.toISOString(),
      spots_filled: 0,
    };

    const { data, error } = await supabase.from("events").insert([newEvent]).select("*");

    if (!error) {
      setEvents((prev) => [...prev, data[0]]);
      setShowAddForm(false);
      setFormData(initialFormData);
    } else {
      console.error("Error adding event:", error.message);
    }

    setLoading(false);
  };

  /** Delete event from Supabase */
  const handleDeleteEvent = async (eventId: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this event?");
    if (!confirmed) return;

    const { error } = await supabase.from("events").delete().eq("id", eventId);

    if (!error) {
      setEvents(events.filter((event) => event.id !== eventId));
    } else {
      console.error("Error deleting event:", error.message);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Events</h1>
        <Button onClick={() => setShowAddForm(true)} className="bg-red-600 hover:bg-red-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Event
        </Button>
      </div>

      {loading ? (
        <p>Loading events...</p>
      ) : (
        <div className="space-y-4">
          {events.map((event) => (
            <Card key={event.id ?? `event-${Math.random()}`} className="overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle>{event.name}</CardTitle>
                <CardDescription className="text-gray-500">{event.organization}</CardDescription>
              </CardHeader>
              <CardContent className="p-6 flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                {/* Left Side: Event Details */}
                <div className="flex-1 space-y-2">
                  <p className="text-gray-600">{event.description}</p>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(event.date).toLocaleDateString()} at {event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>{event.spots_filled}/{event.spots_total} spots filled</span>
                  </div>
                </div>

                {/* Right Side: QR Code & Buttons */}
                <div className="flex flex-col items-center space-y-2">
                  <QRCodeCanvas value={event.code} size={100} />
                  <span className="text-sm text-gray-700 font-mono">{event.code}</span>

                  <div className="flex gap-2 mt-2">
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDeleteEvent(event.id ?? "")}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Add Event Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 overflow-y-auto">
          <Card className="w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white p-6 rounded-lg shadow-lg">
            <CardHeader>
              <CardTitle>Add New Event</CardTitle>
              <CardDescription>Fill out the details to create a new volunteer event.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: "Event Name", name: "name", type: "text" },
                { label: "Category", name: "category", type: "text" },
                { label: "Date", name: "date", type: "date" },
                { label: "Time", name: "time", type: "time" },
                { label: "Description", name: "description", type: "text" },
                { label: "Impact", name: "impact", type: "text" },
                { label: "Supervisor Name", name: "supervisorName", type: "text" },
                { label: "Supervisor Email", name: "supervisorEmail", type: "email" },
                { label: "Street", name: "street", type: "text", addressField: true },
                { label: "City", name: "city", type: "text", addressField: true },
                { label: "State", name: "state", type: "text", addressField: true },
                { label: "Postal Code", name: "postalCode", type: "text", addressField: true },
                { label: "Spots Total", name: "spots_total", type: "number" },
                { label: "Credits", name: "credits", type: "number" },
              ].map(({ label, name, type, addressField }) => (
                <div key={name}>
                  <label className="block text-sm font-medium text-gray-700">{label}</label>
                  <input
                    type={type}
                    value={addressField 
                      ? String(formData.address[name as keyof typeof formData.address] ?? "")
                      : String(formData[name as keyof EventFormData] ?? "")}
                    onChange={(e) => setFormData((prev) => ({ ...prev, [name]: e.target.value }))}
                    className="border p-2 w-full mb-2"
                  />
                </div>
              ))}

              <Button className="bg-green-600 hover:bg-green-700 w-full" onClick={handleAddEvent}>
                Save Event
              </Button>
              <Button variant="outline" className="w-full" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
