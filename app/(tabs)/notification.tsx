"use client"

import { useState } from "react"
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    Dimensions,
    Alert,
    RefreshControl,
} from "react-native"
import { Image } from "expo-image"
import { Ionicons } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"

const { width } = Dimensions.get("window")

// Sample notification data for matrimonial app
const notificationsData = [
    {
        id: 1,
        type: "interest",
        title: "New Interest Received",
        message: "Priya Sharma has shown interest in your profile",
        time: "2 minutes ago",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
        unread: true,
        icon: "heart",
        color: "#FF6B6B",
    },
    {
        id: 2,
        type: "message",
        title: "New Message",
        message: "You have a new message from Rahul Gupta",
        time: "15 minutes ago",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
        unread: true,
        icon: "chatbubble",
        color: "#4ECDC4",
    },
    {
        id: 3,
        type: "profile_view",
        title: "Profile Viewed",
        message: "Anjali Patel viewed your profile",
        time: "1 hour ago",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
        unread: false,
        icon: "eye",
        color: "#45B7D1",
    },
    {
        id: 4,
        type: "shortlist",
        title: "Added to Shortlist",
        message: "Vikram Singh added you to their shortlist",
        time: "3 hours ago",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
        unread: false,
        icon: "star",
        color: "#F7DC6F",
    },
    {
        id: 5,
        type: "meeting",
        title: "Meeting Reminder",
        message: "You have a meeting scheduled with Neha Agarwal tomorrow at 6 PM",
        time: "5 hours ago",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
        unread: false,
        icon: "calendar",
        color: "#BB8FCE",
    },
    {
        id: 6,
        type: "premium",
        title: "Premium Feature",
        message: "Upgrade to Premium to see who viewed your profile",
        time: "1 day ago",
        avatar: null,
        unread: false,
        icon: "diamond",
        color: "#F39C12",
    },
]

const statsData = [
    { title: "New Interests", count: 12, icon: "heart", color: "#FF6B6B" },
    { title: "Messages", count: 8, icon: "chatbubble", color: "#4ECDC4" },
    { title: "Profile Views", count: 24, icon: "eye", color: "#45B7D1" },
    { title: "Shortlisted", count: 6, icon: "star", color: "#F7DC6F" },
]

export default function NotificationsScreen() {
    const [notifications, setNotifications] = useState(notificationsData)
    const [refreshing, setRefreshing] = useState(false)

    const unreadCount = notifications.filter((n) => n.unread).length

    const onRefresh = () => {
        setRefreshing(true)
        // Simulate API call
        setTimeout(() => {
            setRefreshing(false)
        }, 1000)
    }

    const markAsRead = (id: number) => {
        setNotifications((prev) => prev.map((notif) => (notif.id === id ? { ...notif, unread: false } : notif)))
    }

    const markAllAsRead = () => {
        setNotifications((prev) => prev.map((notif) => ({ ...notif, unread: false })))
    }

    const handleNotificationPress = (notification: any) => {
        markAsRead(notification.id)

        switch (notification.type) {
            case "interest":
                Alert.alert("Interest Received", `${notification.message}\n\nWould you like to respond?`, [
                    { text: "Decline", style: "destructive" },
                    { text: "Accept", style: "default" },
                    { text: "View Profile", style: "default" },
                ])
                break
            case "message":
                Alert.alert("Message", "Opening chat...")
                break
            default:
                Alert.alert("Notification", notification.message)
        }
    }

    const renderStatsCard = (stat: any, index: number) => (
        <TouchableOpacity key={index} style={styles.statsCard}>
            <LinearGradient colors={[stat.color + "20", stat.color + "10"]} style={styles.statsGradient}>
                <View style={[styles.statsIcon, { backgroundColor: stat.color }]}>
                    <Ionicons name={stat.icon as any} size={20} color="white" />
                </View>
                <Text style={styles.statsCount}>{stat.count}</Text>
                <Text style={styles.statsTitle}>{stat.title}</Text>
            </LinearGradient>
        </TouchableOpacity>
    )

    const renderNotificationItem = (notification: any) => (
        <TouchableOpacity
            key={notification.id}
            style={[styles.notificationItem, notification.unread && styles.unreadNotification]}
            onPress={() => handleNotificationPress(notification)}
            activeOpacity={0.7}
        >
            <View style={styles.notificationContent}>
                <View style={styles.avatarContainer}>
                    {notification.avatar ? (
                        <Image source={{ uri: notification.avatar }} style={styles.avatar} contentFit="cover" />
                    ) : (
                        <View style={[styles.avatarPlaceholder, { backgroundColor: notification.color }]}>
                            <Ionicons name={notification.icon as any} size={24} color="white" />
                        </View>
                    )}
                    <View style={[styles.notificationIcon, { backgroundColor: notification.color }]}>
                        <Ionicons name={notification.icon as any} size={12} color="white" />
                    </View>
                </View>

                <View style={styles.notificationText}>
                    <View style={styles.notificationHeader}>
                        <Text style={[styles.notificationTitle, notification.unread && styles.unreadTitle]}>
                            {notification.title}
                        </Text>
                        {notification.unread && <View style={styles.unreadDot} />}
                    </View>
                    <Text style={styles.notificationMessage} numberOfLines={2}>
                        {notification.message}
                    </Text>
                    <Text style={styles.notificationTime}>{notification.time}</Text>
                </View>

                {notification.type === "interest" && (
                    <View style={styles.actionButtons}>
                        <TouchableOpacity style={[styles.actionButton, styles.acceptButton]}>
                            <Ionicons name="checkmark" size={16} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.actionButton, styles.declineButton]}>
                            <Ionicons name="close" size={16} color="white" />
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </TouchableOpacity>
    )

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFF5F5" />

            {/* Header */}
            <LinearGradient colors={["#FFF5F5", "#FFE5E5"]} style={styles.header}>
                <View style={styles.headerContent}>
                    <View style={styles.headerLeft}>
                        <View style={styles.bellContainer}>
                            <Ionicons name="notifications" size={28} color="#E91E63" />
                            {unreadCount > 0 && (
                                <View style={styles.badge}>
                                    <Text style={styles.badgeText}>{unreadCount}</Text>
                                </View>
                            )}
                        </View>
                        <View>
                            <Text style={styles.headerTitle}>Notifications</Text>
                            <Text style={styles.headerSubtitle}>Stay updated with your journey</Text>
                        </View>
                    </View>
                    {unreadCount > 0 && (
                        <TouchableOpacity onPress={markAllAsRead} style={styles.markAllButton}>
                            <Text style={styles.markAllText}>Mark all read</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </LinearGradient>

            <ScrollView
                style={styles.scrollView}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                showsVerticalScrollIndicator={false}
            >
                {/* Stats Cards */}
                <View style={styles.statsContainer}>
                    <Text style={styles.sectionTitle}>Quick Overview</Text>
                    <View style={styles.statsGrid}>{statsData.map(renderStatsCard)}</View>
                </View>

                {/* Notifications List */}
                <View style={styles.notificationsContainer}>
                    <Text style={styles.sectionTitle}>Recent Activity</Text>
                    <View style={styles.notificationsList}>{notifications.map(renderNotificationItem)}</View>
                </View>

                {/* Load More Button */}
                <TouchableOpacity style={styles.loadMoreButton}>
                    <Text style={styles.loadMoreText}>Load More Notifications</Text>
                    <Ionicons name="chevron-down" size={16} color="#E91E63" />
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FAFAFA",
    },
    header: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    headerContent: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    headerLeft: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },
    bellContainer: {
        position: "relative",
        marginRight: 15,
    },
    badge: {
        position: "absolute",
        top: -5,
        right: -5,
        backgroundColor: "#E91E63",
        borderRadius: 10,
        minWidth: 20,
        height: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    badgeText: {
        color: "white",
        fontSize: 12,
        fontWeight: "bold",
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#2C3E50",
    },
    headerSubtitle: {
        fontSize: 14,
        color: "#7F8C8D",
        marginTop: 2,
    },
    markAllButton: {
        backgroundColor: "#E91E63",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 15,
    },
    markAllText: {
        color: "white",
        fontSize: 12,
        fontWeight: "600",
    },
    scrollView: {
        flex: 1,
    },
    statsContainer: {
        padding: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#2C3E50",
        marginBottom: 15,
    },
    statsGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    statsCard: {
        width: (width - 60) / 2,
        marginBottom: 15,
    },
    statsGradient: {
        padding: 15,
        borderRadius: 15,
        alignItems: "center",
    },
    statsIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 8,
    },
    statsCount: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#2C3E50",
        marginBottom: 4,
    },
    statsTitle: {
        fontSize: 12,
        color: "#7F8C8D",
        textAlign: "center",
    },
    notificationsContainer: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    notificationsList: {
        backgroundColor: "white",
        borderRadius: 15,
        overflow: "hidden",
    },
    notificationItem: {
        backgroundColor: "white",
        borderBottomWidth: 1,
        borderBottomColor: "#F8F9FA",
    },
    unreadNotification: {
        backgroundColor: "#F0F8FF",
        borderLeftWidth: 4,
        borderLeftColor: "#E91E63",
    },
    notificationContent: {
        flexDirection: "row",
        padding: 15,
        alignItems: "flex-start",
    },
    avatarContainer: {
        position: "relative",
        marginRight: 12,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    avatarPlaceholder: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
    },
    notificationIcon: {
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
    notificationText: {
        flex: 1,
        marginRight: 10,
    },
    notificationHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 4,
    },
    notificationTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#2C3E50",
        flex: 1,
    },
    unreadTitle: {
        fontWeight: "bold",
    },
    unreadDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#E91E63",
        marginLeft: 8,
    },
    notificationMessage: {
        fontSize: 14,
        color: "#7F8C8D",
        lineHeight: 20,
        marginBottom: 6,
    },
    notificationTime: {
        fontSize: 12,
        color: "#BDC3C7",
    },
    actionButtons: {
        flexDirection: "column",
        gap: 8,
    },
    actionButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
    },
    acceptButton: {
        backgroundColor: "#27AE60",
    },
    declineButton: {
        backgroundColor: "#E74C3C",
    },
    loadMoreButton: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: 15,
        marginHorizontal: 20,
        marginBottom: 20,
        backgroundColor: "white",
        borderRadius: 15,
        borderWidth: 1,
        borderColor: "#E91E63",
    },
    loadMoreText: {
        color: "#E91E63",
        fontWeight: "600",
        marginRight: 8,
    },
})
