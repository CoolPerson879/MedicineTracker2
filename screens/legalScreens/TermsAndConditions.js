import React from "react";
import {
  ScrollView,
  Text,
  Linking,
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

const TermsAndConditions = ({ navigation }) => {
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

        <Text style={styles.header}>Terms and Conditions</Text>
        <Text style={styles.date}>Last updated: July 12, 2024</Text>
        <Text style={styles.paragraph}>
          Please read these terms and conditions carefully before using Our
          Service.
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
          For the purposes of these Terms and Conditions:
        </Text>
        <View style={styles.list}>
          <Text>
            • <Text style={styles.bold}>Application</Text> means the software
            program provided by the Company downloaded by You on any electronic
            device, named Clinitime
          </Text>
          <Text>
            • <Text style={styles.bold}>Application Store</Text> means the
            digital distribution service operated by Apple Inc. (Apple App
            Store) or Google Inc. (Google Play Store) in which the Application
            has been downloaded.
          </Text>
          <Text>
            • <Text style={styles.bold}>Affiliate</Text> means an entity that
            controls, is controlled by or is under common control with a party.
          </Text>
          <Text>
            • <Text style={styles.bold}>Country</Text> refers to: Illinois,
            United States
          </Text>
          <Text>
            • <Text style={styles.bold}>Company</Text> (referred to as either
            "the Company", "We", "Us" or "Our" in this Agreement) refers to
            Clinitime.
          </Text>
          <Text>
            • <Text style={styles.bold}>Device</Text> means any device that can
            access the Service such as a computer, a cellphone or a digital
            tablet.
          </Text>
          <Text>
            • <Text style={styles.bold}>Service</Text> refers to the
            Application.
          </Text>
          <Text>
            • <Text style={styles.bold}>Terms and Conditions</Text> mean these
            Terms and Conditions that form the entire agreement between You and
            the Company regarding the use of the Service.
          </Text>
          <Text>
            • <Text style={styles.bold}>Third-party Social Media Service</Text>{" "}
            means any services or content provided by a third-party that may be
            displayed or made available by the Service.
          </Text>
          <Text>
            • <Text style={styles.bold}>You</Text> means the individual
            accessing or using the Service, or the company or other legal entity
            on behalf of which such individual is accessing or using the
            Service, as applicable.
          </Text>
        </View>

        <Text style={styles.subHeader}>Acknowledgment</Text>
        <Text style={styles.paragraph}>
          These are the Terms and Conditions governing the use of this Service
          and the agreement that operates between You and the Company.
        </Text>
        <Text style={styles.paragraph}>
          Your access to and use of the Service is conditioned on Your
          acceptance of and compliance with these Terms and Conditions. By
          accessing or using the Service You agree to be bound by these Terms
          and Conditions.
        </Text>
        <Text style={styles.paragraph}>
          You represent that you are over the age of 18. The Company does not
          permit those under 18 to use the Service.
        </Text>
        <Text style={styles.paragraph}>
          Your access to and use of the Service is also conditioned on Your
          acceptance of and compliance with the Privacy Policy of the Company.
          Please read Our Privacy Policy carefully before using Our Service.
        </Text>

        <Text style={styles.subHeader}>Links to Other Websites</Text>
        <Text style={styles.paragraph}>
          Our Service may contain links to third-party web sites or services
          that are not owned or controlled by the Company.
        </Text>
        <Text style={styles.paragraph}>
          The Company has no control over, and assumes no responsibility for,
          the content, privacy policies, or practices of any third-party web
          sites or services.
        </Text>

        <Text style={styles.subHeader}>Termination</Text>
        <Text style={styles.paragraph}>
          We may terminate or suspend Your access immediately, without prior
          notice or liability, for any reason whatsoever, including without
          limitation if You breach these Terms and Conditions.
        </Text>

        <Text style={styles.subHeader}>Limitation of Liability</Text>
        <Text style={styles.paragraph}>
          Notwithstanding any damages that You might incur, the entire liability
          of the Company shall be limited to the amount actually paid by You
          through the Service or 100 USD if You haven't purchased anything
          through the Service.
        </Text>

        <Text style={styles.subHeader}>
          "AS IS" and "AS AVAILABLE" Disclaimer
        </Text>
        <Text style={styles.paragraph}>
          The Service is provided to You "AS IS" and "AS AVAILABLE" without
          warranty of any kind. To the maximum extent permitted under applicable
          law, the Company expressly disclaims all warranties, whether express
          or implied, with respect to the Service.
        </Text>

        <Text style={styles.subHeader}>Governing Law</Text>
        <Text style={styles.paragraph}>
          The laws of the Country, excluding its conflicts of law rules, shall
          govern this Terms and Your use of the Service.
        </Text>

        <Text style={styles.subHeader}>Disputes Resolution</Text>
        <Text style={styles.paragraph}>
          If You have any concern or dispute about the Service, You agree to
          first try to resolve the dispute informally by contacting the Company.
        </Text>

        <Text style={styles.subHeader}>For European Union (EU) Users</Text>
        <Text style={styles.paragraph}>
          If You are a European Union consumer, you will benefit from any
          mandatory provisions of the law of the country in which You are
          resident.
        </Text>

        <Text style={styles.subHeader}>United States Legal Compliance</Text>
        <Text style={styles.paragraph}>
          You represent and warrant that (i) You are not located in a country
          that is subject to the United States government embargo, or that has
          been designated by the United States government as a "terrorist
          supporting" country.
        </Text>

        <Text style={styles.subHeader}>Severability and Waiver</Text>
        <Text style={styles.paragraph}>
          If any provision of these Terms is held to be unenforceable or
          invalid, such provision will be changed to accomplish the objectives
          of such provision.
        </Text>

        <Text style={styles.subHeader}>Translation Interpretation</Text>
        <Text style={styles.paragraph}>
          These Terms and Conditions may have been translated. You agree that
          the original English text shall prevail in case of a dispute.
        </Text>

        <Text style={styles.subHeader}>
          Changes to These Terms and Conditions
        </Text>
        <Text style={styles.paragraph}>
          We reserve the right, at Our sole discretion, to modify or replace
          these Terms at any time.
        </Text>

        <Text style={styles.subHeader}>Contact Us</Text>
        <Text style={styles.paragraph}>
          If you have any questions about these Terms and Conditions, You can
          contact us:
        </Text>
        <View style={styles.contactList}>
          <Text>
            • By email:{" "}
            <Text
              style={styles.link}
              onPress={() => Linking.openURL("mailto:rajscape@gmail.com")}
            >
              rajscape@gmail.com
            </Text>
          </Text>
          <Text>
            • By visiting this page on our website:{" "}
            <Text
              style={styles.link}
              onPress={() => Linking.openURL("https://rajscape.com/contact")}
            >
              rajscape.com/contact
            </Text>
          </Text>
          <Text>• By phone number: (224) 558-8478</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  date: {
    fontSize: 14,
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
  },
  paragraph: {
    fontSize: 16,
    marginVertical: 8,
  },
  bold: {
    fontWeight: "bold",
  },
  list: {
    marginVertical: 8,
  },
  contactList: {
    marginTop: 10,
  },
  link: {
    color: "blue",
    textDecorationLine: "underline",
  },
});

export default TermsAndConditions;
