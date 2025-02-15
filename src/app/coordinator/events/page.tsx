"use client";

import React, { useState } from "react";
import {
  Plus,
  Edit,
  Calendar,
  Users,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { VolunteerActivity, EventFormData } from "@/types/dataTypes";
import { volunteerActivities, sampleEventRegistrations } from "@/data/sampleData";

/**
 * Generates a new unique event code.
 */
const generateNewCode = () => {
  return `VOL-${new Date().getFullYear()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
};

/**
 * Gets the number of attendees for a specific event.
 */
const getEventAttendance = (eventId: string) => {
  return sampleEventRegistrations.filter(
    (reg) => reg.eventId === eventId && reg.status === "attended"
  ).length;
};

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
};

const EventsPage = () => {
  const [events, setEvents] = useState<VolunteerActivity[]>(volunteerActivities);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<VolunteerActivity | null>(null);
  const [formData, setFormData] = useState<EventFormData>(initialFormData);

  // Handles form input changes
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

  // Adds a new event
  const handleAddEvent = () => {
    const newEvent: VolunteerActivity = {
      id: `act-${events.length + 1}`,
      code: generateNewCode(),
      ...formData,
      date: new Date(formData.date),
    };

    setEvents([...events, newEvent]);
    setShowAddForm(false);
    setFormData(initialFormData);
  };

  // Updates an existing event
  const handleUpdateEvent = () => {
    if (!selectedEvent) return;

    setEvents(events.map((event) => (event.id === selectedEvent.id ? { ...event, ...formData, date: new Date(formData.date) } : event)));

    setSelectedEvent(null);
    setFormData(initialFormData);
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

      <div className="space-y-4">
        {events.map((event) => (
          <Card key={event.id || `unknown-event-${Math.random()}`} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                <div className="space-y-4 flex-1">
                  <h3 className="text-xl font-semibold">{event.name}</h3>
                  <p className="text-gray-600">{event.description}</p>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(event.date).toLocaleDateString()} at {event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Users className="w-4 h-4" />
                      <span>{getEventAttendance(event.id || "unknown-event")} Volunteers Attended</span>
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={() => setSelectedEvent(event)}>
                  <Edit className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {showAddForm && <EventForm formData={formData} handleFormChange={handleFormChange} handleAddEvent={handleAddEvent} setShowAddForm={setShowAddForm} />}
      {selectedEvent && <EventForm formData={formData} handleFormChange={handleFormChange} handleAddEvent={handleUpdateEvent} setShowAddForm={() => setSelectedEvent(null)} isEdit />}
    </div>
  );
};

// 🔹 Refactored EventForm component to reduce clutter in the main component
const EventForm = ({ formData, handleFormChange, handleAddEvent, setShowAddForm, isEdit = false }: any) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto">
    <div className="min-h-screen pb-20 px-4 pt-6 flex justify-center">
      <Card className="w-full max-w-lg mb-20">
        <div className="p-6 space-y-6">
          <h2 className="text-2xl font-semibold mb-2">{isEdit ? "Edit Event" : "Add New Event"}</h2>
          <p className="text-gray-600">{isEdit ? "Modify event details" : "Create a new volunteer event"}</p>

          <div className="space-y-4">
            <Input name="name" placeholder="Event Name" value={formData.name} onChange={handleFormChange} />
            <Input name="organization" placeholder="Organization" value={formData.organization} onChange={handleFormChange} />
            <Input name="category" placeholder="Category" value={formData.category} onChange={handleFormChange} />
            <div className="grid grid-cols-2 gap-4">
              <Input name="hours" type="number" placeholder="Hours" value={formData.hours} onChange={handleFormChange} />
              <Input name="time" type="time" value={formData.time} onChange={handleFormChange} />
            </div>
            <Input name="date" type="date" value={formData.date} onChange={handleFormChange} />
            <Input name="impact" placeholder="Impact Description" value={formData.impact} onChange={handleFormChange} />
          </div>

          <div className="flex gap-2 justify-end pt-4">
            <Button variant="outline" onClick={() => setShowAddForm(false)}>Cancel</Button>
            <Button className="bg-red-600 hover:bg-red-700" onClick={handleAddEvent}>{isEdit ? "Update Event" : "Create Event"}</Button>
          </div>
        </div>
      </Card>
    </div>
  </div>
);

export default EventsPage;
