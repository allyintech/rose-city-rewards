"use client";

import React, { useState, useEffect } from "react";
import {
  Plus,
  Edit,
  Calendar,
  Users,
  Trash2,
  Download,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QRCodeCanvas } from "qrcode.react";
import { supabase } from "@/lib/supabaseClient";
import CoordinatorTable from "@/app/coordinator/components/CoordinatorTable";
import { VolunteerActivity, EventFormData, EventRegistration } from "@/types/dataTypes";
import { generateNewCode } from "@/utils/helpers";

// Initial form data
const initialFormData: EventFormData = {
  name: "",
  organization: "",
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
  spots_total: 20, // Default value
};

export default function EventsPage() {
  const [events, setEvents] = useState<VolunteerActivity[]>([]);
  const [registrations, setRegistrations] = useState<EventRegistration[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<VolunteerActivity | null>(null);
  const [formData, setFormData] = useState<EventFormData>(initialFormData);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  // Fetch all events for the coordinator's organization
  const fetchEvents = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("organization", "Your Organization"); // Replace dynamically

    if (!error) setEvents(data || []);
    setLoading(false);
  };

  // Fetch registrations for a specific event
  const fetchRegistrations = async (eventId: string) => {
    const { data, error } = await supabase
      .from("event_registrations")
      .select("*")
      .eq("eventId", eventId);

    if (!error) {
      const formattedData = data.map((reg) => ({
        eventId: reg.eventId,
        volunteerId: reg.volunteerId,
        status: reg.status,
      }));
      setRegistrations(formattedData);
    }
  };

  // Handle form input changes
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>, addressField?: keyof typeof formData.address) => {
    const { name, value } = e.target;

    if (addressField) {
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Add new event to Supabase
  const handleAddEvent = async () => {
    const newEvent = {
      ...formData,
      id: `event-${Date.now()}`,
      code: generateNewCode(),
      date: new Date(formData.date),
      spots_filled: 0, // New events start with 0 registered volunteers
    };

    const { error } = await supabase.from("events").insert([newEvent]);

    if (!error) {
      setEvents([...events, newEvent]);
      setShowAddForm(false);
      setFormData(initialFormData);
    }
  };

  // Update existing event in Supabase
  const handleUpdateEvent = async () => {
    if (!selectedEvent) return;

    const { error } = await supabase
      .from("events")
      .update({ ...formData })
      .eq("id", selectedEvent.id);

    if (!error) {
      setEvents(events.map((event) => (event.id === selectedEvent.id ? { ...event, ...formData } : event)));
      setSelectedEvent(null);
      setFormData(initialFormData);
    }
  };

  // Delete event from Supabase
  const handleDeleteEvent = async (eventId: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this event?");
    if (!confirmed) return;

    const { error } = await supabase.from("events").delete().eq("id", eventId);

    if (!error) {
      setEvents(events.filter((event) => event.id !== eventId));
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
              <CardHeader>
                <CardTitle>{event.name}</CardTitle>
                <CardDescription>{event.organization}</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                  <div className="space-y-4 flex-1">
                    <p className="text-gray-600">{event.description}</p>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(event.date).toLocaleDateString()} at {event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Users className="w-4 h-4" />
                        <span>{event.spots_filled}/{event.spots_total} spots filled</span>
                      </div>
                    </div>

                    <QRCodeCanvas value={event.code} size={100} />
                    <p className="text-gray-600 font-mono text-sm">{event.code}</p>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => fetchRegistrations(event.id ?? "")}>
                      View Registrations
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setSelectedEvent(event)}>
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

      {registrations.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Registered Volunteers</h2>
          <CoordinatorTable columns={["Volunteer", "Status"]} data={registrations} />
        </div>
      )}
    </div>
  );
}
