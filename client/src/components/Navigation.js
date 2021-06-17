import React from "react";
import { Nav } from '@fluentui/react/lib/Nav';

const navStyles = {
  root: {
    width: "100%",
    height: "100%",
    boxSizing: 'border-box',
    border: '1px solid #eee',
    overflowY: 'auto',
  },
};

const navLinkGroups = [
  {
    links: [
      {
        name: 'Home',
        url: '/',
        key: 'Home',
        target: '_self',
      },
      {
        name: 'Team',
        url: '/team',
        key: 'Team',
        target: '_self',
      },
      {
        name: 'Employee',
        url: '/employee',
        key: 'Employee',
        target: '_self',
      },
      {
        name: 'Event',
        url: '/event',
        key: 'Event',
        target: '_self',
      },
      {
        name: 'Reopening',
        url: '/reopening',
        key: 'Reopening',
        target: '_self',
      }
    ],
  },
];

export const Navigation = () => {
  return (
    <Nav
      ariaLabel="Navigation"
      styles={navStyles}
      groups={navLinkGroups}
    />
  );
};
