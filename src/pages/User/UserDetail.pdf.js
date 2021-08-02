import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { get } from "lodash";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#e4e4e4",
    padding: 20,
  },
  title: {
    textAlign: "center",
  },
});

const MyDocument = ({ data }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
          <Text style={styles.title}>
            {get(data, "name.title", "")} {get(data, "name.first", "")}{" "}
            {get(data, "name.last", "")}
          </Text>
          <Text style={styles.title}>
            {get(data, "location.city", "")} {get(data, "location.country", "")}
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default MyDocument;
