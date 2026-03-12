'use client';

import { useEffect } from 'react';

const SECTION_IDS = ['home', 'services', 'about', 'philosophy-values', 'contact'] as const;

export default function SectionNavObserver() {
  useEffect(() => {
    const links = Array.from(document.querySelectorAll<HTMLAnchorElement>('.main-nav a[href^="#"]'));
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (section): section is HTMLElement => section instanceof HTMLElement
    );
    const header = document.querySelector<HTMLElement>('.site-header');
    const navToggle = document.getElementById('nav-menu-toggle') as HTMLInputElement | null;

    if (!links.length || !sections.length) {
      return;
    }

    const setActive = (targetId: string) => {
      links.forEach((link) => {
        const href = link.getAttribute('href');
        const isActive = href === `#${targetId}`;
        link.classList.toggle('is-active', isActive);
        if (isActive) {
          link.setAttribute('aria-current', 'page');
        } else {
          link.removeAttribute('aria-current');
        }
      });
    };

    const updateHeaderOffset = () => {
      const headerHeight = header?.offsetHeight ?? 0;
      document.documentElement.style.setProperty('--anchor-offset', `${headerHeight + 14}px`);
    };

    const pickActiveSection = () => {
      const headerHeight = header?.offsetHeight ?? 0;
      const marker = window.scrollY + headerHeight + 24;
      let activeId = sections[0].id;

      for (const section of sections) {
        if (section.offsetTop <= marker) {
          activeId = section.id;
        }
      }

      setActive(activeId);
    };

    let isScheduled = false;
    const onScroll = () => {
      if (isScheduled) {
        return;
      }
      isScheduled = true;
      window.requestAnimationFrame(() => {
        pickActiveSection();
        isScheduled = false;
      });
    };

    const onHashChange = () => {
      const hashId = window.location.hash.replace('#', '');
      if (hashId && SECTION_IDS.includes(hashId as (typeof SECTION_IDS)[number])) {
        setActive(hashId);
      } else {
        pickActiveSection();
      }
    };

    const onResize = () => {
      updateHeaderOffset();
      pickActiveSection();
    };

    const clickHandlers = new Map<HTMLAnchorElement, () => void>();
    links.forEach((link) => {
      const onClick = () => {
        const targetId = link.getAttribute('href')?.replace('#', '');
        if (targetId) {
          setActive(targetId);
        }
        if (navToggle) {
          navToggle.checked = false;
        }
      };
      clickHandlers.set(link, onClick);
      link.addEventListener('click', onClick);
    });

    updateHeaderOffset();
    pickActiveSection();

    const resizeObserver = header ? new ResizeObserver(() => {
      updateHeaderOffset();
      pickActiveSection();
    }) : null;

    if (header && resizeObserver) {
      resizeObserver.observe(header);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    window.addEventListener('hashchange', onHashChange);

    return () => {
      clickHandlers.forEach((handler, link) => {
        link.removeEventListener('click', handler);
      });
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('hashchange', onHashChange);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, []);

  return null;
}
