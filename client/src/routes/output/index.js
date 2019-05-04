import React, { Component } from 'react';
import { socket } from 'api/sentimo';
import LiveGraph from './LiveGraph';

export default () => (
    <main>
        <LiveGraph
          src={socket}
          fps={60} />
    </main>
)
