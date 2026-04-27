"use client";
import React from "react";
import DashboardHeader from "./DashboardHeader";
import DailyPath from "./DailyPath";
import FeaturedCourses from "./FeaturedCourses";

interface SectionHomeProps {
  firstName: string;
}

export default function SectionHome({ firstName }: SectionHomeProps) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-24 lg:pb-8">
      <DashboardHeader firstName={firstName} />

      <div className="lg:grid lg:grid-cols-12 lg:gap-12">
        <DailyPath />
        <FeaturedCourses />
      </div>
    </div>
  );
}
