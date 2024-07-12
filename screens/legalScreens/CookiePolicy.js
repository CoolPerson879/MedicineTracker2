import React from "react";
import {
  View,
  Text,
  Linking,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

const CookiesPolicy = ({ navigation }) => {
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
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>Cookies Policy</Text>
        <Text>Last updated: July 12, 2024</Text>

        <Text>
          This Cookies Policy explains what Cookies are and how We use them. You
          should read this policy so You can understand what type of cookies We
          use, or the information We collect using Cookies and how that
          information is used.{" "}
        </Text>

        <Text>
          Cookies do not typically contain any information that personally
          identifies a user, but personal information that we store about You
          may be linked to the information stored in and obtained from Cookies.
          For further information on how We use, store and keep your personal
          data secure, see our Privacy Policy.
        </Text>
        <Text>
          We do not store sensitive personal information, such as mailing
          addresses, account passwords, etc. in the Cookies We use.
        </Text>

        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          Interpretation and Definitions
        </Text>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Interpretation</Text>
        <Text>
          The words of which the initial letter is capitalized have meanings
          defined under the following conditions. The following definitions
          shall have the same meaning regardless of whether they appear in
          singular or in plural.
        </Text>

        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Definitions</Text>
        <Text>For the purposes of this Cookies Policy:</Text>
        <View style={{ marginVertical: 8 }}>
          <Text>
            <Text style={{ fontWeight: "bold" }}>Company</Text> refers to
            RajScape.
          </Text>
          <Text>
            <Text style={{ fontWeight: "bold" }}>Cookies</Text> means small
            files that are placed on Your computer, mobile device or any other
            device by a website, containing details of your browsing history on
            that website among its many uses.
          </Text>
          <Text>
            <Text style={{ fontWeight: "bold" }}>Website</Text> refers to
            RajScape, accessible from{" "}
            <Text
              style={{ color: "blue" }}
              onPress={() => Linking.openURL("https://rajscape.com")}
            >
              https://rajscape.com
            </Text>
          </Text>
          <Text>
            <Text style={{ fontWeight: "bold" }}>You</Text> means the individual
            accessing or using the Website, or a company, or any legal entity on
            behalf of which such individual is accessing or using the Website,
            as applicable.
          </Text>
        </View>

        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          The use of the Cookies
        </Text>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          Type of Cookies We Use
        </Text>
        <Text>
          Cookies can be "Persistent" or "Session" Cookies. Persistent Cookies
          remain on your personal computer or mobile device when You go offline,
          while Session Cookies are deleted as soon as You close your web
          browser.
        </Text>
        <Text>
          We use both session and persistent Cookies for the purposes set out
          below:
        </Text>

        <View style={{ marginVertical: 8 }}>
          <Text style={{ fontWeight: "bold" }}>
            Necessary / Essential Cookies
          </Text>
          <Text>Type: Session Cookies</Text>
          <Text>Administered by: Us</Text>
          <Text>
            Purpose: These Cookies are essential to provide You with services
            available through the Website and to enable You to use some of its
            features. They help to authenticate users and prevent fraudulent use
            of user accounts. Without these Cookies, the services that You have
            asked for cannot be provided, and We only use these Cookies to
            provide You with those services.
          </Text>
        </View>

        <View style={{ marginVertical: 8 }}>
          <Text style={{ fontWeight: "bold" }}>Functionality Cookies</Text>
          <Text>Type: Persistent Cookies</Text>
          <Text>Administered by: Us</Text>
          <Text>
            Purpose: These Cookies allow us to remember choices You make when
            You use the Website, such as remembering your login details or
            language preference. The purpose of these Cookies is to provide You
            with a more personal experience and to avoid You having to re-enter
            your preferences every time You use the Website.
          </Text>
        </View>

        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          Your Choices Regarding Cookies
        </Text>
        <Text>
          If You prefer to avoid the use of Cookies on the Website, first You
          must disable the use of Cookies in your browser and then delete the
          Cookies saved in your browser associated with this website. You may
          use this option for preventing the use of Cookies at any time.
        </Text>
        <Text>
          If You do not accept Our Cookies, You may experience some
          inconvenience in your use of the Website and some features may not
          function properly.
        </Text>
        <Text>
          If You'd like to delete Cookies or instruct your web browser to delete
          or refuse Cookies, please visit the help pages of your web browser.
        </Text>

        <Text style={{ fontWeight: "bold" }}>
          For the Chrome web browser, please visit this page from Google:
        </Text>
        <Text
          style={{ color: "blue" }}
          onPress={() =>
            Linking.openURL("https://support.google.com/accounts/answer/32050")
          }
        >
          https://support.google.com/accounts/answer/32050
        </Text>

        <Text style={{ fontWeight: "bold" }}>
          For the Internet Explorer web browser, please visit this page from
          Microsoft:
        </Text>
        <Text
          style={{ color: "blue" }}
          onPress={() =>
            Linking.openURL("http://support.microsoft.com/kb/278835")
          }
        >
          http://support.microsoft.com/kb/278835
        </Text>

        <Text style={{ fontWeight: "bold" }}>
          For the Firefox web browser, please visit this page from Mozilla:
        </Text>
        <Text
          style={{ color: "blue" }}
          onPress={() =>
            Linking.openURL(
              "https://support.mozilla.org/en-US/kb/delete-cookies-remove-info-websites-stored"
            )
          }
        >
          https://support.mozilla.org/en-US/kb/delete-cookies-remove-info-websites-stored
        </Text>

        <Text style={{ fontWeight: "bold" }}>
          For the Safari web browser, please visit this page from Apple:
        </Text>
        <Text
          style={{ color: "blue" }}
          onPress={() =>
            Linking.openURL(
              "https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac"
            )
          }
        >
          https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac
        </Text>

        <Text>
          For any other web browser, please visit your web browser's official
          web pages.
        </Text>

        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          More Information about Cookies
        </Text>

        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Contact Us</Text>
        <Text>
          If you have any questions about this Cookies Policy, You can contact
          us:
        </Text>
        <View style={{ marginVertical: 8 }}>
          <Text>By email: rajscape@gmail.com</Text>
          <Text>
            By visiting this page on our website:{" "}
            <Text
              style={{ color: "blue" }}
              onPress={() => Linking.openURL("https://rajscape.com/contact")}
            >
              https://rajscape.com/contact
            </Text>
          </Text>
          <Text>By phone number: (224) 558 8478</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
});

export default CookiesPolicy;
