import React from "react";
import { View } from "react-native";
import styles from "../style";
import { AppDispatch, RootState } from "../../../redux/store";
import { Form } from "../../../components";
import { connect } from "react-redux";
import { Card } from "react-native-elements";
import { changeConfig } from "../../../redux/stateSlices/module/thunks";
import { informationNode } from "../../../interfaces";

const ConfigPage = ({ route, modules, submit }: any) => {
  const { id } = route.params;
  const { config } = modules.find(
    (el: informationNode) => el.id === Number(id)
  );
  return (
    <View style={styles.wrapper}>
      <Form
        initialValues={config}
        onSubmit={(values) => {
          submit(id, values);
        }}
        formName="config"
      >
        <Card style={styles.card}>
          <Card.Title>MODULE CONFIGURATION</Card.Title>
          <Card.Divider />
          <View>
            <Form.Slider
              name="sampling_rate"
              label="Sampling rate"
              icon="thermometer"
              min={0}
              max={60}
              step={1}
            />
            <Form.CheckBox
              label="Temp sensor"
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
              icon="sun"
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

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  submit: (moduleId: number, values: Object) =>
    dispatch(changeConfig({ moduleId, config: values })),
});

export default connect(mapStateToProps, mapDispatchToProps)(ConfigPage);
