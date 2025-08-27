"use client";

import { ThemedText } from "@/components/ThemedText";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Dimensions,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from "react-native";
import { useAuthStore } from "../modules/auth/hooks/useAuth";
import { useLikesStore } from "../modules/likes/hooks/useLikes";

const { width, height } = Dimensions.get("window");

export default function ProfileDetailScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const router = useRouter();
  const params = useLocalSearchParams();

  // Get user data from params
  const userData = params.userData
    ? JSON.parse(params.userData as string)
    : null;
  const compatibilityPercentage = params.compatibilityPercentage
    ? parseInt(params.compatibilityPercentage as string)
    : 0;

  const { likeUser, unlikeUser, likedUserIds } = useLikesStore();
  const { user } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  if (!userData) {
    return (
      <View
        style={[
          styles.container,
          { backgroundColor: isDark ? "#0A0A0A" : "#FAFAFA" },
        ]}
      >
        <ThemedText style={styles.errorText}>User data not found</ThemedText>
      </View>
    );
  }

  const isLiked = likedUserIds.includes(userData.id);

  const handleLike = async () => {
    if (!user?.id) {
      Alert.alert("Error", "Please log in to like users.");
      return;
    }

    setIsLoading(true);
    try {
      if (isLiked) {
        await unlikeUser(userData.id);
        Alert.alert("Success", "User removed from likes!");
      } else {
        const result = await likeUser(userData.id);
        if (result.is_match) {
          Alert.alert(
            "It's a Match! 🎉",
            `You and ${userData.name} liked each other!`,
            [{ text: "Great!", style: "default" }]
          );
        } else {
          Alert.alert("Success", "User liked successfully!");
        }
      }
    } catch (error: any) {
      console.error("Error handling like:", error);

      // Handle "already liked" case gracefully
      if (error.response?.data?.message === "Already liked this profile") {
        Alert.alert("Info", "You've already liked this user! 💕");
      } else {
        Alert.alert("Error", "Failed to update like status. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleMessage = () => {
    if (!user?.id) {
      Alert.alert("Error", "Please log in to send messages.");
      return;
    }

    // Check if this user is liked (which means they might be matched)
    if (isLiked) {
      // If user is liked, allow messaging (they might be matched)
      router.push({
        pathname: "/chat",
        params: {
          userData: JSON.stringify(userData),
        },
      });
    } else {
      // If user is not liked, show helpful message
      Alert.alert(
        "Cannot Message Yet",
        "You can only message users you've matched with. Make sure you both have liked each other first! 💕",
        [
          { text: "OK", style: "default" },
          {
            text: "Try Anyway",
            style: "default",
            onPress: () => {
              router.push({
                pathname: "/chat",
                params: {
                  userData: JSON.stringify(userData),
                },
              });
            },
          },
        ]
      );
    }
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? "#0A0A0A" : "#FAFAFA" },
      ]}
    >
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <LinearGradient
        colors={["#FF6B8B", "#FF8E8E", "#FFB3BA"]}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </Pressable>
          <ThemedText style={styles.headerTitle}>Profile</ThemedText>
          <Pressable style={styles.shareButton}>
            <Ionicons name="share-outline" size={24} color="white" />
          </Pressable>
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri:
                userData.photos?.[0] ||
                `https://randomuser.me/api/portraits/${
                  userData.gender === "female" ? "women" : "men"
                }/${userData.id || 1}.jpg`,
            }}
            style={styles.profileImage}
            contentFit="cover"
          />

          {/* Compatibility Badge */}
          <View style={styles.compatibilityBadge}>
            <ThemedText style={styles.compatibilityText}>
              {compatibilityPercentage}%
            </ThemedText>
            <ThemedText style={styles.compatibilityLabel}>Match</ThemedText>
          </View>

          {/* Liked Badge */}
          {isLiked && (
            <View style={styles.likedBadge}>
              <Ionicons name="heart" size={16} color="white" />
              <ThemedText style={styles.likedBadgeText}>Liked</ThemedText>
            </View>
          )}
        </View>

        {/* Profile Info */}
        <View style={styles.profileInfo}>
          <View style={styles.nameAgeRow}>
            <ThemedText style={styles.name}>{userData.name}</ThemedText>
            <ThemedText style={styles.age}>{userData.age}</ThemedText>
          </View>

          {/* Location */}
          <View style={styles.infoRow}>
            <Ionicons name="location" size={16} color="#FF6B8B" />
            <ThemedText style={styles.infoText}>
              {userData.location || "Location not specified"}
            </ThemedText>
          </View>

          {/* Distance */}
          {userData.distance && (
            <View style={styles.infoRow}>
              <Ionicons name="navigate" size={16} color="#FF6B8B" />
              <ThemedText style={styles.infoText}>
                {userData.distance} miles away
              </ThemedText>
            </View>
          )}

          {/* Bio */}
          {userData.bio && (
            <View style={styles.bioSection}>
              <ThemedText style={styles.sectionTitle}>About</ThemedText>
              <ThemedText style={styles.bioText}>{userData.bio}</ThemedText>
            </View>
          )}

          {/* Details Grid */}
          <View style={styles.detailsGrid}>
            <View style={styles.detailItem}>
              <MaterialCommunityIcons
                name="briefcase"
                size={20}
                color="#FF6B8B"
              />
              <ThemedText style={styles.detailLabel}>Occupation</ThemedText>
              <ThemedText style={styles.detailValue}>
                {userData.occupation || "Not specified"}
              </ThemedText>
            </View>

            <View style={styles.detailItem}>
              <MaterialCommunityIcons name="school" size={20} color="#FF6B8B" />
              <ThemedText style={styles.detailLabel}>Education</ThemedText>
              <ThemedText style={styles.detailValue}>
                {userData.education || "Not specified"}
              </ThemedText>
            </View>

            <View style={styles.detailItem}>
              <MaterialCommunityIcons
                name="currency-usd"
                size={20}
                color="#FF6B8B"
              />
              <ThemedText style={styles.detailLabel}>Income</ThemedText>
              <ThemedText style={styles.detailValue}>
                {userData.income
                  ? `₹${userData.income.toLocaleString()}`
                  : "Not specified"}
              </ThemedText>
            </View>

            <View style={styles.detailItem}>
              <MaterialCommunityIcons
                name="religion"
                size={20}
                color="#FF6B8B"
              />
              <ThemedText style={styles.detailLabel}>Religion</ThemedText>
              <ThemedText style={styles.detailValue}>
                {userData.religion || "Not specified"}
              </ThemedText>
            </View>

            <View style={styles.detailItem}>
              <MaterialCommunityIcons
                name="account-group"
                size={20}
                color="#FF6B8B"
              />
              <ThemedText style={styles.detailLabel}>Caste</ThemedText>
              <ThemedText style={styles.detailValue}>
                {userData.caste || "Not specified"}
              </ThemedText>
            </View>
          </View>

          {/* Photos Gallery */}
          {userData.photos && userData.photos.length > 1 && (
            <View style={styles.photosSection}>
              <ThemedText style={styles.sectionTitle}>Photos</ThemedText>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {userData.photos.map((photo: string, index: number) => (
                  <Image
                    key={index}
                    source={{ uri: photo }}
                    style={styles.galleryImage}
                    contentFit="cover"
                  />
                ))}
              </ScrollView>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <Pressable
          style={[styles.actionButton, styles.messageButton]}
          onPress={handleMessage}
        >
          <Ionicons name="chatbubble-outline" size={24} color="white" />
          <ThemedText style={styles.actionButtonText}>Message</ThemedText>
        </Pressable>

        <Pressable
          style={[
            styles.actionButton,
            isLiked ? styles.unlikeButton : styles.likeButton,
          ]}
          onPress={handleLike}
          disabled={isLoading}
        >
          <Ionicons
            name={isLiked ? "heart" : "heart-outline"}
            size={24}
            color="white"
          />
          <ThemedText style={styles.actionButtonText}>
            {isLiked ? "Unlike" : "Like"}
          </ThemedText>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
  },
  shareButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    position: "relative",
    height: height * 0.4,
  },
  profileImage: {
    width: "100%",
    height: "100%",
  },
  compatibilityBadge: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "rgba(255, 107, 139, 0.95)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignItems: "center",
  },
  compatibilityText: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
  },
  compatibilityLabel: {
    color: "white",
    fontSize: 12,
    fontWeight: "500",
  },
  likedBadge: {
    position: "absolute",
    top: 20,
    left: 20,
    backgroundColor: "#FF3B5C",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  likedBadgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "700",
  },
  profileInfo: {
    padding: 20,
  },
  nameAgeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  name: {
    fontSize: 28,
    fontWeight: "700",
    marginRight: 8,
  },
  age: {
    fontSize: 24,
    fontWeight: "600",
    opacity: 0.7,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  infoText: {
    fontSize: 16,
    marginLeft: 8,
    fontWeight: "500",
  },
  bioSection: {
    marginTop: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 12,
  },
  bioText: {
    fontSize: 16,
    lineHeight: 24,
    opacity: 0.8,
  },
  detailsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    marginBottom: 24,
  },
  detailItem: {
    width: (width - 60) / 2,
    backgroundColor: "rgba(255, 107, 139, 0.1)",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  detailLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#FF6B8B",
    marginTop: 8,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },
  photosSection: {
    marginBottom: 24,
  },
  galleryImage: {
    width: 120,
    height: 120,
    borderRadius: 12,
    marginRight: 12,
  },
  actionButtons: {
    flexDirection: "row",
    padding: 20,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  messageButton: {
    backgroundColor: "#5DADE2",
  },
  likeButton: {
    backgroundColor: "#FF6B8B",
  },
  unlikeButton: {
    backgroundColor: "#FF3B5C",
  },
  actionButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },
  errorText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 100,
  },
});
