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
    Switch,
    Alert,
    Share,
} from "react-native"
import { Image } from "expo-image"
import { Ionicons } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"

interface SettingItem {
    id: string
    title: string
    subtitle?: string
    icon: string
    type: "navigation" | "toggle" | "action"
    value?: boolean
    onPress?: () => void
    onToggle?: (value: boolean) => void
    color?: string
    showBadge?: boolean
}

export default function SettingsScreen() {
    const [notificationsEnabled, setNotificationsEnabled] = useState(true)
    const [profileVisibility, setProfileVisibility] = useState(true)
    const [autoRenewal, setAutoRenewal] = useState(false)
    const [darkMode, setDarkMode] = useState(false)

    const userProfile = {
        name: "Rajesh Kumar",
        age: 28,
        location: "Mumbai, Maharashtra",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
        membershipType: "Premium",
        profileCompletion: 85,
    }

    const handleShare = async () => {
        try {
            await Share.share({
                message: "Join me on this amazing matrimonial app to find your perfect match!",
                url: "https://matrimonialapp.com",
            })
        } catch (error) {
            console.log("Error sharing:", error)
        }
    }

    const handleLogout = () => {
        Alert.alert("Logout", "Are you sure you want to logout?", [
            { text: "Cancel", style: "cancel" },
            { text: "Logout", style: "destructive", onPress: () => console.log("Logged out") },
        ])
    }

    const handleDeleteAccount = () => {
        Alert.alert("Delete Account", "This action cannot be undone. All your data will be permanently deleted.", [
            { text: "Cancel", style: "cancel" },
            { text: "Delete", style: "destructive", onPress: () => console.log("Account deleted") },
        ])
    }

    const settingSections = [
        {
            title: "Account",
            items: [
                {
                    id: "edit-profile",
                    title: "Edit Profile",
                    subtitle: "Update your personal information",
                    icon: "person-outline",
                    type: "navigation" as const,
                    onPress: () => console.log("Edit Profile"),
                },
                {
                    id: "photos",
                    title: "Manage Photos",
                    subtitle: "Add or remove profile photos",
                    icon: "camera-outline",
                    type: "navigation" as const,
                    onPress: () => console.log("Manage Photos"),
                },
                {
                    id: "preferences",
                    title: "Partner Preferences",
                    subtitle: "Set your ideal match criteria",
                    icon: "heart-outline",
                    type: "navigation" as const,
                    onPress: () => console.log("Partner Preferences"),
                },
                {
                    id: "verification",
                    title: "Profile Verification",
                    subtitle: "Verify your profile for better matches",
                    icon: "shield-checkmark-outline",
                    type: "navigation" as const,
                    onPress: () => console.log("Profile Verification"),
                    showBadge: true,
                },
            ],
        },
        {
            title: "Privacy & Security",
            items: [
                {
                    id: "profile-visibility",
                    title: "Profile Visibility",
                    subtitle: "Make your profile visible to others",
                    icon: "eye-outline",
                    type: "toggle" as const,
                    value: profileVisibility,
                    onToggle: setProfileVisibility,
                },
                {
                    id: "block-list",
                    title: "Blocked Users",
                    subtitle: "Manage blocked profiles",
                    icon: "ban-outline",
                    type: "navigation" as const,
                    onPress: () => console.log("Blocked Users"),
                },
                {
                    id: "privacy-settings",
                    title: "Privacy Settings",
                    subtitle: "Control who can contact you",
                    icon: "lock-closed-outline",
                    type: "navigation" as const,
                    onPress: () => console.log("Privacy Settings"),
                },
            ],
        },
        {
            title: "Notifications",
            items: [
                {
                    id: "push-notifications",
                    title: "Push Notifications",
                    subtitle: "Receive alerts for new activities",
                    icon: "notifications-outline",
                    type: "toggle" as const,
                    value: notificationsEnabled,
                    onToggle: setNotificationsEnabled,
                },
                {
                    id: "email-notifications",
                    title: "Email Notifications",
                    subtitle: "Get updates via email",
                    icon: "mail-outline",
                    type: "navigation" as const,
                    onPress: () => console.log("Email Notifications"),
                },
                {
                    id: "notification-preferences",
                    title: "Notification Preferences",
                    subtitle: "Customize what notifications you receive",
                    icon: "settings-outline",
                    type: "navigation" as const,
                    onPress: () => console.log("Notification Preferences"),
                },
            ],
        },
        {
            title: "Subscription",
            items: [
                {
                    id: "membership",
                    title: "Membership Plan",
                    subtitle: "Premium - Expires Dec 2024",
                    icon: "diamond-outline",
                    type: "navigation" as const,
                    onPress: () => console.log("Membership Plan"),
                    color: "#F39C12",
                },
                {
                    id: "auto-renewal",
                    title: "Auto Renewal",
                    subtitle: "Automatically renew subscription",
                    icon: "refresh-outline",
                    type: "toggle" as const,
                    value: autoRenewal,
                    onToggle: setAutoRenewal,
                },
                {
                    id: "billing",
                    title: "Billing History",
                    subtitle: "View payment history",
                    icon: "receipt-outline",
                    type: "navigation" as const,
                    onPress: () => console.log("Billing History"),
                },
            ],
        },
        {
            title: "App Settings",
            items: [
                {
                    id: "language",
                    title: "Language",
                    subtitle: "English",
                    icon: "language-outline",
                    type: "navigation" as const,
                    onPress: () => console.log("Language"),
                },
                {
                    id: "dark-mode",
                    title: "Dark Mode",
                    subtitle: "Switch to dark theme",
                    icon: "moon-outline",
                    type: "toggle" as const,
                    value: darkMode,
                    onToggle: setDarkMode,
                },
                {
                    id: "data-usage",
                    title: "Data Usage",
                    subtitle: "Manage app data consumption",
                    icon: "cellular-outline",
                    type: "navigation" as const,
                    onPress: () => console.log("Data Usage"),
                },
            ],
        },
        {
            title: "Support & Legal",
            items: [
                {
                    id: "help",
                    title: "Help & Support",
                    subtitle: "Get help with your account",
                    icon: "help-circle-outline",
                    type: "navigation" as const,
                    onPress: () => console.log("Help & Support"),
                },
                {
                    id: "feedback",
                    title: "Send Feedback",
                    subtitle: "Help us improve the app",
                    icon: "chatbubble-outline",
                    type: "navigation" as const,
                    onPress: () => console.log("Send Feedback"),
                },
                {
                    id: "share",
                    title: "Share App",
                    subtitle: "Invite friends to join",
                    icon: "share-outline",
                    type: "action" as const,
                    onPress: handleShare,
                },
                {
                    id: "terms",
                    title: "Terms & Conditions",
                    subtitle: "Read our terms of service",
                    icon: "document-text-outline",
                    type: "navigation" as const,
                    onPress: () => console.log("Terms & Conditions"),
                },
                {
                    id: "privacy-policy",
                    title: "Privacy Policy",
                    subtitle: "How we protect your data",
                    icon: "shield-outline",
                    type: "navigation" as const,
                    onPress: () => console.log("Privacy Policy"),
                },
            ],
        },
        {
            title: "Account Actions",
            items: [
                {
                    id: "logout",
                    title: "Logout",
                    subtitle: "Sign out of your account",
                    icon: "log-out-outline",
                    type: "action" as const,
                    onPress: handleLogout,
                    color: "#E74C3C",
                },
                {
                    id: "delete-account",
                    title: "Delete Account",
                    subtitle: "Permanently delete your account",
                    icon: "trash-outline",
                    type: "action" as const,
                    onPress: handleDeleteAccount,
                    color: "#E74C3C",
                },
            ],
        },
    ]

    const renderSettingItem = (item: SettingItem) => (
        <TouchableOpacity
            key={item.id}
            style={styles.settingItem}
            onPress={item.onPress}
            activeOpacity={0.7}
            disabled={item.type === "toggle"}
        >
            <View style={styles.settingItemLeft}>
                <View style={[styles.settingIcon, { backgroundColor: item.color || "#E91E63" }]}>
                    <Ionicons name={item.icon as any} size={20} color="white" />
                </View>
                <View style={styles.settingText}>
                    <Text style={styles.settingTitle}>{item.title}</Text>
                    {item.subtitle && <Text style={styles.settingSubtitle}>{item.subtitle}</Text>}
                </View>
            </View>

            <View style={styles.settingItemRight}>
                {item.showBadge && <View style={styles.newBadge} />}
                {item.type === "toggle" && (
                    <Switch
                        value={item.value}
                        onValueChange={item.onToggle}
                        trackColor={{ false: "#E5E5E5", true: "#E91E63" }}
                        thumbColor={item.value ? "#FFFFFF" : "#FFFFFF"}
                    />
                )}
                {item.type === "navigation" && <Ionicons name="chevron-forward" size={20} color="#BDC3C7" />}
            </View>
        </TouchableOpacity>
    )

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFF5F5" />

            {/* Header */}
            <LinearGradient colors={["#FFF5F5", "#FFE5E5"]} style={styles.header}>
                <View style={styles.headerContent}>
                    <Text style={styles.headerTitle}>Settings</Text>
                    <Text style={styles.headerSubtitle}>Manage your account and preferences</Text>
                </View>
            </LinearGradient>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {/* Profile Card */}
                <View style={styles.profileCard}>
                    <LinearGradient colors={["#E91E63", "#AD1457"]} style={styles.profileGradient}>
                        <View style={styles.profileContent}>
                            <Image source={{ uri: userProfile.avatar }} style={styles.profileAvatar} contentFit="cover" />
                            <View style={styles.profileInfo}>
                                <Text style={styles.profileName}>{userProfile.name}</Text>
                                <Text style={styles.profileDetails}>
                                    {userProfile.age} years • {userProfile.location}
                                </Text>
                                <View style={styles.membershipBadge}>
                                    <Ionicons name="diamond" size={12} color="#F39C12" />
                                    <Text style={styles.membershipText}>{userProfile.membershipType} Member</Text>
                                </View>
                            </View>
                            <TouchableOpacity style={styles.editProfileButton}>
                                <Ionicons name="pencil" size={16} color="#E91E63" />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.profileCompletion}>
                            <Text style={styles.completionText}>Profile Completion: {userProfile.profileCompletion}%</Text>
                            <View style={styles.progressBar}>
                                <View style={[styles.progressFill, { width: `${userProfile.profileCompletion}%` }]} />
                            </View>
                        </View>
                    </LinearGradient>
                </View>

                {/* Settings Sections */}
                {settingSections.map((section, sectionIndex) => (
                    <View key={sectionIndex} style={styles.settingSection}>
                        <Text style={styles.sectionTitle}>{section.title}</Text>
                        <View style={styles.settingsList}>
                            {section.items.map((item, itemIndex) => (
                                <View key={item.id}>
                                    {renderSettingItem(item)}
                                    {itemIndex < section.items.length - 1 && <View style={styles.separator} />}
                                </View>
                            ))}
                        </View>
                    </View>
                ))}

                {/* App Version */}
                <View style={styles.appVersion}>
                    <Text style={styles.versionText}>Version 2.1.0</Text>
                    <Text style={styles.versionSubtext}>© 2024 Matrimonial App</Text>
                </View>
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
        alignItems: "center",
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
    scrollView: {
        flex: 1,
    },
    profileCard: {
        margin: 20,
        borderRadius: 20,
        overflow: "hidden",
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    profileGradient: {
        padding: 20,
    },
    profileContent: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
    },
    profileAvatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 3,
        borderColor: "white",
    },
    profileInfo: {
        flex: 1,
        marginLeft: 15,
    },
    profileName: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
        marginBottom: 4,
    },
    profileDetails: {
        fontSize: 14,
        color: "rgba(255, 255, 255, 0.8)",
        marginBottom: 6,
    },
    membershipBadge: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        alignSelf: "flex-start",
    },
    membershipText: {
        fontSize: 12,
        color: "white",
        marginLeft: 4,
        fontWeight: "600",
    },
    editProfileButton: {
        backgroundColor: "white",
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: "center",
        alignItems: "center",
    },
    profileCompletion: {
        marginTop: 10,
    },
    completionText: {
        fontSize: 12,
        color: "rgba(255, 255, 255, 0.8)",
        marginBottom: 6,
    },
    progressBar: {
        height: 6,
        backgroundColor: "rgba(255, 255, 255, 0.3)",
        borderRadius: 3,
        overflow: "hidden",
    },
    progressFill: {
        height: "100%",
        backgroundColor: "white",
        borderRadius: 3,
    },
    settingSection: {
        marginHorizontal: 20,
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#2C3E50",
        marginBottom: 10,
        marginLeft: 5,
    },
    settingsList: {
        backgroundColor: "white",
        borderRadius: 15,
        overflow: "hidden",
    },
    settingItem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 15,
    },
    settingItemLeft: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },
    settingIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },
    settingText: {
        flex: 1,
    },
    settingTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#2C3E50",
        marginBottom: 2,
    },
    settingSubtitle: {
        fontSize: 13,
        color: "#7F8C8D",
    },
    settingItemRight: {
        flexDirection: "row",
        alignItems: "center",
    },
    newBadge: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#FF6B6B",
        marginRight: 10,
    },
    separator: {
        height: 1,
        backgroundColor: "#F8F9FA",
        marginLeft: 67,
    },
    appVersion: {
        alignItems: "center",
        padding: 20,
        marginBottom: 20,
    },
    versionText: {
        fontSize: 14,
        color: "#7F8C8D",
        fontWeight: "600",
    },
    versionSubtext: {
        fontSize: 12,
        color: "#BDC3C7",
        marginTop: 2,
    },
})
