import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

export default function LoaderComponent() {
  return (
    <Dimmer active>
      <Loader>Loading</Loader>
    </Dimmer>
  );
}
