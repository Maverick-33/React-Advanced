import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Input,
  Textarea,
  Text,
  Select,
  useToast,
} from "@chakra-ui/react";
import axios from "../axiosInstance";
import { useNavigate } from "react-router-dom";

const AddEventPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await axios.get("/categories");
      setCategories(response.data);
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newEvent = {
      title,
      description,
      image,
      startTime,
      endTime,
      categoryIds: [selectedCategory], // Set selected category
      createdBy: { id: 1, name: "Admin", image: "admin.png" }, // Dummy user
    };

    try {
      await axios.post("/events", newEvent);
      toast({
        title: "Event created.",
        description: "The event has been created successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/"); // Redirect to Events page
    } catch (err) {
      toast({
        title: "Error creating event.",
        description: "An error occurred while creating the event.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box padding="4">
      <Text fontSize="2xl" mb={4}>
        Add New Event
      </Text>
      <form onSubmit={handleSubmit}>
        <Input
          placeholder="Event Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          mb={4}
          required
        />
        <Textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          mb={4}
          required
        />
        <Input
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          mb={4}
          required
        />
        <Input
          type="datetime-local"
          placeholder="Start Time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          mb={4}
          required
        />
        <Input
          type="datetime-local"
          placeholder="End Time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          mb={4}
          required
        />
        <Select
          placeholder="Select Category"
          value={selectedCategory}
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
        <Button type="submit" colorScheme="teal">
          Add Event
        </Button>
      </form>
    </Box>
  );
};

export default AddEventPage;
