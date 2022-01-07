import React from "react";
import { Card } from "react-native-elements";
import { View } from "react-native";
import styles from "../style";
import { AppDispatch, RootState } from "../../../redux/store";
import { connect } from "react-redux";
import { informationNode } from "../../../interfaces";
import { Form } from "../../../components";
import { DateTime } from "luxon";
import { changeModule } from "../../../redux/stateSlices/module/thunks";

const ModulePage = ({
  route,
  modules,
  submit,
}: {
  route: any;
  modules: Array<informationNode>;
  submit: Function;
}) => {
  const { id } = route.params;
  const selectedModule = modules.find((el) => el.id === Number(id));
  if (!selectedModule) {
    return null;
  }
  console.log(selectedModule);
  return (
    // <View style={styles.wrapper}>
    //   <Text h2>{selectedModule?.name}</Text>
    //   <Text h2>{selectedModule?.serial_id}</Text>
    //   <Text h2>{selectedModule?.id}</Text>
    // </View>
    <View style={styles.wrapper}>
      <Card style={styles.card}>
        <Card.Title>{`MODULE ID: ${selectedModule?.serial_id}`}</Card.Title>
        <Card.Divider />
        <View>
          <Form
            initialValues={{
              ...selectedModule!,
              id: selectedModule!.id.toString(),
              inserted_at: DateTime.fromISO(
                selectedModule!.inserted_at
              ).toFormat("yyyy LLL dd"),
            }}
            onSubmit={(values: any) =>
              submit(values.serial_id, { name: values.name })
            }
            formName="module"
          >
            <Form.TextInput label="" icon="" name="name" placeholder="" />
            <Form.TextInput
              label="serial number"
              icon=""
              name="serial_id"
              disabled
              placeholder=""
            />
            <Form.TextInput
              label="database id"
              icon=""
              name="id"
              disabled
              placeholder=""
            />
            <Form.TextInput
              label="created"
              icon=""
              name="inserted_at"
              disabled
              placeholder=""
            />
            <Form.Submit loading={false} />
          </Form>
        </View>
      </Card>
    </View>
  );
};

const mapStateToProps = (state: RootState) => ({
  modules: state.modules.modules,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  // getDefaultStats: dispatch => dispatch(getModuleStats("temperature_sensor", "month",))
  submit: (serial: string, changeset: Object) =>
    dispatch(changeModule({ serial, changeset })),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModulePage);
