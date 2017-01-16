import React, { Component } from 'react';
import Text from 'rebass/dist/Text';
import { PageHeader, Panel, PanelHeader, PanelFooter, Block } from 'rebass/dist';

export default class About extends Component {
  render() {
    return (
      <div>
        <PageHeader
        heading="Features"
        />
        <Block>
          <Panel theme="success">
            <PanelHeader
              inverted
              theme="default"
            >
              Panel
            </PanelHeader>
            <Text>
              Panels are great for visually separating UI, content, or data from the rest of the page.
            </Text>
            <PanelFooter theme="default">
              The footer is a good place for less important information
            </PanelFooter>
          </Panel>
        </Block>
        <Block>
          <Panel theme="info">
            <PanelHeader
              inverted
              theme="default"
            >
              Panel
            </PanelHeader>
            <Text>
              Panels are great for visually separating UI, content, or data from the rest of the page.
            </Text>
            <PanelFooter theme="default">
              The footer is a good place for less important information
            </PanelFooter>
          </Panel>
        </Block>
        <Block>
          <Panel theme="info">
            <PanelHeader
              inverted
              theme="default"
            >
              Panel
            </PanelHeader>
            <Text>
              Panels are great for visually separating UI, content, or data from the rest of the page.
            </Text>
            <PanelFooter theme="default">
              The footer is a good place for less important information
            </PanelFooter>
          </Panel>
        </Block>
      </div>
    );
  }
}
