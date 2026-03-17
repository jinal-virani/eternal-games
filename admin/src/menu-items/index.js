import { IconClipboardTypography, IconDashboard, IconDeviceGamepad2, IconGoGame, IconShieldLock, IconTags, IconTrendingUp, IconWorld, IconArticle } from '@tabler/icons'

const QuickView = {
  id: 'quickView',
  title: 'Quick View',
  caption: 'Concise Overview',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard',
      icon: IconDashboard,
      breadcrumbs: false
    },
    {
      id: 'trending',
      title: 'Trending',
      type: 'item',
      url: '/trending',
      icon: IconTrendingUp,
      breadcrumbs: false
    },
    {
      id: 'feature',
      title: 'Feature',
      type: 'item',
      url: '/feature',
      icon: IconGoGame,
      breadcrumbs: false
    }
  ]
}

const pages = {
  id: 'pages',
  title: 'Pages',
  caption: 'Browse Pages',
  type: 'group',
  children: [
    {
      id: 'games',
      title: 'Games',
      type: 'item',
      url: '/games',
      icon: IconDeviceGamepad2,
      breadcrumbs: false
    },
    {
      id: 'categories',
      title: 'Categories',
      type: 'item',
      url: '/categories',
      icon: IconTags,
      breadcrumbs: false
    },
    {
      id: 'blogs',
      title: 'Blogs',
      type: 'item',
      url: '/blogs',
      icon: IconArticle,
      breadcrumbs: false
    }
  ]
}

const website = {
  id: 'pages',
  type: 'group',
  children: [
    {
      id: 'websites',
      title: 'Website',
      type: 'item',
      url: '/websites',
      icon: IconWorld,
      breadcrumbs: false
    },
    {
      id: 'privacy',
      title: 'Privacy Policy',
      type: 'item',
      url: '/privacy',
      icon: IconShieldLock,
      breadcrumbs: false
    },
    {
      id: 'terms-condition',
      title: 'Terms & Conditions',
      type: 'item',
      url: '/terms-condition',
      icon: IconClipboardTypography,
      breadcrumbs: false
    }
  ]
}

const menuItems = {
  items: [ QuickView, pages, website ]
}

export default menuItems
