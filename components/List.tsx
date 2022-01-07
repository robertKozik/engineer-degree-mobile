import React from "react";
import { FlatList } from "react-native";
import { ListItem, Avatar } from "react-native-elements";

type ItemShape = {
  photo_url: string;
  title: string;
  subtitle: string;
};

type ListProps = {
  data: Array<ItemShape>;
  renderItemFunc?: (item: any) => JSX.Element;
};

const keyExtractor = (item: any, index: number): string => index.toString();

const renderItem = ({ item }: { item: ItemShape }) => {
  return (
    <ListItem>
      <Avatar rounded source={{ uri: item.photo_url }} />
      <ListItem.Content>
        <ListItem.Title>{item.title}</ListItem.Title>
        <ListItem.Subtitle>{item.subtitle}</ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron tvParallaxProperties={{}} />
    </ListItem>
  );
};

const listStyle = { width: "100%" };
const List = ({ data, renderItemFunc }: ListProps) => {
  return (
    <FlatList
      style={listStyle}
      keyExtractor={keyExtractor}
      data={data}
      renderItem={renderItemFunc || renderItem}
    />
  );
};

export default List;
