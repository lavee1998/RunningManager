
//TODO for details
import {
    ScrollView,
    View,
    Text,
    SafeAreaView,
    StyleSheet
  } from "react-native";
  import React, { useEffect } from "react";
  import { Col, Row, Grid } from "react-native-paper-grid";
  
const DetailsScreen = ({ navigation, currentRun }) => {
    const [time, setTime] = React.useState(0);
    const [maxAlt, setMaxAlt]=React.useState(1100.1);
    const [speed, setSpeed]=React.useState(0);
    const [avgSpeed, setAvgSpeed]=React.useState(0);
    const [distance, setDistance]=React.useState(0);
    const [settedTime, setSettedTime]=React.useState(21);
    const [settedDistance, setSettedDistance]=React.useState(6);
    const [date, setDate]=React.useState(0);

    return (
      <React.Fragment>
          <ScrollView>
          <View style={styles.pageTitleContainer}>
            <Text style={styles.pageTitle}>Daily run</Text>
          </View>
            <SafeAreaView style={styles.contentContainer}>
  
              <Grid style={styles.gridStyle}>
                <Row style={styles.paddingMarginZero}>
                  <Col style={styles.paddingMarginZero}>
                    <Text style={styles.primaryDataText}>Time</Text>
                  </Col>
                  <Col style={styles.paddingMarginZero}>
                    <Text style={styles.secondaryDataText}>
                      {time} min
                    </Text>
                  </Col>
                </Row>
                <Row style={styles.paddingMarginZero}>
                  <Col style={styles.paddingMarginZero}>
                    <Text style={styles.secondaryDataText}>Maximum altitude</Text>
                  </Col>
                  <Col style={styles.paddingMarginZero}>
                    <Text style={styles.primaryDataText}>
                      {maxAlt} m
                    </Text>
                  </Col>
                </Row>
                <Row style={styles.paddingMarginZero}>
                  <Col style={styles.paddingMarginZero}>
                    <Text style={styles.primaryDataText}>Top speed</Text>
                  </Col>
                  <Col style={styles.paddingMarginZero}>
                    <Text style={styles.secondaryDataText}>
                      {speed} km/h
                    </Text>
                  </Col>
                </Row>
  
                <Row style={styles.paddingMarginZero}>
                  <Col style={styles.paddingMarginZero}>
                    <Text style={styles.secondaryDataText}>Average speed</Text>
                  </Col>
                  <Col style={styles.paddingMarginZero}>
                    <Text style={styles.primaryDataText}>
                      {avgSpeed} km/h
                    </Text>
                  </Col>
                </Row>
                <Row style={styles.paddingMarginZero}>
                  <Col style={styles.paddingMarginZero}>
                    <Text style={styles.primaryDataText}>Distance</Text>
                  </Col>
                  <Col style={styles.paddingMarginZero}>
                    <Text style={styles.secondaryDataText}>{distance} km</Text>
                  </Col>
                </Row>
                <Row style={styles.paddingMarginZero}>
                  <Col style={styles.paddingMarginZero}>
                    <Text style={styles.secondaryDataText}>Set time</Text>
                  </Col>
                  <Col style={styles.paddingMarginZero}>
                    <Text style={styles.primaryDataText}>{settedTime} min</Text>
                  </Col>
                </Row>
                <Row style={styles.paddingMarginZero}>
                  <Col style={styles.paddingMarginZero}>
                    <Text style={styles.primaryDataText}>Set distance</Text>
                  </Col>
                  <Col style={styles.paddingMarginZero}>
                    <Text style={styles.secondaryDataText}>{settedDistance} km</Text>
                  </Col>
                </Row>
                <Row style={styles.paddingMarginZero}>
                  <Col style={styles.paddingMarginZero}>
                    <Text style={styles.secondaryDataText}>Date (start)</Text>
                  </Col>
                  <Col style={styles.paddingMarginZero}>
                    <Text style={styles.primaryDataText}>{date}</Text>
                  </Col>
                </Row>
                
                <Row style={styles.paddingMarginZero}>
                    {/*map helye*/}
                </Row>
              </Grid>
            </SafeAreaView>
          </ScrollView>
      </React.Fragment>
    );
}
const styles = StyleSheet.create({
    scene: {
      backgroundColor: "#ff4081",
      flex: 1,
    },
    gridStyle: {
        margin: 0,
        padding: 0,
      },
    paddingMarginZero: {
      margin: 0,
      padding: 0,
    },
    countDownContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 8,
    },
    contentContainer: {
      padding: 8,
      marginHorizontal: 20,
    },
    container: {
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#ecf0f1",
      padding: 2,
    },
  
    pageTitleContainer: {
        flex: 0.8,
        backgroundColor: "#56CCf2",
        borderWidth: 5,
        width: "80%",
        borderColor: "#56CCf2",
        borderBottomRightRadius: 20,
        borderTopRightRadius: 20,
        marginTop: 40,
        marginBottom: 20,
      },
      
    pageTitle: {
        alignSelf: "stretch",
        textAlign: "center",
        color: "white",
        fontSize: 22,
        padding: 20,
        fontWeight: "900",
      },
    primaryDataText: {
      padding: 15,
      color: "black",
      backgroundColor: "#add8e6",
      textAlign: "center",
    },
    secondaryDataText: {
      padding: 15,
      color: "black",
      backgroundColor: "#E0E0E0",
      textAlign: "center",
      fontWeight: "800",
    },
  
    stopButtonText: {
      color: "white",
      fontWeight: "900",
      fontSize: 20,
      fontWeight: "800",
    },
  });
  
export default DetailsScreen;