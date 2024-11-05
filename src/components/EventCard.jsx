import React from "react";
import { Box, Text, Image, Button, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "../axiosInstance";

const EventCard = ({ event, onDelete }) => {
  const navigate = useNavigate();

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await axios.delete(`/events/${event.id}`);
        onDelete(event.id);
      } catch (error) {
        console.error("Error deleting event:", error);
        alert("Failed to delete event. Please try again.");
      }
    }
  };

  const startDate = new Date(event.startTime);
  const endDate = new Date(event.endTime);

  const startTime = startDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const endTime = endDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const startDateString = startDate.toLocaleDateString();
  const endDateString = endDate.toLocaleDateString();

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      padding="4"
      marginBottom="4"
      cursor="pointer"
      onClick={() => navigate(`/events/${event.id}`)}
    >
      <Text fontSize="2xl" fontWeight="bold" mb={2}>
        {event.title}
      </Text>
      <Image
        src={event.image}
        alt={event.title}
        borderRadius="md"
        width="100%"
        height="200px"
        objectFit="cover"
      />
      <Text>{event.description}</Text>
      {/* Flex container for start and end time */}
      <Flex
        justify="space-between"
        mb={2}
        display={{ base: "block", md: "flex" }}
      >
        <Text>
          Start: {startDateString}, {startTime}
        </Text>
        <Text>
          End: {endDateString}, {endTime}
        </Text>
      </Flex>
      {/* Flex container for buttons */}
      <Flex justify="space-between">
        <Button
          colorScheme="teal"
          onClick={() => navigate(`/events/${event.id}`)}
          mt={4}
        >
          Edit
        </Button>
        <Button colorScheme="red" onClick={handleDelete} mt={4} ml={2}>
          Delete
        </Button>
      </Flex>
    </Box>
  );
};

export default EventCard;
