import React from 'react';
import {useLocation} from '@docusaurus/router';
import {useLatestVersion} from '@docusaurus/plugin-content-docs/client';
import {
  NavbarSecondaryMenuFiller,
  ThemeClassNames,
} from '@docusaurus/theme-common';
import {useNavbarMobileSidebar} from '@docusaurus/theme-common/internal';
import NavbarMobileSidebarLayout from '@theme/Navbar/MobileSidebar/Layout';
import NavbarMobileSidebarHeader from '@theme/Navbar/MobileSidebar/Header';
import NavbarMobileSidebarPrimaryMenu from '@theme/Navbar/MobileSidebar/PrimaryMenu';
import NavbarMobileSidebarSecondaryMenu from '@theme/Navbar/MobileSidebar/SecondaryMenu';
import DocSidebarItems from '@theme/DocSidebarItems';
import sidebarsConfig from '@site/sidebars';

const SIDEBAR_ID = 'mainSidebar';

function findFirstDocHref(items, docsById) {
  for (const it of items || []) {
    if (it.type === 'doc' && docsById[it.id]) return docsById[it.id].path;
    if (it.type === 'link' && it.href) return it.href;
    if (it.type === 'category') {
      const h = findFirstDocHref(it.items, docsById);
      if (h) return h;
    }
  }
  return undefined;
}

function buildSidebarItems(rawItems, docsById, activePath) {
  const out = [];
  for (const raw of rawItems) {
    if (raw.type === 'category') {
      const item = {
        type: 'category',
        label: raw.label,
        collapsible: raw.collapsible ?? true,
        collapsed: raw.collapsed ?? false,
        className: raw.className,
        items: raw.items ? buildSidebarItems(raw.items, docsById, activePath) : [],
      };
      if (raw.link) {
        if (raw.link.type === 'doc' && docsById[raw.link.id]) {
          item.href = docsById[raw.link.id].path;
          item.docId = raw.link.id;
        } else if (raw.link.type === 'generated-index') {
          item.href = findFirstDocHref(raw.items, docsById);
        }
      } else {
        item.href = findFirstDocHref(raw.items, docsById);
      }
      item.active = item.href === activePath;
      out.push(item);
    } else if (raw.type === 'doc') {
      const d = docsById[raw.id];
      if (!d) continue;
      out.push({
        type: 'link',
        label: raw.label || raw.id,
        href: d.path,
        docId: raw.id,
        className: raw.className,
        active: d.path === activePath,
      });
    } else if (raw.type === 'link') {
      out.push({
        type: 'link',
        label: raw.label,
        href: raw.href,
        className: raw.className,
        active: raw.href === activePath,
      });
    }
  }
  return out;
}

const GlobalDocSidebarSecondaryMenu = ({items, activePath}) => {
  const mobileSidebar = useNavbarMobileSidebar();
  return (
    <ul className={`${ThemeClassNames.docs.docSidebarMenu} menu__list`}>
      <DocSidebarItems
        items={items}
        activePath={activePath}
        onItemClick={(item) => {
          if (item.type === 'category' && item.href) {
            mobileSidebar.toggle();
          }
          if (item.type === 'link') {
            mobileSidebar.toggle();
          }
        }}
        level={1}
      />
    </ul>
  );
};

function GlobalDocSidebarFiller() {
  const {pathname} = useLocation();
  const latestVersion = useLatestVersion('default');

  const docsById = React.useMemo(() => {
    const map = {};
    for (const d of latestVersion?.docs ?? []) {
      map[d.id] = {id: d.id, path: d.path};
    }
    return map;
  }, [latestVersion]);

  const rawSidebar = sidebarsConfig?.[SIDEBAR_ID] ?? [];
  const items = React.useMemo(
    () => buildSidebarItems(rawSidebar, docsById, pathname),
    [rawSidebar, docsById, pathname],
  );

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <NavbarSecondaryMenuFiller
      component={GlobalDocSidebarSecondaryMenu}
      props={{items, activePath: pathname}}
    />
  );
}

export default function NavbarMobileSidebar() {
  return (
    <>
      <NavbarMobileSidebarLayout
        header={<NavbarMobileSidebarHeader />}
        primaryMenu={<NavbarMobileSidebarPrimaryMenu />}
        secondaryMenu={<NavbarMobileSidebarSecondaryMenu />}
      />
      {/* 全局兜底：在非文档页（如首页）提供文档侧边栏到二级菜单 */}
      <GlobalDocSidebarFiller />
    </>
  );
}
