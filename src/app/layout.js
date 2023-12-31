"use client"

import { Inter } from 'next/font/google'
import './globals.css'

import React, {useState} from 'react';
import {Providers} from "./providers";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, NavbarMenu, NavbarMenuToggle, NavbarMenuItem} from "@nextui-org/react";

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isActive, setIsActive] = useState({});

  const menuItems = [
    {
      label: 'Dashboard',
      link: '/'
    },
    {
      label: 'Ações',
      link: '/acoes'
    },
    {
      label: 'Fiis',
      link: '/fiis'
    },
    {
      label: 'Caixa',
      link: '/caixa'
    },
    {
      label: 'Projeção',
      link: '/projecao'
    }
  ]

  return (
    <html style={{backgroundColor: 'black'}}>
      <body className={inter.className}>
        <Navbar onMenuOpenChange={setIsMenuOpen} className='dark bg-background text-foreground'>
          <NavbarContent>
            <NavbarMenuToggle
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className="sm:hidden"
            />
          </NavbarContent>
          <NavbarContent className='hidden sm:flex' justify='end'>
            <NavbarItem>
                <Link href="/">
                  Dashboard
                </Link>
              </NavbarItem>
              <NavbarItem>
                <Link href="/acoes" aria-current="page">
                  Ações
                </Link>
              </NavbarItem>
              <NavbarItem>
                <Link href="/fiis">
                  Fiis
                </Link>
              </NavbarItem>
              <NavbarItem>
                <Link href="/caixa">
                  Caixa
                </Link>
              </NavbarItem>
              <NavbarItem>
                <Link href="/projecao">
                  Projeção
                </Link>
              </NavbarItem>
          </NavbarContent>
          <NavbarMenu className='dark'>
            {menuItems.map((item, index) => (
              <NavbarMenuItem key={`${item}-${index}`}>
                <Link
                  className="w-full"
                  href={item.link}
                  size="lg"
                >
                  {item.label}
                </Link>
              </NavbarMenuItem>
            ))}
          </NavbarMenu>
        </Navbar>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
