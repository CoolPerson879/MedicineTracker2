import React from "react";
import {
  ScrollView,
  Text,
  View,
  Linking,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

const PrivacyPolicy = ({ navigation }) => {
  return (
    <SafeAreaView>
      <ScrollView style={{ padding: 16 }}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#007AFF" />
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>

        <Text style={styles.header}>Privacy Policy</Text>
        <Text style={styles.lastUpdated}>Last updated: July 12, 2024</Text>
        <Text style={styles.paragraph}>
          This Privacy Policy describes Our policies and procedures on the
          collection, use and disclosure of Your information when You use the
          Service and tells You about Your privacy rights and how the law
          protects You.
        </Text>
        <Text style={styles.paragraph}>
          We use Your Personal data to provide and improve the Service. By using
          the Service, You agree to the collection and use of information in
          accordance with this Privacy Policy.
        </Text>

        <Text style={styles.subHeader}>Interpretation and Definitions</Text>
        <Text style={styles.subHeader}>Interpretation</Text>
        <Text style={styles.paragraph}>
          The words of which the initial letter is capitalized have meanings
          defined under the following conditions. The following definitions
          shall have the same meaning regardless of whether they appear in
          singular or in plural.
        </Text>

        <Text style={styles.subHeader}>Definitions</Text>
        <Text style={styles.paragraph}>
          For the purposes of this Privacy Policy:
        </Text>
        <View style={styles.list}>
          <Text>
            • <Text style={styles.bold}>Account</Text> means a unique account
            created for You to access our Service or parts of our Service.
          </Text>
          <Text>
            • <Text style={styles.bold}>Affiliate</Text> means an entity that
            controls, is controlled by or is under common control with a party.
          </Text>
          <Text>
            • <Text style={styles.bold}>Application</Text> refers to Clinitime,
            the software program provided by the Company.
          </Text>
          <Text>
            • <Text style={styles.bold}>Company</Text> refers to Clinitime.
          </Text>
          <Text>
            • <Text style={styles.bold}>Country</Text> refers to: Illinois,
            United States.
          </Text>
          <Text>
            • <Text style={styles.bold}>Device</Text> means any device that can
            access the Service.
          </Text>
          <Text>
            • <Text style={styles.bold}>Personal Data</Text> is any information
            that relates to an identified or identifiable individual.
          </Text>
          <Text>
            • <Text style={styles.bold}>Service</Text> refers to the
            Application.
          </Text>
          <Text>
            • <Text style={styles.bold}>Service Provider</Text> means any
            natural or legal person who processes the data on behalf of the
            Company.
          </Text>
          <Text>
            • <Text style={styles.bold}>Usage Data</Text> refers to data
            collected automatically.
          </Text>
          <Text>
            • <Text style={styles.bold}>You</Text> means the individual
            accessing or using the Service.
          </Text>
        </View>

        <Text style={styles.subHeader}>
          Collecting and Using Your Personal Data
        </Text>
        <Text style={styles.subHeader}>Types of Data Collected</Text>

        <Text style={styles.subHeader}>Personal Data</Text>
        <Text style={styles.paragraph}>
          While using Our Service, We may ask You to provide Us with certain
          personally identifiable information that can be used to contact or
          identify You. Personally identifiable information may include, but is
          not limited to:
        </Text>
        <View style={styles.list}>
          <Text>• Email address</Text>
          <Text>• First name and last name</Text>
          <Text>• Usage Data</Text>
        </View>

        <Text style={styles.subHeader}>Usage Data</Text>
        <Text style={styles.paragraph}>
          Usage Data is collected automatically when using the Service, and may
          include information such as Your Device's Internet Protocol address
          (e.g. IP address), browser type, browser version, and other diagnostic
          data.
        </Text>

        <Text style={styles.subHeader}>Use of Your Personal Data</Text>
        <View style={styles.list}>
          <Text>• To provide and maintain our Service.</Text>
          <Text>• To manage Your Account.</Text>
          <Text>• For the performance of a contract.</Text>
          <Text>• To contact You.</Text>
          <Text>• To provide You with news and information.</Text>
          <Text>• To manage Your requests.</Text>
          <Text>• For business transfers.</Text>
          <Text>• For other purposes.</Text>
        </View>

        <Text style={styles.subHeader}>Retention of Your Personal Data</Text>
        <Text style={styles.paragraph}>
          The Company will retain Your Personal Data only for as long as is
          necessary for the purposes set out in this Privacy Policy.
        </Text>

        <Text style={styles.subHeader}>Transfer of Your Personal Data</Text>
        <Text style={styles.paragraph}>
          Your information may be transferred to — and maintained on — computers
          located outside of Your jurisdiction.
        </Text>

        <Text style={styles.subHeader}>Delete Your Personal Data</Text>
        <Text style={styles.paragraph}>
          You have the right to delete or request that We assist in deleting the
          Personal Data that We have collected about You.
        </Text>

        <Text style={styles.subHeader}>Disclosure of Your Personal Data</Text>
        <Text style={styles.paragraph}>
          If the Company is involved in a merger, Your Personal Data may be
          transferred.
        </Text>

        <Text style={styles.subHeader}>Security of Your Personal Data</Text>
        <Text style={styles.paragraph}>
          The security of Your Personal Data is important to Us, but no method
          of transmission is 100% secure.
        </Text>

        <Text style={styles.subHeader}>Children's Privacy</Text>
        <Text style={styles.paragraph}>
          Our Service does not address anyone under the age of 13.
        </Text>

        <Text style={styles.subHeader}>Links to Other Websites</Text>
        <Text style={styles.paragraph}>
          Our Service may contain links to other websites that are not operated
          by Us.
        </Text>

        <Text style={styles.subHeader}>Changes to this Privacy Policy</Text>
        <Text style={styles.paragraph}>
          We may update Our Privacy Policy from time to time.
        </Text>

        <Text style={styles.subHeader}>Contact Us</Text>
        <View style={styles.list}>
          <Text>• By email: rajscape@gmail.com</Text>
          <Text>
            • By visiting:{" "}
            <Text
              style={styles.link}
              onPress={() => Linking.openURL("https://rajscape.com/contact")}
            >
              rajscape.com/contact
            </Text>
          </Text>
          <Text>• By phone: (224) 558-8478</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  lastUpdated: {
    fontSize: 12,
    color: "gray",
    marginBottom: 16,
  },
  subHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 8,
  },
  paragraph: {
    fontSize: 16,
    marginVertical: 4,
  },
  list: {
    marginLeft: 16,
  },
  bold: {
    fontWeight: "bold",
  },
  link: {
    color: "blue",
    textDecorationLine: "underline",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
});

export default PrivacyPolicy;
