import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
  {
    id: 1,
    label: 'MENUITEMS.MENU.TEXT',
    isTitle: true
  },
  {
      id: 2,
      label: 'Dashboard',
      icon: "ri-dashboard-2-line",
      link: "dash",
  },

  {
    id: 3,
    label: 'Customer',
    icon: "ri-file-user-line",
    link: "user",
},
{
  id: 4,
  label: 'Chat',
  icon: "ri-wechat-2-line",
  link: "chat",
},


{
  id: 5,
  label: 'Document',
  icon: "ri-file-2-fill",
  link: "document",
},

{
  id: 6,
  label: 'Account',
  icon: "ri-account-box-fill",
  link: "account",
},
{
  id: 7,
  label: 'Payment',
  icon: "ri-secure-payment-fill",
  link: "payment",
},

{
  id: 8,
  label: "Resource",  
  icon: "ri-add-circle-fill",
  link: "resourse",
  subItems: [
    {
      id: 1,
      label: "Blog",
      icon: "bx-calendar-alt",
      link: "/resourse/blog",
    },
    {
      id: 2,
      label: "WhitePaper",
      icon: "bx-calendar-alt",
      link: "/resourse/whitepaper",
    },
    
    {
      id: 3,
      label: "News",
      icon: "bx-calendar-alt",
      link: "/resourse/news",
    },
    
    {
      id: 4,
      label: "FAQS",
      icon: "bx-calendar-alt",
      link: "/resourse/faqs",
    },
  ],
},
{
  id: 9,
  label: "About Us",
  icon: "ri-file-search-line",
  link: "aboutus",
  subItems: [
    {
      id: 1,
      label: "Testimonials",
      icon: "bx-calendar-alt",
      link: "/aboutus/testimonials",
    },
    
    

  ],
},






{
  id: 10,
  label: "Setting",
  icon: "ri-settings-2-line",
  link: "setting",
  subItems: [
    {
      id: 1,
      label: "Terms And Conditions",
      icon: "bx-calendar-alt",
      link: "/setting/termsconditions",
    },
    {
      id: 2,
      label: "Privacy Policy",
      icon: "bx-calendar-alt",
      link: "/setting/privacypolicy",
    },
    
    // {
    //   id: 3,
    //   label: "Contact Us",
    //   icon: "bx-calendar-alt",
    //   link: "/setting/contactus",
    // },
  ],
},
{
  id: 11,
  label: "Contact Us",
  icon: "bx-calendar-alt",
  link: "/setting/contactus",
},
{
  id: 12,
  label: "Careers",
  icon: "bx bx-grid-alt",
  link: "aboutus",
  subItems: [
    {
      id: 1,
      label: "jobs",
      icon: "bx-calendar-alt",
      link: "/aboutus/jobs",
    },
    {
      id: 2,
      label: "Applied Job",
      icon: "bx-calendar-alt",
      link: "/career/appliedjob",
    },
    

  ],
  
},
{
  id: 13,
  label: "Sub Admin",
  icon: "ri-user-fill",
  link: "users",
},


];
