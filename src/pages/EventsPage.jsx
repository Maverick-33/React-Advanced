import React, { useState, useEffect } from "react";
import { Box, Input, Select, SimpleGrid, Text } from "@chakra-ui/react";
import EventCard from "../components/EventCard";
import axios from "../axiosInstance";

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventsResponse = await axios.get("/events");
        setEvents(eventsResponse.data);
        setFilteredEvents(eventsResponse.data);

        const categoriesResponse = await axios.get("/categories");
        setCategories(categoriesResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filterEvents = () => {
      let filtered = events;

      if (searchTerm) {
        filtered = filtered.filter((event) =>
          event.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      if (selectedCategory) {
        filtered = filtered.filter((event) =>
          event.categoryIds.includes(Number(selectedCategory))
        );
      }

      setFilteredEvents(filtered);
    };

    filterEvents();
  }, [searchTerm, selectedCategory, events]);

  const handleDelete = (deletedId) => {
    setEvents((prevEvents) =>
      prevEvents.filter((event) => event.id !== deletedId)
    );
    setFilteredEvents((prevFilteredEvents) =>
      prevFilteredEvents.filter((event) => event.id !== deletedId)
    );
  };

  return (
    <Box p={4}>
      <Input
        placeholder="Search events..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        mb={4}
      />

      <Select
        placeholder="All Categories"
        onChange={(e) => setSelectedCategory(e.target.value)}
        mb={4}
        variant="outline"
        size="lg"
      >
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </Select>

      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={6}>
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} onDelete={handleDelete} />
          ))
        ) : (
          <Text>No events found</Text>
        )}
      </SimpleGrid>
    </Box>
  );
};

export default EventsPage;
