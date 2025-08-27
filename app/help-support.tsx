"use client";

import { ThemedText } from "@/components/ThemedText";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  useColorScheme,
  View,
} from "react-native";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "How does the matching algorithm work?",
    answer: "Our matching algorithm considers your preferences, location, age, religion, and other factors to find compatible matches. The more information you provide, the better your matches will be."
  },
  {
    question: "How can I report inappropriate behavior?",
    answer: "You can report any inappropriate behavior by tapping the three dots on a user's profile and selecting 'Report'. We take all reports seriously and will investigate promptly."
  },
  {
    question: "Can I delete my account?",
    answer: "Yes, you can delete your account at any time. Go to Settings > Privacy & Security > Delete Account. Please note that this action cannot be undone."
  },
  {
    question: "How do I change my profile information?",
    answer: "You can edit your profile by going to Settings > Edit Profile. You can update your name, age, location, bio, and other information."
  },
  {
    question: "Why am I not getting matches?",
    answer: "Make sure your profile is complete with photos and information. Also, try adjusting your preferences to broaden your search criteria."
  },
  {
    question: "Is my information secure?",
    answer: "Yes, we take your privacy seriously. All your personal information is encrypted and we never share your data with third parties without your consent."
  }
];

export default function HelpSupportScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const router = useRouter();
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  const handleContactEmail = () => {
    Linking.openURL("mailto:support@matrimonialapp.com");
  };

  const handleContactPhone = () => {
    Linking.openURL("tel:+1234567890");
  };

  const handleWebsite = () => {
    Linking.openURL("https://matrimonialapp.com");
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
          <ThemedText style={styles.headerTitle}>Help & Support</ThemedText>
          <View style={{ width: 24 }} />
        </View>
      </LinearGradient>

      <ScrollView style={styles.content}>
        {/* Contact Section */}
        <View style={[styles.section, isDark && styles.sectionDark]}>
          <ThemedText style={[styles.sectionTitle, isDark && styles.sectionTitleDark]}>
            Contact Us
          </ThemedText>

          <Pressable style={[styles.contactItem, isDark && styles.contactItemDark]} onPress={handleContactEmail}>
            <View style={styles.contactInfo}>
              <Ionicons name="mail" size={24} color={isDark ? "#ccc" : "#666"} />
              <View style={styles.contactTextContainer}>
                <ThemedText style={[styles.contactText, isDark && styles.contactTextDark]}>
                  Email Support
                </ThemedText>
                <ThemedText style={[styles.contactSubtext, isDark && styles.contactSubtextDark]}>
                  support@matrimonialapp.com
                </ThemedText>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color={isDark ? "#666" : "#ccc"} />
          </Pressable>

          <Pressable style={[styles.contactItem, isDark && styles.contactItemDark]} onPress={handleContactPhone}>
            <View style={styles.contactInfo}>
              <Ionicons name="call" size={24} color={isDark ? "#ccc" : "#666"} />
              <View style={styles.contactTextContainer}>
                <ThemedText style={[styles.contactText, isDark && styles.contactTextDark]}>
                  Phone Support
                </ThemedText>
                <ThemedText style={[styles.contactSubtext, isDark && styles.contactSubtextDark]}>
                  +1 (234) 567-8900
                </ThemedText>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color={isDark ? "#666" : "#ccc"} />
          </Pressable>

          <Pressable style={[styles.contactItem, isDark && styles.contactItemDark]} onPress={handleWebsite}>
            <View style={styles.contactInfo}>
              <Ionicons name="globe" size={24} color={isDark ? "#ccc" : "#666"} />
              <View style={styles.contactTextContainer}>
                <ThemedText style={[styles.contactText, isDark && styles.contactTextDark]}>
                  Visit Website
                </ThemedText>
                <ThemedText style={[styles.contactSubtext, isDark && styles.contactSubtextDark]}>
                  matrimonialapp.com
                </ThemedText>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color={isDark ? "#666" : "#ccc"} />
          </Pressable>
        </View>

        {/* FAQ Section */}
        <View style={[styles.section, isDark && styles.sectionDark]}>
          <ThemedText style={[styles.sectionTitle, isDark && styles.sectionTitleDark]}>
            Frequently Asked Questions
          </ThemedText>

          {faqData.map((faq, index) => (
            <Pressable
              key={index}
              style={[styles.faqItem, isDark && styles.faqItemDark]}
              onPress={() => toggleFAQ(index)}
            >
              <View style={styles.faqHeader}>
                <ThemedText style={[styles.faqQuestion, isDark && styles.faqQuestionDark]}>
                  {faq.question}
                </ThemedText>
                <Ionicons
                  name={expandedFAQ === index ? "chevron-up" : "chevron-down"}
                  size={20}
                  color={isDark ? "#666" : "#ccc"}
                />
              </View>
              {expandedFAQ === index && (
                <ThemedText style={[styles.faqAnswer, isDark && styles.faqAnswerDark]}>
                  {faq.answer}
                </ThemedText>
              )}
            </Pressable>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={[styles.section, isDark && styles.sectionDark]}>
          <ThemedText style={[styles.sectionTitle, isDark && styles.sectionTitleDark]}>
            Quick Actions
          </ThemedText>

          <Pressable style={[styles.actionItem, isDark && styles.actionItemDark]}>
            <View style={styles.actionInfo}>
              <Ionicons name="document-text" size={24} color={isDark ? "#ccc" : "#666"} />
              <View style={styles.actionTextContainer}>
                <ThemedText style={[styles.actionText, isDark && styles.actionTextDark]}>
                  User Guide
                </ThemedText>
                <ThemedText style={[styles.actionSubtext, isDark && styles.actionSubtextDark]}>
                  Learn how to use the app effectively
                </ThemedText>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color={isDark ? "#666" : "#ccc"} />
          </Pressable>

          <Pressable style={[styles.actionItem, isDark && styles.actionItemDark]}>
            <View style={styles.actionInfo}>
              <Ionicons name="shield-checkmark" size={24} color={isDark ? "#ccc" : "#666"} />
              <View style={styles.actionTextContainer}>
                <ThemedText style={[styles.actionText, isDark && styles.actionTextDark]}>
                  Safety Tips
                </ThemedText>
                <ThemedText style={[styles.actionSubtext, isDark && styles.actionSubtextDark]}>
                  Stay safe while using the app
                </ThemedText>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color={isDark ? "#666" : "#ccc"} />
          </Pressable>

          <Pressable style={[styles.actionItem, isDark && styles.actionItemDark]}>
            <View style={styles.actionInfo}>
              <Ionicons name="bug" size={24} color={isDark ? "#ccc" : "#666"} />
              <View style={styles.actionTextContainer}>
                <ThemedText style={[styles.actionText, isDark && styles.actionTextDark]}>
                  Report a Bug
                </ThemedText>
                <ThemedText style={[styles.actionSubtext, isDark && styles.actionSubtextDark]}>
                  Help us improve the app
                </ThemedText>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color={isDark ? "#666" : "#ccc"} />
          </Pressable>
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
  content: {
    flex: 1,
  },
  section: {
    marginTop: 20,
    backgroundColor: "white",
    marginHorizontal: 16,
    borderRadius: 12,
    overflow: "hidden",
  },
  sectionDark: {
    backgroundColor: "#1e1e1e",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    padding: 16,
    paddingBottom: 8,
  },
  sectionTitleDark: {
    color: "#fff",
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  contactItemDark: {
    borderBottomColor: "#333",
  },
  contactInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  contactTextContainer: {
    marginLeft: 12,
    flex: 1,
  },
  contactText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  contactTextDark: {
    color: "#fff",
  },
  contactSubtext: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  contactSubtextDark: {
    color: "#ccc",
  },
  faqItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  faqItemDark: {
    borderBottomColor: "#333",
  },
  faqHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  faqQuestion: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
    flex: 1,
    marginRight: 12,
  },
  faqQuestionDark: {
    color: "#fff",
  },
  faqAnswer: {
    fontSize: 14,
    color: "#666",
    marginTop: 12,
    lineHeight: 20,
  },
  faqAnswerDark: {
    color: "#ccc",
  },
  actionItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  actionItemDark: {
    borderBottomColor: "#333",
  },
  actionInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  actionTextContainer: {
    marginLeft: 12,
    flex: 1,
  },
  actionText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  actionTextDark: {
    color: "#fff",
  },
  actionSubtext: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  actionSubtextDark: {
    color: "#ccc",
  },
});
