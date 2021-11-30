import React from "react";
import { useLinkTo } from "@react-navigation/native";
import { ListItem, Avatar } from "react-native-elements";
import routes from "../../constants/routes";
import { List } from "../../components";
import { StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { getAll } from "../../redux/stateSlices/module";
import { informationNode } from "../../interfaces";

type ItemShape = {
  photo_url?: string | undefined;
  title: string;
  subtitle: string;
};

const ListLink = ({ children }: { children: Array<React.ReactChild> }) => {
  const linkTo = useLinkTo();
  return (
    <ListItem bottomDivider onPress={() => linkTo(`/${routes.moduleOverview}`)}>
      {children}
    </ListItem>
  );
};

const renderItem = ({ item }: { item: ItemShape }) => {
  return (
    <ListLink>
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
  console.log(modules);
  React.useEffect(() => {
    getAllModules();
  }, [getAllModules]);

  const mappedData: Array<ItemShape> = React.useMemo(
    () =>
      modules.map((el) => ({
        photo_url: undefined,
        title: el.name,
        subtitle: el.serial_id,
      })),
    [modules]
  );

  return (
    <View style={styles.container}>
      <List data={mappedData} renderItemFunc={renderItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
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
