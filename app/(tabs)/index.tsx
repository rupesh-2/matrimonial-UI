"use client";

import { ThemedText } from "@/components/ThemedText";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  Pressable,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from "react-native";
import { useAuthStore } from "../../modules/auth/hooks/useAuth";
import { useLikesStore } from "../../modules/likes/hooks/useLikes";
import { useMatchmakingStore } from "../../modules/matchmaking/hooks/useMatchmaking";

const { width } = Dimensions.get("window");

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  // API Integration
  const { recommendations, isLoading, error, getRecommendations, refresh } =
    useMatchmakingStore();
  const { likeUser, unlikeUser, likedUserIds } = useLikesStore();
  const { user } = useAuthStore();

  // State for tracking removed users
  const [removedUserIds, setRemovedUserIds] = useState<number[]>([]);

  // Load recommendations on component mount
  useEffect(() => {
    // Only load recommendations if user is authenticated
    if (user?.id) {
      console.log("User authenticated, loading recommendations...");
      getRecommendations(10, 1).catch((error) => {
        // If API fails, we'll show empty state
        console.log("API not available, showing empty state:", error);
      });
    } else {
      console.log("User not authenticated, skipping recommendations load");
    }
  }, [user?.id]);

  // Use actual recommendations from API with safety checks, filtered to remove deleted users
  const displayRecommendations = Array.isArray(recommendations)
    ? recommendations.filter(
        (recommendation) =>
          recommendation?.user?.id &&
          !removedUserIds.includes(recommendation.user.id)
      )
    : [];

  // Debug logging
  console.log("Recommendations state:", {
    recommendations,
    isArray: Array.isArray(recommendations),
    length: recommendations?.length,
    displayLength: displayRecommendations.length,
  });

  // Handle like/unlike actions
  const handleLike = async (userId: number) => {
    try {
      console.log("Handling like for user ID:", userId);
      console.log("Current user:", user);
      console.log("Is authenticated:", user?.id);

      if (!user?.id) {
        Alert.alert("Error", "Please log in to like users.", [
          { text: "OK", style: "default" },
        ]);
        return;
      }

      const result = await likeUser(userId);
      console.log("Like result:", result);
      if (result.is_match) {
        Alert.alert(
          "It's a Match! 🎉",
          `You and ${result.matched_user?.name} liked each other!`,
          [{ text: "Great!", style: "default" }]
        );
      } else {
        Alert.alert("Success", "User liked successfully!", [
          { text: "OK", style: "default" },
        ]);
      }
    } catch (error: any) {
      console.error("Error liking user:", error);

      // Handle specific error cases
      if (
        error.response?.data?.message === "Already liked this user" ||
        error.response?.data?.message === "Already liked this profile"
      ) {
        Alert.alert("Info", "You've already liked this user! 💕", [
          { text: "OK", style: "default" },
        ]);
      } else if (error.message === "Invalid user ID provided") {
        Alert.alert(
          "Error",
          "Invalid user data. Please refresh and try again.",
          [{ text: "OK", style: "default" }]
        );
      } else {
        Alert.alert("Error", "Failed to like user. Please try again.", [
          { text: "OK", style: "default" },
        ]);
      }
    }
  };

  const handleUnlike = async (userId: number) => {
    try {
      console.log("Handling unlike for user ID:", userId);
      await unlikeUser(userId);
      console.log("User unliked successfully");
      Alert.alert("Success", "User removed from likes!", [
        { text: "OK", style: "default" },
      ]);
    } catch (error) {
      console.error("Error unliking user:", error);
      Alert.alert("Error", "Failed to unlike user. Please try again.", [
        { text: "OK", style: "default" },
      ]);
    }
  };

  const handleRemoveFromMatches = (userId: number) => {
    Alert.alert(
      "Remove from Today's Matches",
      "Are you sure you want to remove this user from today's matches?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: () => {
            console.log("Removing user from matches:", userId);

            // Add user ID to removed list
            setRemovedUserIds((prev) => [...prev, userId]);

            Alert.alert("Success", "User removed from today's matches!", [
              { text: "OK", style: "default" },
            ]);
          },
        },
      ]
    );
  };

  const handleRefresh = () => {
    if (user?.id) {
      // Clear removed users list when refreshing
      setRemovedUserIds([]);
      refresh();
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: isDark ? "#0A0A0A" : "#FAFAFA" }}>
      <StatusBar barStyle="light-content" />

      <LinearGradient
        colors={["#FF6B8B", "#FF8E8E", "#FFB3BA"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View style={styles.logoContainer}>
            <View style={styles.logoIconContainer}>
              <MaterialCommunityIcons
                name="heart-multiple"
                size={28}
                color="white"
              />
            </View>
            <ThemedText style={styles.logoText}>Bandhan</ThemedText>
          </View>
          <View style={styles.headerIcons}>
            <Pressable style={styles.iconButton}>
              <View style={styles.iconBackground}>
                <Ionicons
                  name="notifications-outline"
                  size={22}
                  color="white"
                />
              </View>
            </Pressable>
            <Pressable style={styles.iconButton}>
              <View style={styles.iconBackground}>
                <Ionicons
                  name="chatbubble-ellipses-outline"
                  size={22}
                  color="white"
                />
                <View style={styles.badge}>
                  <ThemedText style={styles.badgeText}>3</ThemedText>
                </View>
              </View>
            </Pressable>
          </View>
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={handleRefresh}
            colors={["#FF6B8B"]}
            tintColor="#FF6B8B"
          />
        }
      >
        {/* Error State */}
        {error && (
          <View style={styles.errorContainer}>
            <ThemedText style={styles.errorText}>
              {error || "An error occurred"}
            </ThemedText>
            <Pressable style={styles.retryButton} onPress={handleRefresh}>
              <ThemedText style={styles.retryText}>Retry</ThemedText>
            </Pressable>
          </View>
        )}

        {/* Loading State */}
        {isLoading === true &&
          (!Array.isArray(recommendations) || recommendations.length === 0) && (
            <View style={styles.loadingContainer}>
              <ThemedText style={styles.loadingText}>
                Loading recommendations...
              </ThemedText>
            </View>
          )}

        {/* Empty State */}
        {!isLoading &&
          (!Array.isArray(recommendations) || recommendations.length === 0) &&
          !error && (
            <View style={styles.emptyContainer}>
              <ThemedText style={styles.emptyText}>
                No recommendations available
              </ThemedText>
              <ThemedText style={styles.emptySubtext}>
                Make sure your Laravel API is running on
                http://192.168.1.69:8000
              </ThemedText>
              <ThemedText style={styles.emptySubtext}>
                Run: php artisan serve --host=0.0.0.0 --port=8000
              </ThemedText>
              <ThemedText style={styles.emptySubtext}>
                Check the console for API connection details
              </ThemedText>
            </View>
          )}

        <View style={styles.dailyMatchesCard}>
          <LinearGradient
            colors={isDark ? ["#1A1A1A", "#2A2A2A"] : ["#FFFFFF", "#F8F9FA"]}
            style={[styles.dailyMatchesGradient, { borderRadius: 20 }]}
          >
            <View style={styles.dailyMatchesHeader}>
              <View>
                <ThemedText style={styles.dailyMatchesTitle}>
                  Today's Matches ✨
                </ThemedText>
                <ThemedText style={styles.dailyMatchesSubtitle}>
                  Curated just for you
                </ThemedText>
              </View>
              <View style={styles.headerActions}>
                <Pressable style={styles.refreshButton} onPress={handleRefresh}>
                  <Ionicons
                    name="refresh"
                    size={18}
                    color={isDark ? "#fff" : "#FF6B8B"}
                  />
                </Pressable>
                <Pressable
                  style={[styles.refreshButton, { marginLeft: 8 }]}
                  onPress={() => {
                    if (user?.id) {
                      console.log("Testing API connection...");
                      getRecommendations(10, 1);
                    } else {
                      console.log("User not authenticated, cannot test API");
                    }
                  }}
                >
                  <Ionicons
                    name="bug"
                    size={18}
                    color={isDark ? "#fff" : "#FF6B8B"}
                  />
                </Pressable>
              </View>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.matchCarousel}
              style={{ flexGrow: 0 }}
            >
              {(() => {
                try {
                  return displayRecommendations.map((recommendation) => (
                    <Pressable
                      key={recommendation?.user?.id || Math.random()}
                      style={styles.carouselItem}
                    >
                      <Image
                        source={{
                          uri:
                            (recommendation?.user?.photos &&
                              recommendation.user.photos[0]) ||
                            `https://randomuser.me/api/portraits/${
                              recommendation?.user?.gender === "female"
                                ? "women"
                                : "men"
                            }/${recommendation?.user?.id || 1}.jpg`,
                        }}
                        style={styles.carouselImage}
                        contentFit="cover"
                      />
                      <BlurView
                        intensity={90}
                        style={styles.carouselInfo}
                        tint={isDark ? "dark" : "light"}
                      >
                        <ThemedText style={styles.carouselName}>
                          {recommendation?.user?.name || "Unknown"},{" "}
                          {recommendation?.user?.age || 0}
                        </ThemedText>
                        <View style={styles.locationRow}>
                          <Ionicons name="location" size={12} color="#FF6B8B" />
                          <ThemedText style={styles.carouselLocation}>
                            {recommendation?.user?.location || "Unknown"} •{" "}
                            {recommendation?.user?.distance || 0} mi
                          </ThemedText>
                        </View>
                      </BlurView>
                      <View style={styles.matchActions}>
                        <Pressable
                          style={[styles.actionButton, styles.removeButton]}
                          onPress={() =>
                            handleRemoveFromMatches(
                              recommendation?.user?.id || 0
                            )
                          }
                        >
                          <Ionicons
                            name="trash-outline"
                            size={16}
                            color="#FF5C5C"
                          />
                        </Pressable>
                      </View>
                    </Pressable>
                  ));
                } catch (error) {
                  console.error("Error rendering carousel:", error);
                  return null;
                }
              })()}
            </ScrollView>
          </LinearGradient>
        </View>

        <View style={styles.quickActions}>
          <Pressable style={styles.actionCard}>
            <LinearGradient
              colors={["#FFE8EC", "#FFF0F2"]}
              style={styles.actionIcon}
            >
              <Ionicons name="search" size={24} color="#FF6B8B" />
            </LinearGradient>
            <ThemedText style={styles.actionText}>Search</ThemedText>
          </Pressable>

          <Pressable style={styles.actionCard}>
            <LinearGradient
              colors={["#E8F4FF", "#F0F8FF"]}
              style={styles.actionIcon}
            >
              <Ionicons name="filter" size={24} color="#5DADE2" />
            </LinearGradient>
            <ThemedText style={styles.actionText}>Filter</ThemedText>
          </Pressable>

          <Pressable style={styles.actionCard}>
            <LinearGradient
              colors={["#E8FFF1", "#F0FFF4"]}
              style={styles.actionIcon}
            >
              <Ionicons name="heart" size={24} color="#2ECC71" />
            </LinearGradient>
            <ThemedText style={styles.actionText}>Likes</ThemedText>
          </Pressable>

          <Pressable style={styles.actionCard}>
            <LinearGradient
              colors={["#FFF5E8", "#FFFAF0"]}
              style={styles.actionIcon}
            >
              <Ionicons name="star" size={24} color="#F39C12" />
            </LinearGradient>
            <ThemedText style={styles.actionText}>Premium</ThemedText>
          </Pressable>
        </View>

        {/* Discover Section */}
        <View style={styles.sectionHeader}>
          <View>
            <ThemedText style={styles.sectionTitle}>Discover</ThemedText>
            <ThemedText style={styles.sectionSubtitle}>
              New profiles near you
            </ThemedText>
          </View>
          <Pressable style={styles.seeAllButton}>
            <ThemedText style={styles.seeAllText}>See All</ThemedText>
            <Ionicons name="chevron-forward" size={16} color="#FF6B8B" />
          </Pressable>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.discoverScroll}
        >
          {(() => {
            try {
              return displayRecommendations
                .slice(3, 8)
                .map((recommendation) => (
                  <Pressable
                    key={recommendation?.user?.id || Math.random()}
                    style={styles.discoverCard}
                  >
                    <Image
                      source={{
                        uri:
                          (recommendation?.user?.photos &&
                            recommendation.user.photos[0]) ||
                          `https://randomuser.me/api/portraits/${
                            recommendation?.user?.gender === "female"
                              ? "women"
                              : "men"
                          }/${recommendation?.user?.id || 1}.jpg`,
                      }}
                      style={styles.discoverImage}
                      contentFit="cover"
                    />
                    <LinearGradient
                      colors={["transparent", "rgba(0,0,0,0.8)"]}
                      style={styles.discoverGradient}
                    >
                      <View style={styles.discoverInfo}>
                        <ThemedText style={styles.discoverName}>
                          {recommendation?.user?.name || "Unknown"},{" "}
                          {recommendation?.user?.age || 0}
                        </ThemedText>
                        <View style={styles.discoverDetails}>
                          <View style={styles.discoverDetail}>
                            <Ionicons
                              name="location"
                              size={12}
                              color="#FFB3BA"
                            />
                            <ThemedText style={styles.discoverDetailText}>
                              {recommendation?.user?.location || "Unknown"}
                            </ThemedText>
                          </View>
                          <View style={styles.discoverDetail}>
                            <Ionicons
                              name="briefcase"
                              size={12}
                              color="#FFB3BA"
                            />
                            <ThemedText style={styles.discoverDetailText}>
                              {recommendation?.user?.occupation ||
                                "Professional"}
                            </ThemedText>
                          </View>
                        </View>
                      </View>
                    </LinearGradient>
                    <View style={styles.compatibilityBadge}>
                      <ThemedText style={styles.compatibilityText}>
                        {Math.round(recommendation.compatibility_percentage)}%
                      </ThemedText>
                    </View>

                    {/* Liked Badge */}
                    {likedUserIds.includes(recommendation?.user?.id || 0) && (
                      <View style={styles.likedBadge}>
                        <Ionicons name="heart" size={12} color="white" />
                        <ThemedText style={styles.likedBadgeText}>
                          Liked
                        </ThemedText>
                      </View>
                    )}

                    {/* Like Button for Discover Cards */}
                    <View style={styles.discoverActions}>
                      <Pressable
                        style={[
                          styles.discoverActionButton,
                          likedUserIds.includes(
                            recommendation?.user?.id || 0
                          ) && styles.discoverActionButtonLiked,
                        ]}
                        onPress={() => {
                          const userId = recommendation?.user?.id;
                          console.log("Like button pressed for user:", {
                            userId,
                            recommendation: recommendation?.user,
                            isLiked: likedUserIds.includes(userId || 0),
                          });

                          if (!userId || userId <= 0) {
                            Alert.alert(
                              "Error",
                              "Invalid user data. Please refresh and try again."
                            );
                            return;
                          }

                          if (likedUserIds.includes(userId)) {
                            handleUnlike(userId);
                          } else {
                            handleLike(userId);
                          }
                        }}
                      >
                        <Ionicons
                          name={
                            likedUserIds.includes(recommendation?.user?.id || 0)
                              ? "heart"
                              : "heart-outline"
                          }
                          size={20}
                          color={
                            likedUserIds.includes(recommendation?.user?.id || 0)
                              ? "#FF3B5C"
                              : "#FF6B8B"
                          }
                        />
                      </Pressable>
                    </View>
                  </Pressable>
                ));
            } catch (error) {
              console.error("Error rendering discover section:", error);
              return null;
            }
          })()}
        </ScrollView>

        <View style={styles.sectionHeader}>
          <View>
            <ThemedText style={styles.sectionTitle}>Recent Activity</ThemedText>
            <ThemedText style={styles.sectionSubtitle}>
              What's happening
            </ThemedText>
          </View>
          <Pressable style={styles.seeAllButton}>
            <ThemedText style={styles.seeAllText}>See All</ThemedText>
            <Ionicons name="chevron-forward" size={16} color="#FF6B8B" />
          </Pressable>
        </View>

        <View style={styles.activityContainer}>
          {[1, 2, 3].map((item) => (
            <View key={item} style={styles.activityItem}>
              <View style={styles.activityAvatarContainer}>
                <Image
                  source={{
                    uri: `https://randomuser.me/api/portraits/${
                      item % 2 === 0 ? "men" : "women"
                    }/${item + 50}.jpg`,
                  }}
                  style={styles.activityAvatar}
                  contentFit="cover"
                />
                <View
                  style={[
                    styles.activityIndicator,
                    {
                      backgroundColor:
                        item === 1
                          ? "#FF6B8B"
                          : item === 2
                          ? "#5DADE2"
                          : "#2ECC71",
                    },
                  ]}
                >
                  {item === 1 ? (
                    <Ionicons name="heart" size={12} color="white" />
                  ) : item === 2 ? (
                    <Ionicons name="eye" size={12} color="white" />
                  ) : (
                    <Ionicons name="chatbubble" size={12} color="white" />
                  )}
                </View>
              </View>
              <View style={styles.activityContent}>
                <ThemedText style={styles.activityText}>
                  <ThemedText style={styles.activityName}>
                    {item % 2 === 0 ? "Robert" : "Jessica"}
                  </ThemedText>
                  {item === 1
                    ? " liked your profile"
                    : item === 2
                    ? " viewed your profile"
                    : " sent you a message"}
                </ThemedText>
                <ThemedText style={styles.activityTime}>2 hours ago</ThemedText>
              </View>
              <Pressable style={styles.activityAction}>
                {item === 1 ? (
                  <Ionicons name="heart" size={20} color="#FF6B8B" />
                ) : item === 2 ? (
                  <Ionicons name="eye" size={20} color="#5DADE2" />
                ) : (
                  <Ionicons name="chatbubble" size={20} color="#2ECC71" />
                )}
              </Pressable>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 30,
  },
  header: {
    paddingTop: 55,
    paddingBottom: 20,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  logoText: {
    color: "white",
    fontSize: 24,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    marginLeft: 16,
  },
  iconBackground: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  badge: {
    position: "absolute",
    top: -2,
    right: -2,
    backgroundColor: "#FF3B5C",
    borderRadius: 12,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "white",
  },
  badgeText: {
    color: "white",
    fontSize: 11,
    fontWeight: "700",
  },
  dailyMatchesCard: {
    marginTop: 20,
    marginHorizontal: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
  },
  dailyMatchesGradient: {
    borderRadius: 20,
    padding: 20,
  },
  dailyMatchesHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  dailyMatchesTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 4,
  },
  dailyMatchesSubtitle: {
    fontSize: 14,
    opacity: 0.7,
    fontWeight: "500",
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  refreshButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255, 107, 139, 0.15)",
    justifyContent: "center",
    alignItems: "center",
  },
  matchCarousel: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  carouselItem: {
    width: (width - 64) / 3,
    height: 180,
    borderRadius: 16,
    overflow: "hidden",
    position: "relative",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  carouselImage: {
    width: "100%",
    height: "100%",
  },
  carouselInfo: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
  },
  carouselName: {
    color: "white",
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 4,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  carouselLocation: {
    color: "white",
    fontSize: 11,
    opacity: 0.9,
    marginLeft: 4,
    fontWeight: "500",
  },
  matchActions: {
    position: "absolute",
    top: 12,
    right: 12,
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
  },
  actionButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  declineButton: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
  },
  likeButton: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
  },
  removeButton: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
  },
  quickActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: 32,
    gap: 12,
  },
  actionCard: {
    alignItems: "center",
    flex: 1,
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  actionText: {
    fontSize: 13,
    fontWeight: "600",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginHorizontal: 20,
    marginTop: 36,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 2,
  },
  sectionSubtitle: {
    fontSize: 13,
    opacity: 0.7,
    fontWeight: "500",
  },
  seeAllButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    backgroundColor: "rgba(255, 107, 139, 0.1)",
  },
  seeAllText: {
    color: "#FF6B8B",
    fontWeight: "600",
    fontSize: 14,
    marginRight: 4,
  },
  discoverScroll: {
    paddingLeft: 20,
    paddingRight: 8,
  },
  discoverCard: {
    width: 190,
    height: 280,
    borderRadius: 20,
    overflow: "hidden",
    marginRight: 16,
    position: "relative",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  discoverImage: {
    width: "100%",
    height: "100%",
  },
  discoverGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "60%",
    justifyContent: "flex-end",
    padding: 16,
  },
  discoverInfo: {},
  discoverName: {
    color: "white",
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 8,
  },
  discoverDetails: {
    gap: 8,
  },
  discoverDetail: {
    flexDirection: "row",
    alignItems: "center",
  },
  discoverDetailText: {
    color: "white",
    fontSize: 13,
    marginLeft: 6,
    fontWeight: "500",
  },
  compatibilityBadge: {
    position: "absolute",
    top: 16,
    right: 16,
    backgroundColor: "rgba(255, 107, 139, 0.95)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  compatibilityText: {
    color: "white",
    fontSize: 12,
    fontWeight: "700",
  },
  activityContainer: {
    marginHorizontal: 20,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 16,
    padding: 4,
  },
  activityItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.05)",
  },
  activityAvatarContainer: {
    position: "relative",
  },
  activityAvatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 2,
    borderColor: "white",
  },
  activityIndicator: {
    position: "absolute",
    bottom: -2,
    right: -2,
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "white",
  },
  activityContent: {
    flex: 1,
    marginLeft: 16,
  },
  activityText: {
    fontSize: 15,
    marginBottom: 4,
    fontWeight: "500",
  },
  activityName: {
    fontWeight: "700",
  },
  activityTime: {
    fontSize: 13,
    opacity: 0.6,
    fontWeight: "500",
  },
  activityAction: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.05)",
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    backgroundColor: "#FFEBEE",
    borderWidth: 1,
    borderColor: "#FFCDD2",
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 20,
    marginTop: 20,
  },
  errorText: {
    color: "#C62828",
    fontSize: 14,
    textAlign: "center",
    fontWeight: "500",
  },
  loadingContainer: {
    padding: 40,
    alignItems: "center",
  },
  loadingText: {
    fontSize: 16,
    color: "#666",
    fontWeight: "500",
  },
  emptyContainer: {
    padding: 40,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#666",
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
    fontWeight: "500",
  },
  retryButton: {
    marginTop: 12,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#FF6B8B",
    borderRadius: 12,
    alignSelf: "center",
  },
  retryText: {
    color: "white",
    fontSize: 14,
    fontWeight: "700",
  },
  discoverActions: {
    position: "absolute",
    bottom: 16,
    right: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  discoverActionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  discoverActionButtonLiked: {
    backgroundColor: "rgba(255, 59, 92, 0.1)",
    borderWidth: 2,
    borderColor: "#FF3B5C",
  },
  likedBadge: {
    position: "absolute",
    top: 16,
    left: 16,
    backgroundColor: "#FF3B5C",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  likedBadgeText: {
    color: "white",
    fontSize: 10,
    fontWeight: "700",
  },
});
