import { Image } from "expo-image"
import { StyleSheet,useColorScheme, Pressable, ScrollView, View, Dimensions, StatusBar } from "react-native"
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import { BlurView } from "expo-blur"
import { ThemedText } from "@/components/ThemedText"

const { width } = Dimensions.get("window")

export default function HomeScreen() {
    const colorScheme = useColorScheme()
    const isDark = colorScheme === "dark"

    return (
        <View style={{ flex: 1 }}>
            <StatusBar barStyle="light-content" />

            {/* Custom Header */}
            <LinearGradient colors={["#FF6B8B", "#FF8E8E"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.header}>
                <View style={styles.headerContent}>
                    <View style={styles.logoContainer}>
                        <MaterialCommunityIcons name="heart-multiple" size={24} color="white" />
                        <ThemedText style={styles.logoText}>Bandhan</ThemedText>
                    </View>
                    <View style={styles.headerIcons}>
                        <Pressable style={styles.iconButton}>
                            <Ionicons name="notifications-outline" size={22} color="white" />
                        </Pressable>
                        <Pressable style={styles.iconButton}>
                            <Ionicons name="chatbubble-ellipses-outline" size={22} color="white" />
                            <View style={styles.badge}>
                                <ThemedText style={styles.badgeText}>3</ThemedText>
                            </View>
                        </Pressable>
                    </View>
                </View>
            </LinearGradient>

            <ScrollView
                style={styles.container}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.contentContainer}
            >
                {/* Daily Matches Card */}
                <View style={styles.dailyMatchesCard}>
                    <LinearGradient
                        colors={isDark ? ["#2A2A2A", "#1A1A1A"] : ["#FFF", "#F8F8F8"]}
                        style={[styles.dailyMatchesGradient, { borderRadius: 16 }]}
                    >
                        <View style={styles.dailyMatchesHeader}>
                            <View>
                                <ThemedText style={styles.dailyMatchesTitle}>Today&#39;s Matches</ThemedText>
                                <ThemedText style={styles.dailyMatchesSubtitle}>Based on your preferences</ThemedText>
                            </View>
                            <View style={styles.refreshButton}>
                                <Ionicons name="refresh" size={16} color={isDark ? "#fff" : "#FF6B8B"} />
                            </View>
                        </View>

                        <View style={styles.matchCarousel}>
                            {[1, 2, 3].map((item) => (
                                <Pressable key={item} style={styles.carouselItem}>
                                    <Image
                                        source={{
                                            uri: `https://randomuser.me/api/portraits/${item % 2 === 0 ? "women" : "men"}/${item + 30}.jpg`,
                                        }}
                                        style={styles.carouselImage}
                                        contentFit="cover"
                                    />
                                    <BlurView intensity={80} style={styles.carouselInfo} tint={isDark ? "dark" : "light"}>
                                        <ThemedText style={styles.carouselName}>{item % 2 === 0 ? "Sophia, 27" : "Michael, 29"}</ThemedText>
                                        <ThemedText style={styles.carouselLocation}>
                                            {item % 2 === 0 ? "New York, 5 mi" : "Boston, 8 mi"}
                                        </ThemedText>
                                    </BlurView>
                                    <View style={styles.matchActions}>
                                        <Pressable style={[styles.actionButton, styles.declineButton]}>
                                            <Ionicons name="close" size={22} color="#FF5C5C" />
                                        </Pressable>
                                        <Pressable style={[styles.actionButton, styles.likeButton]}>
                                            <Ionicons name="heart" size={22} color="#FF6B8B" />
                                        </Pressable>
                                    </View>
                                </Pressable>
                            ))}
                        </View>
                    </LinearGradient>
                </View>

                {/* Quick Actions */}
                <View style={styles.quickActions}>
                    <Pressable style={styles.actionCard}>
                        <View style={[styles.actionIcon, { backgroundColor: "#FFE8EC" }]}>
                            <Ionicons name="search" size={22} color="#FF6B8B" />
                        </View>
                        <ThemedText style={styles.actionText}>Search</ThemedText>
                    </Pressable>

                    <Pressable style={styles.actionCard}>
                        <View style={[styles.actionIcon, { backgroundColor: "#E8F4FF" }]}>
                            <Ionicons name="filter" size={22} color="#5DADE2" />
                        </View>
                        <ThemedText style={styles.actionText}>Filter</ThemedText>
                    </Pressable>

                    <Pressable style={styles.actionCard}>
                        <View style={[styles.actionIcon, { backgroundColor: "#E8FFF1" }]}>
                            <Ionicons name="heart" size={22} color="#2ECC71" />
                        </View>
                        <ThemedText style={styles.actionText}>Matches</ThemedText>
                    </Pressable>

                    <Pressable style={styles.actionCard}>
                        <View style={[styles.actionIcon, { backgroundColor: "#FFF5E8" }]}>
                            <Ionicons name="star" size={22} color="#F39C12" />
                        </View>
                        <ThemedText style={styles.actionText}>Premium</ThemedText>
                    </Pressable>
                </View>

                {/* Discover Section */}
                <View style={styles.sectionHeader}>
                    <ThemedText style={styles.sectionTitle}>Discover</ThemedText>
                    <Pressable>
                        <ThemedText style={styles.seeAllText}>See All</ThemedText>
                    </Pressable>
                </View>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.discoverScroll}>
                    {[1, 2, 3, 4, 5].map((item) => (
                        <Pressable key={item} style={styles.discoverCard}>
                            <Image
                                source={{
                                    uri: `https://randomuser.me/api/portraits/${item % 2 === 0 ? "women" : "men"}/${item + 40}.jpg`,
                                }}
                                style={styles.discoverImage}
                                contentFit="cover"
                            />
                            <LinearGradient colors={["transparent", "rgba(0,0,0,0.7)"]} style={styles.discoverGradient}>
                                <View style={styles.discoverInfo}>
                                    <ThemedText style={styles.discoverName}>{item % 2 === 0 ? "Emma, 26" : "James, 31"}</ThemedText>
                                    <View style={styles.discoverDetails}>
                                        <View style={styles.discoverDetail}>
                                            <Ionicons name="location" size={12} color="#fff" />
                                            <ThemedText style={styles.discoverDetailText}>
                                                {item % 2 === 0 ? "Chicago" : "Seattle"}
                                            </ThemedText>
                                        </View>
                                        <View style={styles.discoverDetail}>
                                            <Ionicons name="briefcase" size={12} color="#fff" />
                                            <ThemedText style={styles.discoverDetailText}>
                                                {item % 2 === 0 ? "Designer" : "Engineer"}
                                            </ThemedText>
                                        </View>
                                    </View>
                                </View>
                            </LinearGradient>
                            <View style={styles.compatibilityBadge}>
                                <ThemedText style={styles.compatibilityText}>92% Match</ThemedText>
                            </View>
                        </Pressable>
                    ))}
                </ScrollView>

                {/* Recent Activity */}
                <View style={styles.sectionHeader}>
                    <ThemedText style={styles.sectionTitle}>Recent Activity</ThemedText>
                    <Pressable>
                        <ThemedText style={styles.seeAllText}>See All</ThemedText>
                    </Pressable>
                </View>

                <View style={styles.activityContainer}>
                    {[1, 2, 3].map((item) => (
                        <View key={item} style={styles.activityItem}>
                            <Image
                                source={{
                                    uri: `https://randomuser.me/api/portraits/${item % 2 === 0 ? "men" : "women"}/${item + 50}.jpg`,
                                }}
                                style={styles.activityAvatar}
                                contentFit="cover"
                            />
                            <View style={styles.activityContent}>
                                <ThemedText style={styles.activityText}>
                                    <ThemedText style={styles.activityName}>{item % 2 === 0 ? "Robert" : "Jessica"}</ThemedText>
                                    {item === 1 ? " liked your profile" : item === 2 ? " viewed your profile" : " sent you a message"}
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

                {/* Success Story */}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        paddingBottom: 20,
    },
    header: {
        paddingTop: 50,
        paddingBottom: 15,
        paddingHorizontal: 16,
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
    logoText: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
        marginLeft: 8,
    },
    headerIcons: {
        flexDirection: "row",
    },
    iconButton: {
        marginLeft: 16,
        position: "relative",
    },
    badge: {
        position: "absolute",
        top: -5,
        right: -5,
        backgroundColor: "#FF3B5C",
        borderRadius: 10,
        width: 16,
        height: 16,
        justifyContent: "center",
        alignItems: "center",
    },
    badgeText: {
        color: "white",
        fontSize: 10,
        fontWeight: "bold",
    },
    dailyMatchesCard: {
        marginTop: 40,
        marginHorizontal: 16,
        borderRadius: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    dailyMatchesGradient: {
        borderRadius: 16,
        padding: 16,
    },
    dailyMatchesHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
    },
    dailyMatchesTitle: {
        fontSize: 18,
        fontWeight: "bold",
    },
    dailyMatchesSubtitle: {
        fontSize: 12,
        opacity: 0.7,
    },
    refreshButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: "rgba(255, 107, 139, 0.1)",
        justifyContent: "center",
        alignItems: "center",
    },
    matchCarousel: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    carouselItem: {
        width: (width - 64) / 3,
        height: 160,
        borderRadius: 12,
        overflow: "hidden",
        position: "relative",
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
        padding: 8,
    },
    carouselName: {
        color: "white",
        fontSize: 12,
        fontWeight: "bold",
    },
    carouselLocation: {
        color: "white",
        fontSize: 10,
        opacity: 0.8,
    },
    matchActions: {
        position: "absolute",
        top: 8,
        right: 8,
        flexDirection: "column",
        alignItems: "center",
    },
    actionButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 8,
    },
    declineButton: {
        backgroundColor: "rgba(255, 255, 255, 0.9)",
    },
    likeButton: {
        backgroundColor: "rgba(255, 255, 255, 0.9)",
    },
    quickActions: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 16,
        marginTop: 24,
    },
    actionCard: {
        alignItems: "center",
        width: (width - 64) / 4,
    },
    actionIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 8,
    },
    actionText: {
        fontSize: 12,
        fontWeight: "500",
    },
    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 16,
        marginTop: 24,
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
    },
    seeAllText: {
        color: "#FF6B8B",
        fontWeight: "500",
    },
    discoverScroll: {
        paddingLeft: 16,
        paddingRight: 8,
    },
    discoverCard: {
        width: 180,
        height: 250,
        borderRadius: 16,
        overflow: "hidden",
        marginRight: 12,
        position: "relative",
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
        height: "50%",
        justifyContent: "flex-end",
        padding: 12,
    },
    discoverInfo: {},
    discoverName: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 4,
    },
    discoverDetails: {
        flexDirection: "row",
        alignItems: "center",
    },
    discoverDetail: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: 12,
    },
    discoverDetailText: {
        color: "white",
        fontSize: 12,
        marginLeft: 4,
    },
    compatibilityBadge: {
        position: "absolute",
        top: 12,
        right: 12,
        backgroundColor: "rgba(255, 107, 139, 0.9)",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    compatibilityText: {
        color: "white",
        fontSize: 10,
        fontWeight: "bold",
    },
    activityContainer: {
        marginHorizontal: 16,
    },
    activityItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "rgba(0,0,0,0.05)",
    },
    activityAvatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
    },
    activityContent: {
        flex: 1,
        marginLeft: 12,
    },
    activityText: {
        fontSize: 14,
        marginBottom: 4,
    },
    activityName: {
        fontWeight: "bold",
    },
    activityTime: {
        fontSize: 12,
        opacity: 0.6,
    },
    activityAction: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: "rgba(0,0,0,0.05)",
        justifyContent: "center",
        alignItems: "center",
    },
    successStory: {
        marginHorizontal: 16,
        marginTop: 24,
        borderRadius: 16,
        overflow: "hidden",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    successGradient: {
        borderRadius: 16,
        padding: 16,
    },
    successContent: {
        flexDirection: "row",
        alignItems: "center",
    },
    successImages: {
        width: 80,
        height: 80,
        position: "relative",
    },
    successImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: "white",
    },
    successImage1: {
        position: "absolute",
        top: 0,
        left: 0,
    },
    successImage2: {
        position: "absolute",
        bottom: 0,
        right: 0,
    },
    successImageOverlay: {
        position: "absolute",
        top: 30,
        right: 30,
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: "#FF3B5C",
        justifyContent: "center",
        alignItems: "center",
    },
    successTextContent: {
        flex: 1,
        marginLeft: 16,
    },
    successTitle: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 4,
    },
    successText: {
        color: "white",
        fontSize: 12,
        marginBottom: 4,
    },
    successCouple: {
        color: "white",
        fontSize: 12,
        fontWeight: "500",
        fontStyle: "italic",
    },
})
