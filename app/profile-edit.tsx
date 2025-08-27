"use client";

import { ThemedText } from "@/components/ThemedText";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  useColorScheme,
  View,
} from "react-native";
import { useAuthStore } from "../modules/auth/hooks/useAuth";
import { apiClient } from "../lib/axios";

export default function ProfileEditScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const router = useRouter();
  const { user, updateProfile } = useAuthStore();

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    location: user?.location || "",
    bio: user?.bio || "",
    age: user?.age?.toString() || "",
    occupation: user?.occupation || "",
    education: user?.education || "",
    income: user?.income?.toString() || "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    if (!formData.name.trim()) {
      Alert.alert("Error", "Name is required");
      return;
    }

    setIsLoading(true);
    try {
      // Update profile using the actual API endpoint
      const response = await apiClient.put("/api/profile", {
        name: formData.name,
        age: parseInt(formData.age) || 0,
        gender: user?.gender || "male",
        religion: user?.religion || "",
        caste: user?.caste || "",
        income: parseInt(formData.income) || 0,
        education: formData.education,
        location: formData.location,
        occupation: formData.occupation,
        bio: formData.bio,
        profile_picture: user?.profile_picture || "",
      });

      if (response.status === 200) {
        // Update local user state
        await updateProfile({
          ...formData,
          age: parseInt(formData.age) || 0,
          income: parseInt(formData.income) || 0,
        });
        
        Alert.alert("Success", "Profile updated successfully", [
          { text: "OK", onPress: () => router.back() },
        ]);
      }
    } catch (error: any) {
      console.error("Profile update error:", error);
      const errorMessage = error.response?.data?.message || "Failed to update profile";
      Alert.alert("Error", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      {/* Header */}
      <LinearGradient
        colors={["#FF6B8B", "#FF8E8E"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </Pressable>
          <ThemedText style={styles.headerTitle}>Edit Profile</ThemedText>
          <Pressable 
            style={[styles.saveButton, isLoading && styles.saveButtonDisabled]} 
            onPress={handleSave}
            disabled={isLoading}
          >
            <ThemedText style={styles.saveButtonText}>
              {isLoading ? "Saving..." : "Save"}
            </ThemedText>
          </Pressable>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content}>
        {/* Profile Image Section */}
        <View style={[styles.imageSection, isDark && styles.imageSectionDark]}>
          <Image
            source={{
              uri:
                user?.profile_picture ||
                user?.photos?.[0] ||
                `https://randomuser.me/api/portraits/${
                  user?.gender === "female" ? "women" : "men"
                }/${user?.id || 1}.jpg`,
            }}
            style={styles.profileImage}
            contentFit="cover"
          />
          <Pressable style={styles.changePhotoButton}>
            <ThemedText style={styles.changePhotoText}>Change Photo</ThemedText>
          </Pressable>
        </View>

        {/* Form Fields */}
        <View style={[styles.formSection, isDark && styles.formSectionDark]}>
          <View style={styles.fieldGroup}>
            <ThemedText style={[styles.fieldLabel, isDark && styles.fieldLabelDark]}>
              Full Name *
            </ThemedText>
            <TextInput
              style={[styles.textInput, isDark && styles.textInputDark]}
              value={formData.name}
              onChangeText={(text) => updateField("name", text)}
              placeholder="Enter your full name"
              placeholderTextColor={isDark ? "#666" : "#999"}
            />
          </View>

          <View style={styles.fieldGroup}>
            <ThemedText style={[styles.fieldLabel, isDark && styles.fieldLabelDark]}>
              Email
            </ThemedText>
            <TextInput
              style={[styles.textInput, isDark && styles.textInputDark]}
              value={formData.email}
              onChangeText={(text) => updateField("email", text)}
              placeholder="Enter your email"
              placeholderTextColor={isDark ? "#666" : "#999"}
              keyboardType="email-address"
            />
          </View>

          <View style={styles.fieldGroup}>
            <ThemedText style={[styles.fieldLabel, isDark && styles.fieldLabelDark]}>
              Age
            </ThemedText>
            <TextInput
              style={[styles.textInput, isDark && styles.textInputDark]}
              value={formData.age}
              onChangeText={(text) => updateField("age", text)}
              placeholder="Enter your age"
              placeholderTextColor={isDark ? "#666" : "#999"}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.fieldGroup}>
            <ThemedText style={[styles.fieldLabel, isDark && styles.fieldLabelDark]}>
              Location
            </ThemedText>
            <TextInput
              style={[styles.textInput, isDark && styles.textInputDark]}
              value={formData.location}
              onChangeText={(text) => updateField("location", text)}
              placeholder="Enter your location"
              placeholderTextColor={isDark ? "#666" : "#999"}
            />
          </View>

          <View style={styles.fieldGroup}>
            <ThemedText style={[styles.fieldLabel, isDark && styles.fieldLabelDark]}>
              Occupation
            </ThemedText>
            <TextInput
              style={[styles.textInput, isDark && styles.textInputDark]}
              value={formData.occupation}
              onChangeText={(text) => updateField("occupation", text)}
              placeholder="Enter your occupation"
              placeholderTextColor={isDark ? "#666" : "#999"}
            />
          </View>

          <View style={styles.fieldGroup}>
            <ThemedText style={[styles.fieldLabel, isDark && styles.fieldLabelDark]}>
              Education
            </ThemedText>
            <TextInput
              style={[styles.textInput, isDark && styles.textInputDark]}
              value={formData.education}
              onChangeText={(text) => updateField("education", text)}
              placeholder="Enter your education level"
              placeholderTextColor={isDark ? "#666" : "#999"}
            />
          </View>

          <View style={styles.fieldGroup}>
            <ThemedText style={[styles.fieldLabel, isDark && styles.fieldLabelDark]}>
              Annual Income
            </ThemedText>
            <TextInput
              style={[styles.textInput, isDark && styles.textInputDark]}
              value={formData.income}
              onChangeText={(text) => updateField("income", text)}
              placeholder="Enter your annual income"
              placeholderTextColor={isDark ? "#666" : "#999"}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.fieldGroup}>
            <ThemedText style={[styles.fieldLabel, isDark && styles.fieldLabelDark]}>
              Bio
            </ThemedText>
            <TextInput
              style={[styles.textArea, isDark && styles.textAreaDark]}
              value={formData.bio}
              onChangeText={(text) => updateField("bio", text)}
              placeholder="Tell us about yourself..."
              placeholderTextColor={isDark ? "#666" : "#999"}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  containerDark: {
    backgroundColor: "#121212",
  },
  header: {
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 16,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
  saveButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 20,
  },
  saveButtonDisabled: {
    opacity: 0.6,
  },
  saveButtonText: {
    color: "white",
    fontWeight: "600",
  },
  content: {
    flex: 1,
  },
  imageSection: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
    marginHorizontal: 16,
    marginTop: 20,
    borderRadius: 12,
  },
  imageSectionDark: {
    backgroundColor: "#1e1e1e",
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  changePhotoButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#FF6B8B",
    borderRadius: 20,
  },
  changePhotoText: {
    color: "white",
    fontWeight: "600",
  },
  formSection: {
    backgroundColor: "white",
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 12,
    padding: 20,
  },
  formSectionDark: {
    backgroundColor: "#1e1e1e",
  },
  fieldGroup: {
    marginBottom: 20,
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  fieldLabelDark: {
    color: "#fff",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "#333",
    backgroundColor: "#f9f9f9",
  },
  textInputDark: {
    borderColor: "#444",
    backgroundColor: "#2a2a2a",
    color: "#fff",
  },
  textArea: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "#333",
    backgroundColor: "#f9f9f9",
    minHeight: 100,
  },
  textAreaDark: {
    borderColor: "#444",
    backgroundColor: "#2a2a2a",
    color: "#fff",
  },
});
