import React from "react";
import {Menu} from "antd";
import type { MenuProps } from 'antd';

const items: MenuProps['items'] = [
    {
      label: 'Navigation One',
      key: 'mail',
    },
    {
      label: 'Navigation Two',
      key: 'app',
      disabled: true,
    },
    {
      label: 'Navigation Three - Submenu',
      key: 'SubMenu',
      children: [
        {
          type: 'group',
          label: 'Item 1',
          children: [
            {
              label: 'Option 1',
              key: 'setting:1',
            },
            {
              label: 'Option 2',
              key: 'setting:2',
            },
          ],
        },
        {
          type: 'group',
          label: 'Item 2',
          children: [
            {
              label: 'Option 3',
              key: 'setting:3',
            },
            {
              label: 'Option 4',
              key: 'setting:4',
            },
          ],
        },
      ],
    },
    {
      label: (
        <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
          Navigation Four - Link
        </a>
      ),
      key: 'alipay',
    },
  ];

export default function NavigationBar() {
    return (
    <div className="flex w-full flex-row px-3 py-4 md:px-2">
        <div className="h-12 bg-amber-900"> <h1>BiblioClick</h1> </div>
        <Menu mode="horizontal" items={items} />
    </div>
    )

};