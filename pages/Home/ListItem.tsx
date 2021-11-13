import React from "react";
import { useLinkTo } from "@react-navigation/native";
import { ListItem, Avatar } from "react-native-elements";
import routes from "../../constants/routes";

type ItemShape = {
  photo_url: string;
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
      <Avatar rounded source={{ uri: item.photo_url }} />
      <ListItem.Content>
        <ListItem.Title>{item.title}</ListItem.Title>
        <ListItem.Subtitle>{item.subtitle}</ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron tvParallaxProperties={{}} />
    </ListLink>
  );
};

export default renderItem;
