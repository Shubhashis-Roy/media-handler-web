"use client";

import * as React from "react";
import { DayPicker, type DayPickerProps } from "react-day-picker";
import type { MonthCaptionProps } from "react-day-picker";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../../lib/utils";
import { buttonVariants } from "./button";
import { useNavigation } from "react-day-picker";

// -------------------------------------------
// ✔ Custom Caption (v9 replacement for Navigation)
// -------------------------------------------
function CustomCaption(props: MonthCaptionProps) {
  const { calendarMonth } = props;
  const { previousMonth, nextMonth, goToMonth } = useNavigation();

  return (
    <div className="flex justify-between items-center mb-3 px-1">
      {/* Prev Button */}
      <button
        disabled={!previousMonth}
        onClick={() => previousMonth && goToMonth(previousMonth)}
        className={cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 p-0 disabled:opacity-30 opacity-70 hover:opacity-100"
        )}
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {/* Month Title */}
      <span className="font-medium text-sm">
        {calendarMonth.date.toLocaleDateString("en-US", {
          month: "long",
          year: "numeric",
        })}
      </span>

      {/* Next Button */}
      <button
        disabled={!nextMonth}
        onClick={() => nextMonth && goToMonth(nextMonth)}
        className={cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 p-0 disabled:opacity-30 opacity-70 hover:opacity-100"
        )}
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}

// -------------------------------------------
// ✔ Calendar Component
// -------------------------------------------
export function Calendar({
  className,
  classNames,
  ...props
}: DayPickerProps & { className?: string }) {
  return (
    <DayPicker
      className={cn("p-3", className)}
      components={{
        MonthCaption: CustomCaption, // ✔ Correct override for v9
      }}
      classNames={{
        months: "flex flex-col sm:flex-row gap-4",
        month: "space-y-4",
        table: "w-full border-collapse",
        head_row: "flex",
        head_cell:
          "w-9 text-center text-[0.8rem] text-muted-foreground font-normal",
        row: "flex",
        cell: "w-9 h-9 p-0 text-center",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "w-full h-full aria-selected:opacity-100"
        ),
        ...classNames,
      }}
      {...props}
    />
  );
}
