"use client"

import { StyleSheet, View, TextInput, FlatList, Pressable, ActivityIndicator } from "react-native"
import { useState, useEffect } from "react"
import { Image } from "expo-image"
import { Ionicons, MaterialIcons } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import { useColorScheme } from "react-native"
import { BlurView } from "expo-blur"
import { ThemedText } from "@/components/ThemedText"

// Message templates to generate random conversations
const messageTemplates = [
    "Hey there! How's your day going?",
    "I saw your profile and thought we might have a lot in common.",
    "Would you like to grab coffee sometime?",
    "What are your plans for the weekend?",
    "I love your photos! Where was that beach picture taken?",
    "Have you seen that new movie everyone's talking about?",
    "I'm a big fan of hiking too! What's your favorite trail?",
    "Just wanted to say hi and see how you're doing!",
    "That restaurant you mentioned sounds amazing!",
    "Thanks for the recommendation, I'll check it out!",
    "I'd love to hear more about your travels!",
    "What kind of music are you into?",
    "Do you have any pets?",
    "I'm planning a trip next month. Any suggestions?",
    "Your profile mentioned you like cooking. What's your specialty?",
]

// Response templates
const responseTemplates = [
    "I'm doing great, thanks for asking! How about you?",
    "I'd love to meet up for coffee! When are you free?",
    "That sounds wonderful! I'm free this weekend.",
    "I took that photo in Bali last summer. Have you been?",
    "Yes, I've seen it! What did you think of the ending?",
    "My favorite trail is definitely Sunset Ridge. The views are amazing!",
    "I'm doing well! Just busy with work this week.",
    "I'd recommend trying the pasta there, it's incredible!",
    "I'm really into indie rock and jazz. What about you?",
    "Yes, I have a golden retriever named Max. He's the best!",
    "You should definitely visit Portugal if you haven't been!",
    "I make a mean lasagna! What do you like to cook?",
]

export default function ChatList() {
    const colorScheme = useColorScheme()
    const isDark = colorScheme === "dark"
    const [searchQuery, setSearchQuery] = useState("")
    const [chatConversations, setChatConversations] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetchRandomUsers()
    }, [])

    const fetchRandomUsers = async () => {
        setIsLoading(true)
        setError(null)

        try {
            // Fetch 10 random users from the Random User API
            const response = await fetch('https://randomuser.me/api/?results=10')
            const data = await response.json()

            if (!response.ok) {
                throw new Error('Failed to fetch users')
            }

            // Transform the random users into chat conversations
            const conversations = data.results.map((user: { login: { uuid: any }; name: { first: any; last: any }; dob: { age: any }; location: { city: any }; picture: { large: any } }, index: any) => {
                // Generate a random number of messages (1-3)
                const messageCount = Math.floor(Math.random() * 3) + 1

                // Generate random messages
                const messages = []
                for (let i = 0; i < messageCount; i++) {
                    const isFromMe = Math.random() > 0.5
                    const messageText = isFromMe
                        ? messageTemplates[Math.floor(Math.random() * messageTemplates.length)]
                        : responseTemplates[Math.floor(Math.random() * responseTemplates.length)]

                    // Random timestamp between now and 3 days ago
                    const hoursAgo = Math.floor(Math.random() * 72)
                    const timestamp = new Date(Date.now() - hoursAgo * 3600000).toISOString()

                    messages.push({
                        text: messageText,
                        timestamp,
                        read: Math.random() > 0.3, // 70% chance of being read
                        sender: isFromMe ? 'me' : 'them'
                    })
                }

                // Sort messages by timestamp (newest first)
                messages.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))

                // Random unread count (0-3)
                const unreadCount = messages[0].sender === 'them' && !messages[0].read
                    ? Math.floor(Math.random() * 3) + 1
                    : 0

                return {
                    id: user.login.uuid,
                    user: {
                        id: user.login.uuid,
                        name: `${user.name.first} ${user.name.last}`,
                        age: user.dob.age,
                        location: `${user.location.city}`,
                        avatar: user.picture.large,
                        online: Math.random() > 0.5, // 50% chance of being online
                        lastActive: Math.random() > 0.5 ? "Just now" : `${Math.floor(Math.random() * 5) + 1} hours ago`,
                    },
                    lastMessage: messages[0],
                    unreadCount,
                }
            })

            setChatConversations(conversations)
        } catch (err) {
            console.error('Error fetching random users:', err)
            setError("Failed to load conversations. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    // Filter chats based on search query
    const filteredChats = searchQuery
        ? chatConversations.filter((chat) => chat.user.name.toLowerCase().includes(searchQuery.toLowerCase()))
        : chatConversations

    // Format timestamp
    const formatTime = (timestamp) => {
        const date = new Date(timestamp)
        const now = new Date()
        const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24))

        if (diffDays === 0) {
            return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        } else if (diffDays === 1) {
            return "Yesterday"
        } else if (diffDays < 7) {
            return date.toLocaleDateString([], { weekday: "short" })
        } else {
            return date.toLocaleDateString([], { month: "short", day: "numeric" })
        }
    }

    // Render a chat preview item
    const renderChatItem = ({ item }) => {
        const { user, lastMessage, unreadCount } = item
        const isUnread = unreadCount > 0
        const isLastMessageFromMe = lastMessage.sender === "me"

        return (
            <Pressable
                style={[styles.chatItem, isDark ? styles.chatItemDark : null]}
                android_ripple={{ color: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)" }}
            >
                <View style={styles.avatarContainer}>
                    <Image source={{ uri: user.avatar }} style={styles.avatar} contentFit="cover" />
                    {user.online && <View style={styles.onlineIndicator} />}
                </View>

                <View style={styles.chatInfo}>
                    <View style={styles.chatHeader}>
                        <ThemedText style={styles.userName}>
                            {user.name}, {user.age}
                        </ThemedText>
                        <ThemedText style={styles.timestamp}>{formatTime(lastMessage.timestamp)}</ThemedText>
                    </View>

                    <View style={styles.lastMessageContainer}>
                        <View style={styles.lastMessageContent}>
                            {isLastMessageFromMe && <ThemedText style={styles.sentByMe}>You: </ThemedText>}
                            <ThemedText style={[styles.lastMessageText, isUnread ? styles.unreadMessage : null]} numberOfLines={1}>
                                {lastMessage.text}
                            </ThemedText>
                        </View>

                        {isUnread && (
                            <View style={styles.unreadBadge}>
                                <ThemedText style={styles.unreadCount}>{unreadCount}</ThemedText>
                            </View>
                        )}

                        {!isUnread && !isLastMessageFromMe && lastMessage.read && (
                            <Ionicons name="checkmark-done" size={16} color="#5DADE2" />
                        )}
                    </View>
                </View>
            </Pressable>
        )
    }

    // Render loading state
    const renderLoading = () => (
        <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#FF6B8B" />
            <ThemedText style={styles.loadingText}>Loading conversations...</ThemedText>
        </View>
    )

    // Render error state
    const renderError = () => (
        <View style={styles.errorContainer}>
            <Ionicons name="alert-circle-outline" size={60} color={isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)"} />
            <ThemedText style={styles.errorText}>{error}</ThemedText>
            <Pressable style={styles.retryButton} onPress={fetchRandomUsers}>
                <ThemedText style={styles.retryButtonText}>Retry</ThemedText>
            </Pressable>
        </View>
    )

    return (
        <View style={[styles.container, isDark ? styles.containerDark : null]}>
            {/* Header */}
            <LinearGradient colors={["#FF6B8B", "#FF8E8E"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.header}>
                <View style={styles.headerContent}>
                    <ThemedText style={styles.headerTitle}>Messages</ThemedText>

                    <View style={styles.headerActions}>
                        <Pressable style={styles.headerButton} onPress={fetchRandomUsers}>
                            <Ionicons name="refresh" size={22} color="white" />
                        </Pressable>
                        <Pressable style={styles.headerButton}>
                            <Ionicons name="filter" size={22} color="white" />
                        </Pressable>
                        <Pressable style={styles.headerButton}>
                            <MaterialIcons name="more-vert" size={22} color="white" />
                        </Pressable>
                    </View>
                </View>
            </LinearGradient>

            {/* Search Bar */}
            <BlurView intensity={90} tint={isDark ? "dark" : "light"} style={styles.searchContainer}>
                <View style={[styles.searchBar, { backgroundColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)" }]}>
                    <Ionicons name="search" size={20} color={isDark ? "#ccc" : "#666"} style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search conversations..."
                        placeholderTextColor={isDark ? "#ccc" : "#666"}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                    {searchQuery.length > 0 && (
                        <Pressable onPress={() => setSearchQuery("")}>
                            <Ionicons name="close-circle" size={20} color={isDark ? "#ccc" : "#666"} />
                        </Pressable>
                    )}
                </View>
            </BlurView>

            {/* Content based on state */}
            {isLoading ? (
                renderLoading()
            ) : error ? (
                renderError()
            ) : filteredChats.length > 0 ? (
                <FlatList
                    data={filteredChats}
                    renderItem={renderChatItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.chatList}
                    showsVerticalScrollIndicator={false}
                    refreshing={isLoading}
                    onRefresh={fetchRandomUsers}
                />
            ) : (
                <View style={styles.emptyContainer}>
                    <Ionicons
                        name="chatbubble-ellipses-outline"
                        size={60}
                        color={isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)"}
                    />
                    <ThemedText style={styles.emptyText}>
                        {searchQuery ? "No conversations found" : "No conversations yet"}
                    </ThemedText>
                    {searchQuery && <ThemedText style={styles.emptySubtext}>Try a different search term</ThemedText>}
                </View>
            )}

            {/* New Message Button */}
            <Pressable style={styles.newMessageButton}>
                <LinearGradient
                    colors={["#FF6B8B", "#FF8E8E"]}
                    style={styles.newMessageButtonGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                >
                    <Ionicons name="create" size={24} color="white" />
                </LinearGradient>
            </Pressable>
        </View>
    )
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
    headerTitle: {
        color: "white",
        fontSize: 24,
        fontWeight: "bold",
    },
    headerActions: {
        flexDirection: "row",
    },
    headerButton: {
        marginLeft: 16,
        padding: 4,
    },
    searchContainer: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "rgba(0,0,0,0.05)",
    },
    searchBar: {
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: "#333",
    },
    chatList: {
        paddingVertical: 8,
    },
    chatItem: {
        flexDirection: "row",
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: "rgba(0,0,0,0.05)",
    },
    chatItemDark: {
        borderBottomColor: "rgba(255,255,255,0.05)",
    },
    avatarContainer: {
        position: "relative",
        marginRight: 16,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    onlineIndicator: {
        position: "absolute",
        bottom: 2,
        right: 2,
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: "#4CD964",
        borderWidth: 2,
        borderColor: "white",
    },
    chatInfo: {
        flex: 1,
        justifyContent: "center",
    },
    chatHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 4,
    },
    userName: {
        fontSize: 16,
        fontWeight: "bold",
    },
    timestamp: {
        fontSize: 12,
        color: "#999",
    },
    lastMessageContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    lastMessageContent: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
    },
    sentByMe: {
        fontSize: 14,
        color: "#999",
    },
    lastMessageText: {
        fontSize: 14,
        color: "#666",
        flex: 1,
    },
    unreadMessage: {
        fontWeight: "bold",
        color: "#333",
    },
    unreadBadge: {
        backgroundColor: "#FF6B8B",
        borderRadius: 10,
        minWidth: 20,
        height: 20,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 8,
    },
    unreadCount: {
        color: "white",
        fontSize: 12,
        fontWeight: "bold",
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    loadingText: {
        fontSize: 16,
        marginTop: 16,
    },
    errorContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    errorText: {
        fontSize: 16,
        marginTop: 16,
        textAlign: "center",
    },
    retryButton: {
        marginTop: 16,
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: "#FF6B8B",
        borderRadius: 20,
    },
    retryButtonText: {
        color: "white",
        fontWeight: "bold",
    },
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    emptyText: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 16,
    },
    emptySubtext: {
        fontSize: 14,
        color: "#999",
        marginTop: 8,
    },
    newMessageButton: {
        position: "absolute",
        bottom: 24,
        right: 24,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    newMessageButtonGradient: {
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: "center",
        alignItems: "center",
    },
})
