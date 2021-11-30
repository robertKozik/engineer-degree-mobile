import React from "react";
import { View } from "react-native";
import styles from "../style";
import { RootState } from "../../../redux/store";
import { Form } from "../../../components";
import { connect } from "react-redux";
import { Card } from "react-native-elements";

const ConfigPage = ({ modules }) => {
  const { config } = modules[0];
  return (
    <View style={styles.wrapper}>
      <Form initialValues={config} onSubmit={() => {}} formName="config">
        <Card style={styles.card}>
          <Card.Title>TITLE</Card.Title>
          <Card.Divider />
          <View>
            <Form.Slider
              name="sampling_rate"
              label="Sampling rate"
              icon="thermometer"
              min={0}
              max={25}
              step={1}
            />
            <Form.CheckBox
              label="Temperature sensor"
              icon="thermometer"
              name="temperature_sensor"
            />
            <Form.CheckBox
              label="Soil sensor"
              icon="droplet"
              name="soil_humidity_sensor"
            />
            <Form.CheckBox
              label="Light sensor"
              icon="mail"
              name="light_sensor"
            />
            <Form.Submit loading={false} />
          </View>
        </Card>
      </Form>
    </View>
  );
};

const mapStateToProps = (state: RootState) => ({
  modules: state.modules.modules,
});

export default connect(mapStateToProps)(ConfigPage);
