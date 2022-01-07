import React from "react";
import { ScrollView, Dimensions, View } from "react-native";
import styles from "../style";
import { RootState, store } from "../../../redux/store";
import { getModuleStats } from "../../../redux/stateSlices/module";
import { connect } from "react-redux";
import { informationNode, statEntry } from "../../../interfaces";
import { ContributionGraph, LineChart } from "react-native-chart-kit";
import {
  aggregateDates,
  dateAggregates,
  prepareForHeatmap,
  prepareForLineChart,
} from "../../../utils/timeUtil";
import { sensorTypes } from "../../../constants/sensorTypes";
import RNPickerSelect from "react-native-picker-select";
import { StyleSheet } from "react-native";
import { Slider, Text } from "react-native-elements";
import { Modal } from "../../../components";

const emptyChart = {
  datasets: [
    {
      data: [1],
      withDots: false, // min
    },
    {
      data: [10],
      withDots: false, // max
    },
  ],
  labels: ["1", "2", "3", "4"],
};

const fetchStats = (
  id: string,
  idDb: number,
  type?: string,
  interval?: string,
  from?: string
) => {
  store.dispatch(
    getModuleStats({ type, interval, from, moduleId: id, module_db: idDb })
  );
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    margin: 10,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    backgroundColor: "white",
    borderRadius: 4,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 8,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

enum datePossibilites {
  day = "day",
  month = "month",
  hour = "hour",
}

const Picker = ({
  setter,
  value,
}: {
  setter: React.Dispatch<any>;
  value: any;
}) => (
  <RNPickerSelect
    value={value}
    style={{
      ...pickerSelectStyles,
      iconContainer: {
        top: 10,
        right: 12,
        zIndex: 2000,
      },
    }}
    onValueChange={(value) =>
      setter((prev: any) => ({ ...prev, interval: value }))
    }
    items={(
      Object.keys(datePossibilites) as Array<keyof typeof datePossibilites>
    ).map((date: any) => ({ label: date, value: date }))}
  />
);

const chartConfig = {
  backgroundColor: "#e26a00",
  backgroundGradientFrom: "#E67C8F",
  backgroundGradientTo: "#E03655",
  decimalPlaces: 1, // optional, defaults to 2dp
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: "6",
    strokeWidth: "2",
    stroke: "#ad2a42",
  },
};

const tempConfig = chartConfig;
const lightConfig = {
  backgroundColor: "#e26a00",
  backgroundGradientFrom: "#fb8c00",
  backgroundGradientTo: "#ffa726",
  decimalPlaces: 2, // optional, defaults to 2dp
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: "6",
    strokeWidth: "2",
    stroke: "#ffa726",
  },
};

const humidConfig = {
  backgroundColor: "#e26a00",
  backgroundGradientFrom: "#65C1E6",
  backgroundGradientTo: "#1883AD",
  decimalPlaces: 2, // optional, defaults to 2dp
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: "6",
    strokeWidth: "2",
    stroke: "#0E4961",
  },
};

const chartStyle = {
  margin: 10,
  borderRadius: 16,
};

const ModulePage = ({
  route,
  statistics,
  modules,
}: {
  route: any;
  statistics: Object;
  modules: Array<informationNode>;
}) => {
  const { id } = route.params;
  const moduleSelected: informationNode | undefined = modules.find(
    (el) => el.id === Number(id)
  );
  const moduleStats: Array<statEntry> = statistics[id] || [];
  const [intervalChoice, setIntervalChoice] = React.useState<{
    interval: dateAggregates;
    value: number;
  }>({
    interval: dateAggregates.month,
    value: 1,
  });
  React.useEffect(() => {
    fetchStats(
      moduleSelected?.serial_id || "",
      id,
      undefined,
      intervalChoice.interval,
      intervalChoice.value.toString()
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [intervalChoice]);

  return (
    <>
      <ScrollView style={styles.wrapper}>
        {intervalChoice.interval === dateAggregates.month ? (
          <View style={{ alignItems: "center" }}>
            <Text h2>TEMPERATURE:</Text>
            <ContributionGraph
              values={[
                ...prepareForHeatmap(
                  aggregateDates(
                    moduleStats,
                    dateAggregates.month,
                    sensorTypes.temperature
                  )
                ),
              ]}
              endDate={new Date()}
              numDays={90}
              width={Dimensions.get("window").width - 20}
              height={250}
              chartConfig={{
                backgroundColor: "#e26a00",
                backgroundGradientFrom: "#E67C8F",
                backgroundGradientTo: "#E03655",
                backgroundGradientFromOpacity: 0.2,
                backgroundGradientToOpacity: 0.2,
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(173, 42, 66, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(173, 42, 66, ${opacity})`,
              }}
              style={{ margin: 10, borderRadius: 16 }}
            />
            <Text h2>LIGHT:</Text>
            <ContributionGraph
              values={[
                ...prepareForHeatmap(
                  aggregateDates(
                    moduleStats,
                    dateAggregates.month,
                    sensorTypes.light
                  )
                ),
              ]}
              endDate={new Date()}
              numDays={90}
              width={Dimensions.get("window").width - 20}
              height={250}
              chartConfig={{
                backgroundColor: "#e26a00",
                backgroundGradientFrom: "#fb8c00",
                backgroundGradientTo: "#ffa726",
                backgroundGradientFromOpacity: 0.2,
                backgroundGradientToOpacity: 0.2,
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(226, 106, 0, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(226, 106, 0, ${opacity})`,
              }}
              style={{ margin: 10, borderRadius: 16 }}
            />
            <Text h2>SOIL HUMIDITY:</Text>
            <ContributionGraph
              values={[
                ...prepareForHeatmap(
                  aggregateDates(
                    moduleStats,
                    dateAggregates.month,
                    sensorTypes.soil
                  )
                ),
              ]}
              endDate={new Date()}
              numDays={90}
              width={Dimensions.get("window").width - 20}
              height={250}
              chartConfig={{
                backgroundColor: "#e26a00",
                backgroundGradientFrom: "#65C1E6",
                backgroundGradientTo: "#1883AD",
                backgroundGradientFromOpacity: 0.2,
                backgroundGradientToOpacity: 0.2,
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(31, 169, 224, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(31, 169, 224, ${opacity})`,
              }}
              style={{ margin: 10, borderRadius: 16 }}
            />
          </View>
        ) : (
          <View>
            <Text h2>TEMPERATURE:</Text>
            <LineChart
              data={
                moduleStats.length
                  ? prepareForLineChart(
                      aggregateDates(
                        moduleStats,
                        intervalChoice.interval,
                        sensorTypes.temperature
                      )
                    )
                  : emptyChart
              }
              width={Dimensions.get("window").width}
              height={320}
              yAxisSuffix="°C"
              chartConfig={chartConfig}
              bezier
              style={chartStyle}
            />
            <Text h2>LIGHT:</Text>
            <LineChart
              data={
                moduleStats.length
                  ? prepareForLineChart(
                      aggregateDates(
                        moduleStats,
                        intervalChoice.interval,
                        sensorTypes.light
                      )
                    )
                  : emptyChart
              }
              width={Dimensions.get("window").width}
              height={320}
              yAxisSuffix="%"
              chartConfig={lightConfig}
              bezier
              style={chartStyle}
            />
            <Text h2>SOIL HUMIDITY:</Text>
            <LineChart
              data={
                moduleStats.length
                  ? prepareForLineChart(
                      aggregateDates(
                        moduleStats,
                        intervalChoice.interval,
                        sensorTypes.soil
                      )
                    )
                  : emptyChart
              }
              width={Dimensions.get("window").width}
              height={320}
              yAxisSuffix="%"
              chartConfig={humidConfig}
              bezier
              style={chartStyle}
            />
          </View>
        )}
      </ScrollView>

      <Modal type="button" title="Change filter">
        <View style={{ backgroundColor: "white" }}>
          <View style={{ alignItems: "center" }}>
            <Text h2>{intervalChoice.value}</Text>
          </View>
          <Slider
            style={{ margin: 10 }}
            value={intervalChoice.value}
            step={1}
            minimumValue={1}
            maximumValue={5}
            onValueChange={(value) =>
              setIntervalChoice((prev) => ({ ...prev, value }))
            }
          />
          <Picker setter={setIntervalChoice} value={intervalChoice.interval} />
        </View>
      </Modal>
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  statistics: state.modules.statistic,
  modules: state.modules.modules,
});

export default connect(mapStateToProps)(ModulePage);
