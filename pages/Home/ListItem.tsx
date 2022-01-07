import React from "react";
import { useLinkProps } from "@react-navigation/native";
import { ListItem, FAB } from "react-native-elements";
import routes from "../../constants/routes";
import { Form, List, Modal } from "../../components";
import { StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { getAll } from "../../redux/stateSlices/module";
import { informationNode } from "../../interfaces";

type ItemShape = {
  photo_url?: string | undefined;
  title: string;
  subtitle: string;
  id: number;
};

const ListLink = ({ to, action, children, ...rest }: any) => {
  const { onPress, ...props } = useLinkProps({ to, action });
  return (
    <ListItem bottomDivider onPress={onPress} {...props} {...rest}>
      {children}
    </ListItem>
  );
};

const renderItem = ({ item }: { item: ItemShape }) => {
  return (
    <ListLink to={{ screen: routes.module, params: { id: item.id } }}>
      {/* {item.photo_url ? (
        <Avatar rounded source={{ uri: item.photo_url }} />
      ) : (
        <> </>
      )} */}
      <ListItem.Content>
        <ListItem.Title>{item.title}</ListItem.Title>
        <ListItem.Subtitle>{item.subtitle}</ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron tvParallaxProperties={{}} />
    </ListLink>
  );
};

const ModuleList = ({
  modules,
  getAllModules,
}: {
  modules: Array<informationNode>;
  getAllModules: Function;
}) => {
  React.useEffect(() => {
    getAllModules();
  }, [getAllModules]);

  const mappedData: Array<ItemShape> = React.useMemo(
    () =>
      modules.map((el) => ({
        photo_url: undefined,
        title: el.name,
        subtitle: el.serial_id,
        id: el.id,
      })),
    [modules]
  );

  return (
    <View style={styles.container}>
      <List data={mappedData} renderItemFunc={renderItem} />
      <Modal animationType="fade" type="button" title="Add plant module">
        <Form
          initialValues={{ serial_id: "" }}
          onSubmit={() => {}}
          formName="login"
        >
          <Form.TextInput
            name="serial_id"
            label="serial number"
            placeholder="xxxxxx"
            icon="mail"
          />
          <Form.Submit loading={false} />
        </Form>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 20,
  },
});

const mapStateToProps = (state: RootState) => ({
  modules: state.modules.modules,
});

const mapDispachToProps = (dispatch: AppDispatch) => ({
  getAllModules: () => dispatch(getAll()),
});

export { ItemShape };
export default connect(mapStateToProps, mapDispachToProps)(ModuleList);
