import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Text,
  Image,
  Spinner,
  useToast,
  Flex,
} from "@chakra-ui/react";
import axios from "../axiosInstance";
import EditEventModal from "../components/EditEventModal";

const EventPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch the event details
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`/events/${id}`);
        setEvent(response.data);
        setLoading(false);
      } catch (err) {
        setError("Event not found");
        setLoading(false);
      }
    };

    // Fetch the categories to display names instead of IDs
    const fetchCategories = async () => {
      const response = await axios.get("/categories");
      setCategories(response.data);
    };

    fetchEvent();
    fetchCategories();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await axios.delete(`/events/${id}`);
        toast({
          title: "Event deleted.",
          description: "The event has been deleted successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        navigate("/");
      } catch (err) {
        toast({
          title: "Error deleting event.",
          description: "An error occurred while deleting the event.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  const handleEdit = (updatedEvent) => {
    setEvent(updatedEvent);
    setIsEditing(false);
    toast({
      title: "Event updated.",
      description: "The event has been updated successfully.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  if (loading) return <Spinner />;
  if (error) return <Text>{error}</Text>;

  const startTime = new Date(event.startTime);
  const endTime = new Date(event.endTime);

  // Map category IDs to names
  const categoryNames = event.categoryIds
    .map((categoryId) => {
      const category = categories.find(
        (cat) => cat.id === categoryId.toString()
      );
      return category ? category.name : "";
    })
    .filter((name) => name) // Filter out any empty names
    .join(", ");

  return (
    <Flex direction="column" align="center" padding="4" maxW="100%">
      <Box maxWidth="800px" width="100%" padding="4">
        <Text fontSize={{ base: "2xl", md: "3xl" }} fontWeight="bold" mb="4">
          {event.title}
        </Text>
        <Image
          src={event.image}
          alt={event.title}
          borderRadius="md"
          objectFit="cover"
          width="100%"
          height={{ base: "250px", md: "400px" }}
          mb="4"
        />
        <Text fontSize="lg" mt={4} mb={2}>
          {event.description}
        </Text>
        <Text mt={2} fontSize="md">
          <strong>Start Time:</strong> {startTime.toLocaleString()}
        </Text>
        <Text mt={2} fontSize="md">
          <strong>End Time:</strong> {endTime.toLocaleString()}
        </Text>
        <Text mt={2} fontSize="md">
          <strong>Categories:</strong> {categoryNames || "Uncategorized"}
        </Text>
        <Flex mt={6} justifyContent="space-between">
          <Button onClick={() => setIsEditing(true)} colorScheme="teal">
            Edit
          </Button>
          <Button onClick={handleDelete} colorScheme="red">
            Delete
          </Button>
        </Flex>
      </Box>

      {/* Edit Modal */}
      {isEditing && (
        <EditEventModal
          event={event}
          onClose={() => setIsEditing(false)}
          onSave={handleEdit}
        />
      )}
    </Flex>
  );
};

export default EventPage;
