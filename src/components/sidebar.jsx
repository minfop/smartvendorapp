import React from "react";
import { Link, useLocation } from "react-router-dom";

const navIcons = [
  { Label: "Dashboard", Icon: "🏠", Url: "/" }
];


export default function Sidebar() {
  return (
    <div class="flex h-screen bg-gray-100">
        <div class="hidden md:flex flex-col w-64 bg-white shadow-lg">
            <div class="flex items-center justify-center h-20 shadow-md">
                <h1 class="text-2xl font-bold text-blue-600">SmartVendor</h1>
            </div>
      <ul class="flex flex-col py-4">
        {
          navIcons.map((item, index) => (
        
                <li key={index}>
                    <Link to={item.Url} class="sidebar-nav-link flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                        <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">{item.Icon}</span>
                        <span class="text-sm font-medium">{item.Label}</span>
                    </Link>
                </li>
          ))
        }
      </ul>
    </div>
    </div>
  );
} 