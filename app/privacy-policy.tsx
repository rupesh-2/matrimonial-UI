"use client";

import { ThemedText } from "@/components/ThemedText";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, useColorScheme, View } from "react-native";

export default function PrivacyPolicyScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const router = useRouter();

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
          <Ionicons
            name="arrow-back"
            size={24}
            color="white"
            style={styles.backButton}
            onPress={() => router.back()}
          />
          <ThemedText style={styles.headerTitle}>Privacy Policy</ThemedText>
          <View style={{ width: 24 }} />
        </View>
      </LinearGradient>

      <ScrollView style={styles.content}>
        <View style={[styles.section, isDark && styles.sectionDark]}>
          <ThemedText style={[styles.title, isDark && styles.titleDark]}>
            Privacy Policy
          </ThemedText>
          <ThemedText style={[styles.date, isDark && styles.dateDark]}>
            Last updated: January 2024
          </ThemedText>

          <ThemedText
            style={[styles.paragraph, isDark && styles.paragraphDark]}
          >
            We respect your privacy and are committed to protecting your
            personal data. This privacy policy explains how we collect, use, and
            safeguard your information.
          </ThemedText>

          <ThemedText
            style={[styles.sectionTitle, isDark && styles.sectionTitleDark]}
          >
            1. Information We Collect
          </ThemedText>
          <ThemedText
            style={[styles.paragraph, isDark && styles.paragraphDark]}
          >
            We collect information you provide directly to us, such as:
          </ThemedText>
          <ThemedText
            style={[styles.bulletPoint, isDark && styles.bulletPointDark]}
          >
            • Personal information (name, email, phone number)
          </ThemedText>
          <ThemedText
            style={[styles.bulletPoint, isDark && styles.bulletPointDark]}
          >
            • Profile information (age, location, occupation, education)
          </ThemedText>
          <ThemedText
            style={[styles.bulletPoint, isDark && styles.bulletPointDark]}
          >
            • Photos and media content
          </ThemedText>
          <ThemedText
            style={[styles.bulletPoint, isDark && styles.bulletPointDark]}
          >
            • Communication preferences and settings
          </ThemedText>

          <ThemedText
            style={[styles.sectionTitle, isDark && styles.sectionTitleDark]}
          >
            2. How We Use Your Information
          </ThemedText>
          <ThemedText
            style={[styles.paragraph, isDark && styles.paragraphDark]}
          >
            We use the information we collect to:
          </ThemedText>
          <ThemedText
            style={[styles.bulletPoint, isDark && styles.bulletPointDark]}
          >
            • Provide and maintain our matching service
          </ThemedText>
          <ThemedText
            style={[styles.bulletPoint, isDark && styles.bulletPointDark]}
          >
            • Process your profile and preferences
          </ThemedText>
          <ThemedText
            style={[styles.bulletPoint, isDark && styles.bulletPointDark]}
          >
            • Facilitate communication between users
          </ThemedText>
          <ThemedText
            style={[styles.bulletPoint, isDark && styles.bulletPointDark]}
          >
            • Send you notifications and updates
          </ThemedText>
          <ThemedText
            style={[styles.bulletPoint, isDark && styles.bulletPointDark]}
          >
            • Improve our services and user experience
          </ThemedText>

          <ThemedText
            style={[styles.sectionTitle, isDark && styles.sectionTitleDark]}
          >
            3. Information Sharing
          </ThemedText>
          <ThemedText
            style={[styles.paragraph, isDark && styles.paragraphDark]}
          >
            We do not sell, trade, or otherwise transfer your personal
            information to third parties without your consent, except in the
            following circumstances:
          </ThemedText>
          <ThemedText
            style={[styles.bulletPoint, isDark && styles.bulletPointDark]}
          >
            • With your explicit consent
          </ThemedText>
          <ThemedText
            style={[styles.bulletPoint, isDark && styles.bulletPointDark]}
          >
            • To comply with legal obligations
          </ThemedText>
          <ThemedText
            style={[styles.bulletPoint, isDark && styles.bulletPointDark]}
          >
            • To protect our rights and safety
          </ThemedText>
          <ThemedText
            style={[styles.bulletPoint, isDark && styles.bulletPointDark]}
          >
            • With service providers who assist in our operations
          </ThemedText>

          <ThemedText
            style={[styles.sectionTitle, isDark && styles.sectionTitleDark]}
          >
            4. Data Security
          </ThemedText>
          <ThemedText
            style={[styles.paragraph, isDark && styles.paragraphDark]}
          >
            We implement appropriate security measures to protect your personal
            information against unauthorized access, alteration, disclosure, or
            destruction. However, no method of transmission over the internet is
            100% secure.
          </ThemedText>

          <ThemedText
            style={[styles.sectionTitle, isDark && styles.sectionTitleDark]}
          >
            5. Your Rights
          </ThemedText>
          <ThemedText
            style={[styles.paragraph, isDark && styles.paragraphDark]}
          >
            You have the right to:
          </ThemedText>
          <ThemedText
            style={[styles.bulletPoint, isDark && styles.bulletPointDark]}
          >
            • Access your personal information
          </ThemedText>
          <ThemedText
            style={[styles.bulletPoint, isDark && styles.bulletPointDark]}
          >
            • Correct inaccurate information
          </ThemedText>
          <ThemedText
            style={[styles.bulletPoint, isDark && styles.bulletPointDark]}
          >
            • Request deletion of your data
          </ThemedText>
          <ThemedText
            style={[styles.bulletPoint, isDark && styles.bulletPointDark]}
          >
            • Opt out of marketing communications
          </ThemedText>
          <ThemedText
            style={[styles.bulletPoint, isDark && styles.bulletPointDark]}
          >
            • Export your data
          </ThemedText>

          <ThemedText
            style={[styles.sectionTitle, isDark && styles.sectionTitleDark]}
          >
            6. Cookies and Tracking
          </ThemedText>
          <ThemedText
            style={[styles.paragraph, isDark && styles.paragraphDark]}
          >
            We use cookies and similar technologies to enhance your experience,
            analyze usage patterns, and provide personalized content. You can
            control cookie settings through your browser preferences.
          </ThemedText>

          <ThemedText
            style={[styles.sectionTitle, isDark && styles.sectionTitleDark]}
          >
            7. Children's Privacy
          </ThemedText>
          <ThemedText
            style={[styles.paragraph, isDark && styles.paragraphDark]}
          >
            Our service is not intended for children under 18 years of age. We
            do not knowingly collect personal information from children under
            18.
          </ThemedText>

          <ThemedText
            style={[styles.sectionTitle, isDark && styles.sectionTitleDark]}
          >
            8. Changes to This Policy
          </ThemedText>
          <ThemedText
            style={[styles.paragraph, isDark && styles.paragraphDark]}
          >
            We may update this privacy policy from time to time. We will notify
            you of any changes by posting the new policy on this page and
            updating the "Last updated" date.
          </ThemedText>

          <ThemedText
            style={[styles.sectionTitle, isDark && styles.sectionTitleDark]}
          >
            9. Contact Us
          </ThemedText>
          <ThemedText
            style={[styles.paragraph, isDark && styles.paragraphDark]}
          >
            If you have any questions about this Privacy Policy, please contact
            us at privacy@matrimonialapp.com
          </ThemedText>
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
    margin: 16,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
  },
  sectionDark: {
    backgroundColor: "#1e1e1e",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  titleDark: {
    color: "#fff",
  },
  date: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
  },
  dateDark: {
    color: "#ccc",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginTop: 20,
    marginBottom: 8,
  },
  sectionTitleDark: {
    color: "#fff",
  },
  paragraph: {
    fontSize: 16,
    color: "#333",
    lineHeight: 24,
    marginBottom: 12,
  },
  paragraphDark: {
    color: "#fff",
  },
  bulletPoint: {
    fontSize: 16,
    color: "#333",
    lineHeight: 24,
    marginLeft: 16,
    marginBottom: 4,
  },
  bulletPointDark: {
    color: "#fff",
  },
});
