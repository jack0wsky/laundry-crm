"use client";

import { TurnoversListing } from "@/modules/analytics/TurnoversListing";
import { AbstractBackground } from "@/modules/shared/AbstractBackground";
import { Overview } from "@/modules/analytics/Overview";
import { useMemo } from "react";
import { groupMonthsByYears } from "@/modules/analytics/helpers/group-months-by-years";

export const TurnoversPage = () => {
  const timeline = useMemo(() => groupMonthsByYears(), []);

  return (
    <section className="h-screen ml-[300px] relative content-width">
      <AbstractBackground />

      <div className="px-5 pt-6">
        <h1 className="text-white text-4xl font-bold">Obroty</h1>

        <Overview currentYear={timeline[0].year} />
        <TurnoversListing timeline={timeline} />
      </div>
    </section>
  );
};
