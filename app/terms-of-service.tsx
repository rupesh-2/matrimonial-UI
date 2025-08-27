"use client";

import { ThemedText } from "@/components/ThemedText";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  useColorScheme,
  View,
} from "react-native";

export default function TermsOfServiceScreen() {
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
          <ThemedText style={styles.headerTitle}>Terms of Service</ThemedText>
          <View style={{ width: 24 }} />
        </View>
      </LinearGradient>

      <ScrollView style={styles.content}>
        <View style={[styles.section, isDark && styles.sectionDark]}>
          <ThemedText style={[styles.title, isDark && styles.titleDark]}>
            Terms of Service
          </ThemedText>
          <ThemedText style={[styles.date, isDark && styles.dateDark]}>
            Last updated: January 2024
          </ThemedText>

          <ThemedText style={[styles.paragraph, isDark && styles.paragraphDark]}>
            Welcome to our Matrimonial App. By using our service, you agree to these terms and conditions.
          </ThemedText>

          <ThemedText style={[styles.sectionTitle, isDark && styles.sectionTitleDark]}>
            1. Acceptance of Terms
          </ThemedText>
          <ThemedText style={[styles.paragraph, isDark && styles.paragraphDark]}>
            By accessing and using this application, you accept and agree to be bound by the terms and provision of this agreement.
          </ThemedText>

          <ThemedText style={[styles.sectionTitle, isDark && styles.sectionTitleDark]}>
            2. User Eligibility
          </ThemedText>
          <ThemedText style={[styles.paragraph, isDark && styles.paragraphDark]}>
            You must be at least 18 years old to use this service. You must provide accurate and complete information when creating your account.
          </ThemedText>

          <ThemedText style={[styles.sectionTitle, isDark && styles.sectionTitleDark]}>
            3. User Conduct
          </ThemedText>
          <ThemedText style={[styles.paragraph, isDark && styles.paragraphDark]}>
            You agree not to use the service to:
          </ThemedText>
          <ThemedText style={[styles.bulletPoint, isDark && styles.bulletPointDark]}>
            • Post false, misleading, or fraudulent information
          </ThemedText>
          <ThemedText style={[styles.bulletPoint, isDark && styles.bulletPointDark]}>
            • Harass, abuse, or harm other users
          </ThemedText>
          <ThemedText style={[styles.bulletPoint, isDark && styles.bulletPointDark]}>
            • Violate any applicable laws or regulations
          </ThemedText>
          <ThemedText style={[styles.bulletPoint, isDark && styles.bulletPointDark]}>
            • Attempt to gain unauthorized access to the service
          </ThemedText>

          <ThemedText style={[styles.sectionTitle, isDark && styles.sectionTitleDark]}>
            4. Privacy and Data Protection
          </ThemedText>
          <ThemedText style={[styles.paragraph, isDark && styles.paragraphDark]}>
            Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the service.
          </ThemedText>

          <ThemedText style={[styles.sectionTitle, isDark && styles.sectionTitleDark]}>
            5. Intellectual Property
          </ThemedText>
          <ThemedText style={[styles.paragraph, isDark && styles.paragraphDark]}>
            The service and its original content, features, and functionality are owned by us and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
          </ThemedText>

          <ThemedText style={[styles.sectionTitle, isDark && styles.sectionTitleDark]}>
            6. Termination
          </ThemedText>
          <ThemedText style={[styles.paragraph, isDark && styles.paragraphDark]}>
            We may terminate or suspend your account immediately, without prior notice, for conduct that we believe violates these Terms of Service or is harmful to other users or us.
          </ThemedText>

          <ThemedText style={[styles.sectionTitle, isDark && styles.sectionTitleDark]}>
            7. Limitation of Liability
          </ThemedText>
          <ThemedText style={[styles.paragraph, isDark && styles.paragraphDark]}>
            In no event shall we be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
          </ThemedText>

          <ThemedText style={[styles.sectionTitle, isDark && styles.sectionTitleDark]}>
            8. Changes to Terms
          </ThemedText>
          <ThemedText style={[styles.paragraph, isDark && styles.paragraphDark]}>
            We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect.
          </ThemedText>

          <ThemedText style={[styles.sectionTitle, isDark && styles.sectionTitleDark]}>
            9. Contact Information
          </ThemedText>
          <ThemedText style={[styles.paragraph, isDark && styles.paragraphDark]}>
            If you have any questions about these Terms of Service, please contact us at legal@matrimonialapp.com
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
