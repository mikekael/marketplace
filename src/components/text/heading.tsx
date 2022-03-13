import React from 'react';
import {Text} from 'react-native-elements';

// @todo create a generic props for test id
type HeadingProps = {
  testID: string;
};

const Heading: React.FunctionComponent<HeadingProps> = props => (
  <Text testID={props.testID}>{props.children}</Text>
);

export default Heading;
