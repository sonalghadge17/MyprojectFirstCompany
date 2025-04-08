import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
  {
    id: 1,
    label: 'MENUITEMS.MENU.TEXT',
    isTitle: true
  },
 
  {
    id: 2,
    label: 'Musician management',
    icon: 'ri-user-fill',
    link: '/',
    isCollapsed: true,
    // subItems: [
    //   {
    //     id: 180,
    //     label: 'MENUITEMS.MULTILEVEL.LIST.LEVEL1.1',
    //     parentId: 179
    //   },
    //   {
    //     id: 181,
    //     label: 'MENUITEMS.MULTILEVEL.LIST.LEVEL1.2',
    //     subItems: [
    //       {
    //         id: 182,
    //         label: 'MENUITEMS.MULTILEVEL.LIST.LEVEL1.LEVEL2.1',
    //         parentId: 181,
    //       },
    //       {
    //         id: 183,
    //         label: 'MENUITEMS.MULTILEVEL.LIST.LEVEL1.LEVEL2.2',
    //         parentId: 181,
    //       }
    //     ]
    //   },
    // ]
  },
  {
    id: 3,
    label: 'Music management',
    icon: 'ri-music-2-fill',
    link: '/music',
    isCollapsed: true,
 
  },
  {
    id: 4,
    label: 'Financial management',
    link: '/finance',
    icon: 'ri-wallet-3-line',
    isCollapsed: true,
 
  },
  {
    id: 5,
    label: 'Contact management',
    link: '/contact',
    icon: 'ri-contacts-book-fill',
    isCollapsed: true,
 
  }


];
